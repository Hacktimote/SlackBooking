const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const RoomSchema = new Schema({
    name: String,
    beacon_id: String,
    location: String,
    assets: Array,
    capacity: String
});

module.exports = mongoose.model('rooms', RoomSchema);
