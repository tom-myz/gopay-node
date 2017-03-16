String gitHubProject = "gyro-n/gopay-node"
String projectName = "gopay-node"

def slackNotification = { String stage, String verb, String color, String channel = "#dev-notifications" ->
    def gitId = env.GIT_TAG =~ /v[0-9]+(\.[0-9]+){2}}/ ? env.GIT_TAG : env.GIT_BRANCH
    def jenkinsUrl = "https://jenkins.gyro-n.money/blue/organizations/jenkins/gyron%2F${projectName}/detail/${gitId}/${env.BUILD_NUMBER}/pipeline/"
    def gitHubUrl = "https://github.com/${gitHubProject}/tree/${gitId}"

    def message = "*${projectName}*\nBuild <${jenkinsUrl}|#${env.BUILD_NUMBER}> for <${gitHubUrl}|[${projectName}:${gitId}]>:\nStage `${stage}` has ${verb}"

    slackSend channel: channel, color: color, message: message
}

def nodeEnv = docker.image "node:7-alpine"

node('slave') {
  // This is to prevent node from crashing on first run
  nodeEnv.pull()

  ansiColor('xterm') {
    stage('Checkout') {
      checkout scm
    }

    def gitCommit = sh(returnStdout: true, script: 'git rev-parse HEAD').trim()
    def gitTag = sh(returnStdout: true, script: 'git describe --contains ${gitCommit} | sed -e "s/^([0-9]+(\\.[0-9]+){2})$/\1/g"').trim()
    def packageVersion = sh(returnStdout: true, script: 'node -e \"console.log(require('./package.json').version)').trim()

    withEnv(['HOME=$WORKSPACE', "GIT_BRANCH=${env.BRANCH_NAME}", "GIT_TAG=${gitTag}"]) {
      stage("Dependencies") {
 	    withCredentials([string(credentialsId: 'npm-auth-token', variable: 'NPM_AUTH_TOKEN')]) {
 	      nodeEnv.inside {
 	        writeFile file:"$HOME/.npmrc", text: """
              //registry.npmjs.org/:_authToken=${env.NPM_AUTH_TOKEN}
              scope=gyro-n
              @gyro-n:registry=https://registry.npmjs.org/
              sign-git-tag=true
            """
            sh "yarn global add node-gyp"
            sh "yarn"
 	      }
 	    }
      }

      stage("Test") {
        nodeEnv.inside {
          slackNotification("Test", "started", "#4183C4")
          try {
            sh "yarn test"
            slackNotification("Test", "succeeded", "good")
          } catch (error) {
            slackNotification("Test", "failed", "danger")
            throw error
          }
        }
      }

      stage("Build") {
        nodeEnv.inside {
          slackNotification("Build", "started", "#4183C4")
          sh "yarn run clean"

          try {
            withEnv(['GOPAY_API_ENDPOINT=https://api.gyro-n.money']) {
              sh "yarn run build"
            }
            slackNotification("Build", "succeeded", "good")
          } catch (error) {
            slackNotification("Build", "failed", "danger")
            throw error
          }
        }
      }

      stage("Deploy") {
        if (gitTag =~ /v[0-9]+(\.[0-9]+){2}}/ && gitTag == packageVersion) {
          npm publish
        } else {
          slackNotification("Deploy", "skipped", "warning")
        }
      }
    }
  }
}
