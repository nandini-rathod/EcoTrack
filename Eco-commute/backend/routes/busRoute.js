const express = require("express");
const router = express.Router();
const BusRoute = require("../models/Bus");

router.get("/bus-routes/:origin/:destination", async (req, res) => {
  const { origin, destination } = req.params;
  try {
    const busRoutes = await BusRoute.find({ origin, destination });

    if (!busRoutes || busRoutes.length === 0) {
      return res.status(404).json({ message: "No bus routes found for the given origin and destination." });
    }

    return res.status(200).json(busRoutes);
  } catch (error) {
    console.error("Error fetching bus route information:", error);
    return res.status(500).json({ message: "An error occurred while fetching bus route information." });
  }
});

module.exports = router;
