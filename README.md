# email-campaign

A school project to learn restful API's

## Requirements

- Docker
- Docker-compose

## Installation

- Clone repository : `git clone https://github.com/Pochwar/email-campaign.git`
- Copy `api/v1/config/configDefault.yml` to `api/v1/config/config.yml` and define database credentials. With docker, databse host is `mongo`
- Install packages : go to `api/v1` and run `npm install`
- Run `docker-compose up` to launch containers and then go to `localhost:3000`

## Documentation

- Generate the doc with Apidoc, run `apidoc -i src doc`