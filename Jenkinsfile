def projectName = "gopay-node"
def githubProject = "gyro-n/${projectName}"

node("master") {
    ansiColor('xterm') {
        stage 'Checkout'
            slackSend channel: "#dev-notifications", message: stageMessage('Build', 'started', env.BRANCH_NAME, env.BUILD_NUMBER)
            try {
                sh "npm run clean"
                sh "npm prune"
                sh "yarn"
                checkout scm
            } catch (error) {
                 slackSend channel: "#dev-notifications", color: "danger", message: stageMessage('Checkout', 'failed', env.BRANCH_NAME, env.BUILD_NUMBER)
                 throw error
            }

        stage 'Build'
            try {
                sh "npm run build"
            } catch (error) {
                 slackSend channel: "#dev-notifications", color: "danger", message: stageMessage('Build', 'failed', env.BRANCH_NAME, env.BUILD_NUMBER)
                 throw error
            }

        stage 'Test'
            withEnv(['NODE_ENV=test']) {
                print "Running tests in environment: ${env.NODE_ENV}"
                sh "node -v"

                try {
                  sh "npm test"
                } catch (error) {
                  slackSend channel: "#dev-notifications", color: "danger", message: stageMessage('Test', 'failed', env.BRANCH_NAME, env.BUILD_NUMBER)
                  throw error
                }
            }

        stage "Deploy"
            try {
                if (env.BRANCH_NAME == "master") {
                    echo "Deploying"
                    sh "./scripts/deploy.sh"
                    slackSend channel: "#dev-notifications", color: "good", message: stageMessage('Deploy', 'succeed', env.BRANCH_NAME, env.BUILD_NUMBER)
                }
            } catch (error) {
                slackSend channel: "#dev-notifications", color: "danger", message: stageMessage('Deploy', 'failed', env.BRANCH_NAME, env.BUILD_NUMBER)
                throw error
            }


        stage "Cleanup"
            echo "Cleaning up build"
            sh "npm run clean"
            slackSend channel: "#dev-notifications", message: stageMessage('Build', 'finished', env.BRANCH_NAME, env.BUILD_NUMBER)

    }

}

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
