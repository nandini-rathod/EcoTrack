const express = require("express");
const router = express.Router();
const TransportEmission = require("../models/TransportEmission"); 

router.get("/emissions/:mode", async (req, res) => {
  const mode = req.params.mode;

  try {
    const emissionData = await TransportEmission.findOne({ transport_mode: mode });
    
    if (!emissionData) {
      return res.status(404).json({ message: "Emission data not found for the specified mode." });
    }

    const emissionInfo = {
      transport_mode: emissionData.transport_mode,
      co2_emission_per_km: emissionData.co2_emission_per_km
    };

    return res.status(200).json(emissionInfo);
  } catch (error) {
    console.error("Error fetching CO2 emission data:", error);
    return res.status(500).json({ message: "An error occurred while fetching CO2 emission data." });
  }
});

module.exports = router;
