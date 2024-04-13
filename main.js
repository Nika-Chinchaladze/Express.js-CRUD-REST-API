// external imports
const express = require("express");
const bodyParser = require("body-parser");

// internal inmorts
const routes = require("./routes/app");
const db = require("./routes/mongoDB/mdb");

// setup application
const app = express();
const port = 3000;

// mongodb setup
db();

// add configurations
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});
app.use(routes);

// listen to server
app.listen(port, () => {
    console.log("server runs on: http://localhost/" + port);
});
