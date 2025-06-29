const mongoose = require("mongoose");
const CarbonCard = require("../models/CarbonCard");
const router = require("express").Router();

router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const carbonCard = await CarbonCard.findOne({ user: userId });

    if (!carbonCard) {
      return res.status(404).json({ message: "CarbonCard not found for this user" });
    }

    const greenCredits = carbonCard.greenCredits;

    res.status(200).json({ message: "Green credits retrieved successfully", greenCredits });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
