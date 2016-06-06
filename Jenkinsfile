node("master") {

    stage "Checkout"

        checkout scm

    stage "Test"

        env.NODE_ENV = "test"

        print "Running tests in environment: ${env.NODE_ENV}"

        sh "node -v"
        sh "npm prune"
        sh "npm install"
        sh "./node_modules/typings/dist/bin.js install"
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

        sh "npm run clean"

}
