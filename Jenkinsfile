def yarnEnv = docker.image "node:alpine"

String projectName = "gopay-node"
String stack = "gopay-node"

node('slave') {
  // This is to prevent node from crashing on first run
  yarnEnv.pull()

  ansiColor('xterm') {

    stage('Checkout') {
      checkout scm
    }

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
            sh "yarn global add node-gyp"
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

        // FIXME: change after infor is updated
        def tagVersionNumber = gitInfo.tag != null ? gitInfo.tag.replaceAll("v", "") : null

        if (tagVersionNumber != null && gitInfo.isMaster) {
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
