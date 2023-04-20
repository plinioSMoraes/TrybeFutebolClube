<br/>
<p align="center">
  <h3 align="center">Trybe Futebol Clube (TFC)</h3>

  <p align="center">
    An amazing fullstack application so you can play with a futbol cup leaderboard
    <br/>
    <br/>
    <a href="https://github.com/plinioSMoraes/TrybeFutebolClube"><strong>Explore the docs »</strong></a>
    <br/>
    <br/>
    .
    <a href="https://github.com/plinioSMoraes/TrybeFutebolClube/issues">Report Bug</a>
    .
    <a href="https://github.com/plinioSMoraes/TrybeFutebolClube/issues">Request Feature</a>
  </p>
</p>

## Table Of Contents

* [About the Project](#about-the-project)
* [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Roadmap](#roadmap)


## About The Project
TFC is a fullstack application that has a basic CRUD application built using NodeJS, Express, Sequelize and TypeScript in the backend and React in the frontend, allowing users to check on leaderboard for matches of team and it has some filters allowing the user to be able to check the leaderboard for teams that played on their homes or away. 

## Built With

Express: "4.17.1"
Sequelize: "6.1.8"
Eslint: "7.32.0"
React: "17.0.2"
Typescript: "4.4.4"

## Getting Started

To start the project first you need to clone this repository

### Prerequisites

You'll need to have npm and docker installed

### Installation

Clone the repo
  - "git@github.com:plinioSMoraes/TrybeFutebolClube.git"

Install NPM packages
  - Enter the TrybeFutebolClube folder (cd TrybeFutebolClube)
  - npm install

Install Joi
  - Enter the app folder then enter the backend folder (cd app; cd backend)
  - npm install joi

Create Docker Containers
  - Go back to the app folder (cd ..)
  - npm run compose:up

If everything is right you can run the application 
  - Go to the frontend folder (cd frontend)
  - npm start

Now you'll be able to play with TFC, have fun :)
