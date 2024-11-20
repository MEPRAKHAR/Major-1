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
                    // Download ChromeDriver
                    sh 'curl -sSL https://storage.googleapis.com/chrome-for-testing-public/131.0.6778.85/linux64/chromedriver-linux64.zip -o chromedriver.zip'
                    // Unzip to a directory with proper permissions
                    sh 'unzip chromedriver.zip -d ~/.local/bin/'
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

        stage('Build') {
            steps {
                // Install Node.js dependencies
                sh 'npm install'
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
