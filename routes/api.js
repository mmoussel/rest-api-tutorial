const express = require("express");
const router = express.Router();
const Ninja = require("../models/ninja");

// get a list of ninjas from db
router.get("/ninjas", async (req, res, next) => {
  try {
    const ninjasList = await Ninja.aggregate().near({
      near: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
      maxDistance: 100000,
      spherical: true,
      distanceField: "dist.calculated",
    });
    res.send(ninjasList);
  } catch (e) {
    next(e);
  }
});

// add a new ninja to the db
router.post("/ninjas", async (req, res, next) => {
  try {
    const ninja = await Ninja.create(req.body);
    res.json(ninja);
  } catch (e) {
    next(e);
  }
});

// update a ninja in the db
router.put("/ninjas/:id", async (req, res, next) => {
  const ninjaId = req.params.id;
  try {
    await Ninja.findByIdAndUpdate({ _id: ninjaId }, req.body);
    const ninja = await Ninja.findOne({ _id: ninjaId });

    res.json(ninja);
  } catch (error) {
    next(error);
  }
});

// delete a ninja from the db
router.delete("/ninjas/:id", async (req, res, next) => {
  const ninjaId = req.params.id;
  try {
    const ninja = await Ninja.findByIdAndDelete({ _id: ninjaId });
    res.send(ninja);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
