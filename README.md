# Slack Booking

Concept app for RealityHack #3: Reinvent the Workplace

Meeting room booking system using Estimote Beacons and the Slack API.

View README files within the 'client' or 'server' directory for running the demos.


## Install Docker

Install [Docker](https://www.docker.com/community-edition#/download) on your machine.

**NB:** Make sure to update the db with the right list of rooms.

## Development

Once the docker is up, updating the client file automatically update the browser.

Start Docker:
```
docker-compose up
```

Stop Docker:
```
docker-compose down
```

## Build the app

### The client
The client side need to be built with docker.
To execute commandes in the docker container

#### Configuration
Make the bash file executable:
```
sudo chmod +x bash
```

Then run the commande:
```
./bash <cmd>
```

#### Build the client side

Then run the commande:
```
./bash yarn build
```

This will generate the www folder that will be used by cordova.

#### Run Cordova Locally

```
cd client
cordova prepare
cordova run android
```


#### Run Cordova in the container

Use a larger container that include Android SDK
In `client/Dockerfile`, uncomment the section 1 and remove the section 2.

rebuild the container
```
docker-compose down
docker-compose build
```

Run cordova commande line through the `./bash` script.
```
./bash cordova prepare
./bash cordova run android
```

## Limitation

So far, Only IOS 8 has been used and tested to build the mobile application. Some adjustment needs to be done to adapt Android with the new realise of Cordova 6.
