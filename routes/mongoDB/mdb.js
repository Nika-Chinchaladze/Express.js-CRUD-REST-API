const mongoose = require("mongoose");

// mongodb setup
const url = "mongodb://127.0.0.1:27017/locations";
const db = async () => {
    try {
        const con = await mongoose.connect(url);
        console.log(`mongodb connected: ${con.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}

module.exports = db;
