const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    name: String,
    beaconId: String,
    location: String,
    assets: Array,
    capacity: String,
    status: Object
});

module.exports = mongoose.model('rooms', RoomSchema);

