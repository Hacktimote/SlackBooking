
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const BookingSchema = new Schema({
    roomId: String,
    start: Date,
    end: Date,
    owner: String,
    invitees: Array
});

module.exports = mongoose.model('bookings', BookingSchema);
