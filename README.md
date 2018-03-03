# Slack Booking

Concept app for RealityHack #3: Reinvent the Workplace

Meeting room booking system using Estimote Beacons and the Slack API.

View README files within the 'client' or 'server' directory for running the demos.


#Slack booking - Client side

## Intro

The client side of the slack booking app has been developed in Javascript to make the application available on Ios and Android with Cordova.

The application will let you:

* See the list of the meeting room near you (Beacons Technology with Estimote)
* Filter the meeting rooms by availability
* See information like assets, capacity and distance when available.
* Book a meeting room and let your colleagues get a slack notification

## Libraries

The application has been developed with:

* Angularjs 1.4
* ionic-sdk
* webpack
* gulp
* cordova plugins

## How to get started

Install [Yarn](https://yarnpkg.com/en/docs/install)

Install Cordova globaly

```
npm i cordova -g
```

From the app folder, install all dependencies. Use Yarn to install all dependencies. (this will use yarn.lock and make sure the build works...)

```
yarn install
```

### Test the app

To test the application on browser

```
yarn watch
```

**NB:** to make sure you won't get a cross-domain issue, webpack is configured with a proxy to redirect all `/api/` calls to the slack booking server side. Just change the line 57 of `gulpfile.js` with your own slackbooking server side.

### Build the app

```
yarn build
```

To build for ios:

```
cordova platform add ios
cordova run ios --device
```

## Limitation

So far, Only IOS 8 has been used and tested to build the mobile application. Some adjustment needs to be done to adapt Android with the new realise of Cordova 6.



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



