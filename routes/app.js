// high level imports
const express = require("express");

// local imports
const Location = require("./mongoDB/models");

// setup router
const router = express.Router();


// ========================= GET routes =========================>> DONE // 
router.get("/location/all", async (req, res, next) => {
    // request section
    const locations = await Location.find().select(["address", "latitude", "longitude"]);
    
    // response section
    if (locations) {
        res.status(200).json({
            status: 200,
            message: "Locations returned successfully...",
            locations: locations
        })
    } else {
        res.status(404).json({
            status: 404,
            message: "Locations can't be loaded...",
            locations: []
        })
    }
});


router.get("/location/:id", async (req, res, next) => {
    // request section
    const id = req.params.id.toString();
    const location = await Location.findOne({"_id": id}).select(["address", "latitude", "longitude"]);

    // response section
    if (location) {
        res.status(200).json({
            status: 200,
            message: "Location returned successfully...",
            location: location
        });
    } else {
        res.status(404).json({
            status: 404,
            message: "Location not found...",
            location: "empty"
        });
    }
});


// ========================= POST routes =========================>> DONE //
router.post("/location", async (req, res, next) => {
    // request section
    const newLocation = new Location(req.body);
    newLocation.save()
        .then(success => console.log("Location stored..."))
        .catch(error => console.log(error));

    // response section
    res.status(201).json({
        status: 201,
        message: "Location stored successfully!",
        data: {
            address: req.body.address,
            latitude: req.body.latitude,
            longitude: req.body.longitude
        }
    });
});


// ========================= PUT routes =========================>> DONE //
router.put("/location/:id", async (req, res, next) => {
    // request section
    const id = req.params.id;
    const oldLocation = await Location.findOne({"_id": id});

    if (oldLocation) {
        const newData = {
            address: req.body.address,
            latitude: req.body.latitude,
            longitude: req.body.longitude
        }
        const targetLocation = await Location.findOneAndReplace({"_id": id}, newData);

        // response section
        if (targetLocation) {
            const newLocation = await Location.findOne({"_id": id});
            res.status(201).json({
                status: 200,
                message: "Location has been replaced successfully...",
                oldLocation: oldLocation,
                newLocation: newLocation,
            });
        } else {
            res.status(404).json({
                status: 404,
                message: "targetLocation not found...",
            });
        }
    } else {
        res.status(404).json({
            status: 404,
            message: "oldLocation not found...",
        });   
    }

});


// ========================= PATCH routes =========================>> DONE //
router.patch("/location/:id", async (req, res, next) => {
    // request section
    const id = req.params.id.toString();
    const fieldName = req.query.fieldName.toString();
    const fieldValue = req.query.fieldValue.toString();
    const targetLocation = await Location.findOneAndUpdate({"_id": id}, {[fieldName]: fieldValue}).select(["address", "latitude", "longitude"]);

    // response section
    if (targetLocation) {
        res.status(201).json({
            status: 201,
            message: "Location has been successfully...",
            location: targetLocation
        });
    } else {
        res.status(404).json({
            status: 404,
            message: "Location not found...",
            location: "empty"
        });
    }
});


// ========================= DELETE routes =========================>> DONE //
router.delete("/location/:id", async (req, res, next) => {
    // request section
    const id = req.params.id.toString();
    const firstTargetLocation = await Location.findOne({"_id": id});
    if (firstTargetLocation) {
        const secondTargetLocation = await Location.deleteOne({"_id": id});
        // response section
        res.status(200).json({
            status: 200,
            message: "Location has been deleted successfully...",
            deleted: firstTargetLocation
        });
    } else {
        res.status(404).json({
            status: 404,
            message: "Location not found...",
        });
    }
});


// export to become available in main.js file
module.exports = router;


// useful links
const mongoCrudApp = "https://medium.com/@skhans/how-to-build-a-basic-node-js-crud-app-with-mongoose-and-mongodb-3e958a36001d";
const mongoQuery = "https://mongoosejs.com/docs/api/query.html";
