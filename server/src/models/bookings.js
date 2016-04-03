
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const BookingSchema = new Schema({
    name: String,
    user_id: String,
    reserved: Date,
});

module.exports = mongoose.model('bookings', BookingSchema);
