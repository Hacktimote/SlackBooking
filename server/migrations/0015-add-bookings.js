var mongodb = require('mongodb');

exports.up = function(db, next) {
    var bookings = db.collection('bookings');
    bookings.insert({}, next);
};

exports.down = function(db, next) {
    var bookings = db.collection('bookings');
    rooms.findAndModify({}, [], {}, { remove: true }, next);
};