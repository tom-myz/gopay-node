def projectName = "gopay-node"
def githubProject = "gyro-n/${projectName}"

// For some reason, Jenkins is requiring us to double URL encode.
String doubleUrlEncode(s) {
    URLEncoder.encode(URLEncoder.encode(s, 'UTF-8'), 'UTF-8')
}

String githubUrl(branch) {
    "https://github.com/${githubProject}/tree/${branch}"
}

String jenkinsConsoleUrl(branch, buildNumber) {
    "https://jenkins.gyro-n.money/blue/organizations/jenkins/&{doubleUrlEncode(githubProject)}/detail/${branch}/${buildNumber}/pipeline"
}

String stageMessage(stage, verb, branch, buildNumber) {
    "Build <${jenkinsConsoleUrl(branch, buildNumber)}|#${buildNumber}> for <${githubUrl(branch)}|[${projectName}:${branch}]>:\nStage `${stage}` has ${verb}"
}

def sh_with_home = { String cmd ->
  sh "export HOME=${WORKSPACE};$cmd"
}

def isDevelop = env.BRANCH_NAME == 'develop'
def isMester = env.BRANCH_NAME == 'master'

node('slave') {
  def awsEnv = docker.image 'governmentpaas/awscli'
  def nodeEnv = docker.image 'node'
  def yarnEnv = docker.image 'kkarczmarczyk/node-yarn:6.9'
  def toolsEnv = docker.image '903649084065.dkr.ecr.ap-northeast-1.amazonaws.com/gopay-tools'
  def dependenciesCache = "deps/$JOB_NAME"
  yarnEnv.pull()
  nodeEnv.pull()

  ansiColor('xterm') {
    stage('Checkout') {
      checkout scm
    }

    def gitCommit = sh(returnStdout: true, script: 'git rev-parse HEAD').trim()
    def dirToCopyTo = "$JOB_NAME/$gitCommit"

    stage("Dependencies") {
      withCredentials([string(credentialsId: 'npm-auth-token', variable: 'NPM_AUTH_TOKEN')]) {

      }

      yarnEnv.inside {
	    echo "$WORKSPACE"
	    sh_with_home "cd ~/; pwd"
	    writeFile file:"~/.npmrc", text: """//registry.npmjs.org/:_authToken=${env.NPM_AUTH_TOKEN}
scope=gyro-n
@gyro-n:registry=https://registry.npmjs.org/
sign-git-tag=true
"""
	sh_with_home "ls -la"
	sh_with_home "cat ~/.npmrc"
	sh_with_home "yarn"
      }
    }

    stage("Test") {
      nodeEnv.inside {
        slackSend channel: "#dev-notifications", message: stageMessage('Test', 'started', env.BRANCH_NAME, env.BUILD_NUMBER)
        try {
    	  sh_with_home("yarn test")
    	  slackSend channel: "#dev-notifications", color: "good", message: stageMessage('Test', 'succeeded', env.BRANCH_NAME, env.BUILD_NUMBER)
        } catch (error) {
    	  slackSend channel: "#dev-notifications", color: "danger", message: stageMessage('Test', 'failed', env.BRANCH_NAME, env.BUILD_NUMBER)
    	  throw error
        }
      }
    }

    stage("Build") {
      nodeEnv.inside {
        slackSend channel: "#dev-notifications", message: stageMessage('Build', 'started', env.BRANCH_NAME, env.BUILD_NUMBER)
        try {
          sh_with_home("yarn run build")
          slackSend channel: "#dev-notifications", color: "good", message: stageMessage('Build', 'succeedded', env.BRANCH_NAME, env.BUILD_NUMBER)
        } catch (error) {
          slackSend channel: "#dev-notifications", color: "danger", message: stageMessage('Build', 'failed', env.BRANCH_NAME, env.BUILD_NUMBER)
          throw error
        }
      }

      if (isDevelop) {
	    echo "Copying to s3 for use on master..."

    	sh "cd $SHARE_DIR;mkdir -p $dirToCopyTo"
	    sh "cp -rf $WORKSPACE/dist/* $SHARE_DIR/$dirToCopyTo/"
      }
    }

    stage("Deploy") {
      if (false) {
	    node("master") {
	      try {
            echo "Deploying to s3..."
            slackSend channel: "#dev-notifications", color: "danger", message: stageMessage('Deploy', 'started', env.BRANCH_NAME, env.BUILD_NUMBER)

	        sh "rm -rf ./build; mkdir -p ./build; cp -rf $SHARE_DIR/$dirToCopyTo/* build/"
	        awsEnv.inside {
	          loginInfo = sh(returnStdout: true, script: "aws ecr get-login --region ap-northeast-1")
	        }
	        sh loginInfo
	        toolsEnv.inside {
	          sh "aws s3 sync build s3://gopay-merchant-console/staging/blue"
	          sh "cloudfront-util create_invalidation --domain blue-merchant-console.gyro-n.money"
	        }
	        slackSend channel: "#dev-notifications", color: "danger", message: stageMessage('Deploy', 'succeeded', env.BRANCH_NAME, env.BUILD_NUMBER)
	      } catch (error) {
	        slackSend channel: "#dev-notifications", color: "danger", message: stageMessage('Deploy', 'failed', env.BRANCH_NAME, env.BUILD_NUMBER)
            throw error
	      }
	    }
      } else {
	    echo "Not deploying..."
      }
    }
  }

}
