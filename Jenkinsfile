pipeline {
    agent any
    tools {
        nodejs 'node' // Use the NodeJS installation configured in Jenkins
    }
    stages {
        stage('Fetch Code') {
            steps {
                git branch: 'ci_pipeline_testing', url: 'https://github.com/MEPRAKHAR/Major-1.git'
            }
        }

        stage('Setup Python Environment') {
            steps {
                sh '''
                python3 -m venv venv
                . venv/bin/activate
                pip install selenium
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    // Install Node.js dependencies
                    sh 'npm install'
                    
                    // Download ChromeDriver
                    sh 'curl -sSL https://storage.googleapis.com/chrome-for-testing-public/131.0.6778.85/mac-arm64/chromedriver-mac-arm64.zip'
                    sh 'unzip chromedriver.zip -d /usr/bin/'
                }
            }
        }

        stage('Build') {
            steps {
                // If you have a build process, run it here.
                // For example, if using Webpack or TypeScript:
                // sh 'npm run build'
                echo 'Skipping build stage as this is a Node.js app without compilation.'
            }
            post {
                success {
                    echo "Build stage completed successfully."
                }
                failure {
                    echo "Build stage failed."
                }
            }
        }

        stage('Testing') {
            steps {
                // Start the Node.js server in the background
                sh 'npm start &'
                
                // Wait for the server to start (better synchronization than sleep)
                sh 'until curl --silent --fail http://localhost:5001; do sleep 5; done'

                // Run the Python Selenium tests
                sh '. venv/bin/activate && python3 test_home_page.py'
                
                // Kill the Node.js process gracefully after testing
                sh 'pkill -f "npm start"'
            }
        }
    }
    post {
        always {
            echo "Pipeline finished."
        }
    }
}
