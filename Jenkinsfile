pipeline {
    agent any
    tools {
        nodejs 'node' // Replace 'node' with the name of your NodeJS installation in Jenkins
    }
    stages {
        stage('Fetch Code') {
            steps {
                git branch: 'ci_pipeline_testing', url: 'https://github.com/MEPRAKHAR/Major-1.git'
            }
        }

        stage('Testing') {
            steps {
                // Start the Node.js application
                sh 'npm start &'

                // Wait for the app to start (increase if needed)
                sh 'sleep 15'

                // Use python3 instead of python (if python3 is installed)
                sh 'python3 test_home_page.py'

                // Kill the Node.js process (ensure the app stops)
                sh 'pkill -f "npm start"'
            }
        }

        stage('Build') {
            steps {
                sh 'npm install' // Install dependencies
            }
            post {
                success {
                    echo "Build succeeded. Archiving artifacts."
                }
                failure {
                    echo "Build failed."
                }
            }
        }
    }
}
