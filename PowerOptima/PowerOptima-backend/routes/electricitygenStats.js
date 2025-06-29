const express = require('express');
const router = express.Router();
const ElectricityGenerationStats = require('../models/ElectricityGenerationStats');

router.get('/:country', async (req, res) => {
  const country = req.params.country;

  try {
    const stats = await ElectricityGenerationStats.findOne({ Country: country });

    if (!stats) {
      return res.status(404).json({ message: 'Electricity generation stats not found for the specified country.' });
    }

    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching electricity generation stats.', error });
  }
});

module.exports = router;