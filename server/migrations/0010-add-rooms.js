var mongodb = require('mongodb');

var room1 = {
    "name": "Meeting",
    "beaconId": "1234",
    "location": "main",
    "capacity": "8",
    "assets": ["whiteboard", "smartboard"]
};

var room2 = {
    "name": "Conference",
    "beaconId": "2345",
    "location": "main",
    "capacity": "4",
    "assets": ["whiteboard"]
};

exports.up = function(db, next) {
    var rooms = db.collection('rooms');
    rooms.insert(room1, next);
    rooms.insert(room2, next);
};

exports.down = function(db, next) {
    var rooms = db.collection('rooms');
    pets.findAndModify(room1, [], {}, { remove: true }, next);
    pets.findAndModify(room2, [], {}, { remove: true }, next);
};