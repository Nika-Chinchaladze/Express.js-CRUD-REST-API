const mongoose = require("mongoose");


const LocationSchema = mongoose.Schema({
    address: {
        require: true,
        type: String
    },
    latitude: {
        require: true,
        type: String
    },
    longitude: {
        require: true,
        type: String
    }
});


const Location = mongoose.model("Location", LocationSchema);

module.exports = Location;
