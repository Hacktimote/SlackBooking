/**
 * Created by franciosdelpech on 4/9/16.
 */


var _ = require('lodash');
var angular = require('angular');

var API = '';
if(process && process.env && process.env.NODE_ENV === 'production'){
  API = 'http://hacktimote.site/'
}

module.exports = angular
  .module('room.service', [])
  .factory('Rooms', Rooms);

/* @ngInject */
function Rooms($q, $http) {
  var serverUrl = API + 'api';


  /*
   {
   "name": "string",
   "beaconId": "string",
   "location": "string",
   "assets": ["string"],
   "capacity": "string",
   "capacityName": "string",

   "status": {
   "name": "string",
   "bookingId": "string"
   }
   }
   */

  var rooms = null;

  return {
    all: getAll,
    get: getById,
    update: update,
    book: book,
    nbRoom: nbRoom
  };

  function getAll() {
    if (!rooms) {
      return update();
    }
    return $q.when(rooms);
  }

  function getById(id) {

  }

  function update() {
    return $http.get(serverUrl + '/rooms').then(function (result) {
      rooms = [];
      _.forEach(result.data.data, function (data) {
        var cap = _.parseInt(data.capacity);
        if (cap <= 2) {
          data.capacityName = "small";
        } else if (cap <= 5) {
          data.capacityName = "medium";
        } else {
          data.capacityName = "large";
        }
        data.booked = data.status.name === 'Booked';
        rooms.push(data);
      });
      return rooms;
    })
  }

  function book(room) {
    var end = new Date();
    end.setHours(end.getHours()+1);

    var data = {
      "roomId": room._id,
      "start":new Date(),
      "end": end,
      "owner": "mobileApplication",
      "invitees": [
        "my friends"
      ]
    };
    return $http.post(serverUrl + '/booking',data).then(function (result) {
      room.status.name = "Booked";
      room.booked = true;
    })

  }

  function nbRoom(){
    return rooms? rooms.length : 0;
  }
}
