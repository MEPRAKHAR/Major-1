pipeline {
    agent any
    tools {
        nodejs 'node' // Use the NodeJS installation configured in Jenkins
    }
    stages {
        stage('Fetch Code') {
            steps {
                git branch: 'main', url: 'https://github.com/MEPRAKHAR/Major-1.git'
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
                    sh 'echo "2612" | sudo -S cp /Users/PrakharGupta/Downloads/chromedriver-mac-arm64_2/chromedriver /usr/local/bin/'
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
                sh '''
                npm start &
                echo $! > pid.file
                '''

                // Wait for the server to start
                sh 'until curl --silent --fail http://localhost:5001; do sleep 15; done'

                // Run the Python Selenium tests
                sh '. venv/bin/activate && python3 test_home_page.py'

                // Kill the Node.js process gracefully after testing
                sh '''
                if [ -f pid.file ]; then
                    kill $(cat pid.file) || true
                else
                    echo "No pid.file found, skipping process termination."
                fi
                '''
            }
        }

        stage('Free Port') {
            steps {
                script {
                    sh '''
                    PID=$(lsof -t -i:5001)
                    if [ ! -z "$PID" ]; then
                        kill -9 $PID
                    fi
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Starting application using npm start...'

                // Start the application in the background
                sh '''
                export CI=false
                npm start &
                echo $! > pid.file
                '''
                
                echo 'Application started successfully.'
            }
            post {
                success {
                    echo "Deployment successful."
                }
                failure {
                    echo "Deployment failed."
                }
                always {
                    // Ensure background process is terminated after deployment
                    sh '''
                    if [ -f pid.file ]; then
                        kill $(cat pid.file) || true
                    else
                        echo "No pid.file found, skipping process termination."
                    fi
                    '''
                }
            }
            
        }
    }
}

