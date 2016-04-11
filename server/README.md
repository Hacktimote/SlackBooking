# Slack-timote Server application

The server application is the backend of our mobile app. It is the API with which to book and list rooms. It is also the point of messaging to Slack.

The main Componets used for this app:

Hapijs - http://hapijs.com/
Mongodb - https://www.mongodb.com/
Mongoose - http://mongoosejs.com/
Joi - https://github.com/hapijs/joi
Unirest - http://unirest.io/nodejs.html
hapi-swagger - https://github.com/glennjones/hapi-swagger
slack-client - https://github.com/slackhq/node-slack-client

To Run:

Clone the repo then go into this server directory.

Install all the dependecies that the server will use.

	npm install

Next you'll need to start your mongo server

	mongod

To start the server

	npm start

# Copyright

Copyright © Francois and Rich MIT License; see LICENSE for further details.
