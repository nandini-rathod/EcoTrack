const express = require("express");
const router = express.Router();
const Airport = require("../models/Airport"); 

router.get("/airports/:name", async (req, res) => {
  const name = req.params.name;
  try {
    const airport = await Airport.findOne({ name });
    console.log(airport)
    if (!airport) {
      return res.status(404).json({ message: "No airport found with the given name." });
    }

    const airportInfo = {
      name: airport.name
    };

    return res.status(200).json(airportInfo);
  } catch (error) {
    console.error("Error fetching airport information:", error);
    return res.status(500).json({ message: "An error occurred while fetching airport information." });
  }
});

module.exports = router;
