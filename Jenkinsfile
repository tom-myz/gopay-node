node("master") {

    stage "Checkout"
        checkout scm

    stage "Build"
        slackSend channel: "#dev-notifications", message: "Build Started: ${env.JOB_NAME} ${env.BUILD_NUMBER} ${env.BRANCH_NAME}"

    stage "Test"
        withEnv(['NODE_ENV=test']) {
            print "Running tests in environment: ${env.NODE_ENV}"
            sh "node -v"

            try {
              sh "npm run clean"
              sh "npm prune"
              sh "npm install"
              sh "./node_modules/typings/dist/bin.js install"
              sh "npm test"
              slackSend channel: "#dev-notifications", color: "good", message: "Build succeeded: ${env.JOB_NAME} ${env.BUILD_NUMBER} ${env.BRANCH_NAME}"
            } catch (error) {
              slackSend channel: "#dev-notifications", color: "danger", message: "Build failed: ${env.JOB_NAME} ${env.BUILD_NUMBER} ${env.BRANCH_NAME}"
              throw error
            }
        }

    stage "Deploy"
        sh "npm run build"

        if (env.BRANCH_NAME == "master") {
            echo "Deploy to NPM"
            sh "./scripts/deploy.sh -e npm"
            slackSend channel: "#dev-notifications", color: "good", message: "Deploy succeeded: Published to NPM"
        }

    stage "Cleanup"
        echo "Cleaning up build"
        sh "npm run clean"

}
