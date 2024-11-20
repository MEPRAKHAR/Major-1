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
                // Create a virtual environment for Python
                sh 'python3 -m venv venv'
                // Activate the virtual environment using POSIX-compliant dot (.)
                sh '. venv/bin/activate && pip install selenium'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    sh 'curl -sSL https://storage.googleapis.com/chrome-for-testing-public/131.0.6778.85/linux64/chromedriver-linux64.zip -o chromedriver.zip'
                    sh 'unzip chromedriver.zip -d /usr/local/bin/'
                }
            }
        }

        stage('Testing') {
            steps {
                // Run the Node.js application
                sh 'npm start &'
                sh 'sleep 15' // Adjust timing as needed
                // Run the Python Selenium tests
                sh '. venv/bin/activate && python3 test_home_page.py'
                // Kill the Node.js process if needed
                sh 'pkill -f "node"'
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
