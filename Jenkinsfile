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
        def states = basicTools.getStates()
        def nodeImage = "node:8-alpine"

        def isRelease = gitInfo.isMaster || gitInfo.tagVersion.isRelease

        // Skips run if [ci skip] is present
        def ciSkip = (sh(script: "git log -1 | grep --ignore-case '\\[ci skip\\]'", returnStatus: true)) == 0

        if (ciSkip) {
            echo 'Early exiting because CI is not set to run'
            currentBuild.result = 'ABORTED'
            return
        }

        withEnv([
            "HOME=$WORKSPACE",
            "GIT_BRANCH=${gitInfo.branch}",
            "GIT_TAG=${gitInfo.tag || ""}",
            "GOPAY_API_ENDPOINT=https://api.gopay.jp"
        ]) {

            def npmRunArgs = " " +
                "-e HOME=/usr/src/app " +
                "-v $WORKSPACE:/usr/src/app " +
                "-w /usr/src/app "

            def npmImage = docker.image(nodeImage)

            npmImage.pull();

            // Dependencies
            stage("Dependencies") {
                withCredentials([
                    string(credentialsId: 'npm-auth-token', variable: 'NPM_AUTH_TOKEN')
                ]) {
                    buildTools.writeNpmRC("${WORKSPACE}/.npmrc", env.NPM_AUTH_TOKEN)

		            npmImage.inside(npmRunArgs) {
		                sh "npm install"
		            }
                }
            }

            // Test
            stage("Test") {
                basicTools.withDevNotifications("Test", gitInfo.githubUrl) {
                    npmImage.inside(npmRunArgs) {
                        withCredentials([
                            string(credentialsId: 'coveralls-repo-token', variable: 'COVERALLS_REPO_TOKEN')
                        ]) {
                            withEnv([
                                "CI=true",
                                "CI_NAME=Jenkins",
                                "CI_BUILD_NUMBER=$BUILD_NUMBER",
                                "CI_BUILD_URL=$BUILD_URL",
                                "CI_BRANCH=${!gitInfo.tag ? gitInfo.branch : gitInfo.tag}",
                                "CI_PULL_REQUEST=$CHANGE_ID"
                            ]) {
                                sh "npm test"
                                sh "npm run coverage"
                            }
                        }
                	}
                }
            }

            // Build
            stage("Build") {
                basicTools.withDevNotifications("Build", gitInfo.githubUrl) {
                    npmImage.inside(npmRunArgs) {
                      sh "npm run build"
                    }
                }
            }

            // Deploy
            stage("Deploy") {
                basicTools.withDevNotifications("Deploy", gitInfo.githubUrl) {
                    npmImage.inside(npmRunArgs) {
                        def npmVersion = sh(script: "npm info ${projectName} version", returnStdout: true).trim()
                        def shouldDeploy = isRelease && gitInfo.tagVersion.source != npmVersion

                        if (shouldDeploy) {
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
