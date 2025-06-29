const mongoose = require("mongoose");
const User = require("../models/User");
const router = require("express").Router();
const CarbonCard = require("../models/CarbonCard"); 

router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const carbonCard = await CarbonCard.findOne({ user: userId });
    
    if (!carbonCard) {
      return res.status(404).json({ message: "CarbonCard not found for this user" });
    }

    res.status(200).json({ message: "CarbonCard retrieved successfully", carbonCard });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newCarbonCardData = req.body;
    newCarbonCardData.user = userId;

    const newCarbonCard = new CarbonCard(newCarbonCardData);
    await newCarbonCard.save();

    res.status(201).json({ message: "CarbonCard created successfully", carbonCard: newCarbonCard });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;