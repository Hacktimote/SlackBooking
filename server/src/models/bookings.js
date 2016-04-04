
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const BookingSchema = new Schema({
    name: String,
    start: Date,
    end: Date,
    invitees: Array
});

module.exports = mongoose.model('bookings', BookingSchema);
