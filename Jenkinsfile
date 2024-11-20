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
            sh 'npm start &'
            sh 'sleep 11' // Adjust timing as needed
            sh 'python test_home_page.py'
            sh 'pkill -f "node"' // Kill the Node.js process if needed
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
