node("node") {

    stage "Checkout"

        checkout scm

    stage "Test"

        env.NODE_ENV = "test"

        print "Running tests in environment: ${env.NODE_ENV}"

        sh "node -v"
        sh "typings install"
        sh "npm prune"
        sh "npm install"
        sh "npm test"

    stage "Build"

        echo "Building dist files"

    stage "Deploy"

        if (env.BRANCH_NAME == "develop") {
            echo "Deploy to staging"
        }

        if (env.BRANCH_NAME == "master") {
            echo "Deploy to production"

            input message: "Publish new release to s3?", ok: "Do it"
        }

    stage "Cleanup"

        echo "Cleaning up build"

        sh "rm -rf typings"
        sh "npm prune"
        sh "rm -rf node_modules"
        sh "npm run clean"

}
