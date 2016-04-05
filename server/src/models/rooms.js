const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const RoomSchema = new Schema({
    name: String,
    uuid: String,
    location: String,
    assets: Array,
    capacity: String,
    status: Object
});

module.exports = mongoose.model('rooms', RoomSchema);
