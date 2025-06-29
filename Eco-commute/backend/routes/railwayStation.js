const express = require("express");
const router = express.Router();
const Railway = require("../models/Railway");

router.get("/stations/:place", async (req, res) => {
  const place = req.params.place;

  try {
    const stations = await Railway.find({ Place: place });
    if (stations.length === 0) {
      return res.status(404).json({ message: "No stations found for the given place." });
    }

    const stationData = stations.map(station => ({
      StationCode: station.StationCode,
      StationName: station.StationName
    }));

    return res.status(200).json(stationData);
  } catch (error) {
    console.error("Error fetching station data:", error);
    return res.status(500).json({ message: "An error occurred while fetching station data." });
  }
});

module.exports = router;