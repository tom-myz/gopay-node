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
        basictTools.withDevNotifications("Test", gitInfo.githubUrl) {
          yarnEnv.inside {
            sh "yarn test"
          }
        }
      }

      // Build
      stage("Build") {
        basictTools.withDevNotifications("Build", gitInfo.githubUrl) {
          yarnEnv.inside {
            withEnv(["GOPAY_API_ENDPOINT=https://api.${domain}"]) {
              sh "yarn run clean"
              sh "yarn run build"
            }
          }
        }
      }

      // Deploy
      stage("Deploy") {
        basictTools.withDevNotifications("Deploy", gitInfo.githubUrl) {
          yarnEnv.inside {
            def npmVersion = basicTools.getNpmVersion("gopay-node")

            if (gitInfo.isMaster && gitInfo.tagVersion.isRelease && gitInfo.tagVersion.source != npmVersion) {
              sh "npm publish"
            } else {
              echo "Not deploying..."
              basicTools.sendSlackMessage(notificationsChannel, "Deploy", gitInfo.githubUrl, "skipped")
            }
          }
        }
      }
    }

  }
}
