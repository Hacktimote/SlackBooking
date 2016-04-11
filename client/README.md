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

Install Cordova and gulp

```
npm i cordova gulp -g
```

From the app folder, install all dependencies

```
npm i
```

### Test the app

To test the application on browser

```
gulp watch
```

**NB:** to make sure you won't get a cross-domain issue, webpack is configured with a proxy to redirect all `/api/` calls to the slack booking server side. Just change the line 57 of `gulpfile.js` with your own slackbooking server side.

### Build the app

```
gulp build
```

To build for ios:

```
cordova platform add ios
cordova run ios --device
```

## Limitation

So far, Only IOS 8 has been used and tested to build the mobile application. Some adjustment needs to be done to adapt Android with the new realise of Cordova 6.
