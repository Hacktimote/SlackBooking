# Slack booking - Server Side

## Intro
The server application is the backend of our mobile app. It is the API with which to book and list rooms. It is also the point of messaging to Slack.

The server gives you a set of REST calls to allow for booking rooms, booking through Slack and listing rooms through the api or Slack.

Documentation on the specific call can be found, when running the server, at '/documentation'.

## Libraries

The server has been developed with:

* Hapijs - http://hapijs.com/
* Mongodb - https://www.mongodb.com/
* Mongoose - http://mongoosejs.com/
* Joi - https://github.com/hapijs/joi
* Unirest - http://unirest.io/nodejs.html
* hapi-swagger - https://github.com/glennjones/hapi-swagger
* slack-client - https://github.com/slackhq/node-slack-client


## How to get started

Install all the dependecies that the server will use.

	npm install

Start your MongoDB server

	mongod

Start the server

	npm start



