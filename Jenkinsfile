String projectName = "gopay-node"
String stack = "gopay-node"

node('slave') {
  ansiColor('xterm') {

    stage('Checkout') {
      checkout scm
    }

    def yarnEnv = docker.build("gopay-yarn", "./docker-ci")

    def basicTools = load "${JENKINS_TOOLS_DIR}/basic-tools.groovy"
    def buildTools = load "${JENKINS_TOOLS_DIR}/build-tools.groovy"
    def gitTools = load "${JENKINS_TOOLS_DIR}/git-tools.groovy"
    def gitInfo = gitTools.getGitInformation(projectName, "gyro-n")
    def notificationsChannel = basicTools.getChannels().Notifications
    def states = basicTools.getStates()
    def domain = (gitInfo.isMaster || gitInfo.tagVersionNumber != null) ? "gopay.jp": "gyro-n.money"

    withEnv(['HOME=$WORKSPACE', "GIT_BRANCH=${gitInfo.branch}", "GIT_TAG=${gitInfo.tag || ""}"]) {
      // Dependencies
      stage("Dependencies") {
        withCredentials([string(credentialsId: 'npm-auth-token', variable: 'NPM_AUTH_TOKEN')]) {
          yarnEnv.inside {
            buildTools.writeNpmRC()
            sh "yarn"
          }
        }
      }

      // Test
      stage("Test") {
        yarnEnv.inside {
          basicTools.sendSlackMessage(notificationsChannel, "Test", gitInfo.githubUrl, states.Starting)
          try {
            sh "yarn test"
            basicTools.sendSlackMessage(notificationsChannel, "Test", gitInfo.githubUrl, states.Success)
          } catch (error) {
            basicTools.sendSlackMessage(notificationsChannel, "Test", gitInfo.githubUrl, states.Failed, error.toString())
            throw error
          }
        }
      }

      // Build
      stage("Build") {
        yarnEnv.inside {
          basicTools.sendSlackMessage(notificationsChannel, "Build", gitInfo.githubUrl, states.Starting)

          withEnv(["GOPAY_API_ENDPOINT=https://api.${domain}"]) {
            try {
              sh "yarn run clean"
              sh "yarn run build"

              basicTools.sendSlackMessage(notificationsChannel, "Build", gitInfo.githubUrl, states.Success)
            } catch (error) {
              basicTools.sendSlackMessage(notificationsChannel, "Build", gitInfo.githubUrl, states.Failed, error.toString())
              throw error
            }
          }
        }
      }

      // Deploy
      stage("Deploy") {
        def npmVersion = null

        yarnEnv.inside {
          npmVersion = sh(returnStdout: true, script: "npm info gopay-node version").trim()
        }

        if (gitInfo.isMaster && gitInfo.tagVersionNumber != null && gitInfo.tagVersionNumber != npmVersion) {
          basicTools.sendSlackMessage(notificationsChannel, "Build", gitInfo.githubUrl, states.Starting)

          try {
            sh "npm publish"

            basicTools.sendSlackMessage(
                    notificationsChannel,
                    "Deploy",
                    gitInfo.githubUrl,
                    states.Success
            )
          } catch (error) {
            basicTools.sendSlackMessage(
                    notificationsChannel,
                    "Deploy",
                    gitInfo.githubUrl,
                    states.Failed
            )
            throw error
          }
        } else {
          echo "Not deploying..."
          basicTools.sendSlackMessage(notificationsChannel, "Deploy", gitInfo.githubUrl, "skipped")
        }
      }
    }

  }
}
