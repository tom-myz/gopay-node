String projectName = "gopay-node"
String projectOwner = "gyro-n"

node('slave') {

    ansiColor('xterm') {

        stage('Checkout') {
            checkout scm
        }

        def basicTools = load "${JENKINS_TOOLS_DIR}/basic-tools.groovy"
        def buildTools = load "${JENKINS_TOOLS_DIR}/build-tools.groovy"
        def gitTools = load "${JENKINS_TOOLS_DIR}/git-tools.groovy"
        def gitInfo = gitTools.getGitInformation(projectName, projectOwner)
        def notificationsChannel = basicTools.getChannels().Notifications
        def states = basicTools.getStates()npmi
        def nodeImage = "node:8-alpine"

        def isRelease = gitInfo.isMaster || gitInfo.tagVersion.isRelease

        // Skips run if [ci skip] is present
        def ciSkip = (sh(script: "git log -1 | grep --ignore-case '\\[ci skip\\]'", returnStatus: true)) == 0

        if (ciSkip) {
            echo 'Early exiting because CI is not set to run'
            currentBuild.result = 'ABORTED'
            return
        }

        def npmRun = { cmd ->
            sh "docker run " +
                "--rm " +
                "-e GOPAY_API_ENDPOINT=https://api.gopay.jp " +
                "-e HOME=/usr/src/app " +
                "-v $WORKSPACE:/usr/src/app " +
                "-w /usr/src/app " +
                "${nodeImage} npm $cmd"
        }

        def npmVersion = npmRun "info ${projectName} version"
        def shouldDeploy = isRelease && gitInfo.tagVersion.source != npmVersion

        withEnv([
            "HOME=$WORKSPACE",
            "GIT_BRANCH=${gitInfo.branch}",
            "GIT_TAG=${gitInfo.tag || ""}"
        ]) {

            // Dependencies
            stage("Dependencies") {
                withCredentials([
                    string(credentialsId: 'npm-auth-token', variable: 'NPM_AUTH_TOKEN')
                ]) {
                    buildTools.writeNpmRC("${WORKSPACE}/.npmrc", env.NPM_AUTH_TOKEN)
		            sh "sudo rm -rf $WORKSPACE/node_modules"
		            npmRun "install"
                }
            }

            // Test
            stage("Test") {
                basicTools.withDevNotifications("Test", gitInfo.githubUrl) {
                    npmRun "test"
                }
            }

            // Build
            stage("Build") {
                basicTools.withDevNotifications("Build", gitInfo.githubUrl) {
                    npmRun "run build"
                }
            }

            // Deploy
            stage("Deploy") {
                if (shouldDeploy) {
                    basicTools.withDevNotifications("Deploy", gitInfo.githubUrl) {
                        npmRun "publish"
                    }
                } else {
                    echo "Not deploying..."
                    basicTools.sendSlackMessage(notificationsChannel, "Deploy", gitInfo.githubUrl, "skipped")
                }
            }
        }

    }
}
