#!groovy

properties([disableConcurrentBuilds()])

pipeline {
    agent any
    options {
        buildDiscarder(logRotator(numToKeepStr: '5', artifactNumToKeepStr: '5'))
        timestamps()
    }
    stages {
        stage("Build and up") {
            steps {
                sh 'docker compose up -d --build --remove-orphans'
            }
    }
}
