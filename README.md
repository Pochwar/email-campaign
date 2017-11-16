# email-campaign

A school project to learn restful API's

## Requirements


- NodeJs
- NPM
- Docker
- Docker-compose

## Installation

- Clone repository : `git clone https://github.com/Pochwar/email-campaign.git`
- Copy `api/v1/.env.exemple` to `api/v1/.env` and define database credentials and Api Token Secret. With docker, database host is `mongo`
- Install packages : go to `api/v1` and run `npm install`

### Developement
- Run `docker-compose -f dc-dev.yml up` to launch mongo container
- In `api/v1/config/config.yml`, set `dbConfig.host` to `0.0.0.0`
- Go to `api/v1` folder and run `npm run dev` 
- Visit `http://localhost:3000`, app reloads on every source file change

### Production
- In `api/v1/config/config.yml`, set `dbConfig.host` to `mongo
- Run `docker-compose up` to launch containers and then go to `localhost:3000`

## Documentation

- Generate the doc with Apidoc, run `apidoc -i src doc`