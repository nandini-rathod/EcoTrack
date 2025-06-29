const express = require('express');
const router = express.Router();
const User = require('../models/User');
const ElectricBill = require('../models/ElectricBill');

router.get('/aadhar/:aadharNumber', async (req, res) => {
  try {
    const { aadharNumber } = req.params;

    const user = await User.findOne({ aadharNumber });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const electricBill = await ElectricBill.findOne({ aadharNumber });

    if (!electricBill) {
      return res.status(404).json({ error: 'Electric bill not found' });
    }

    res.status(200).json(electricBill);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/electric-bills/:billingID', async (req, res) => {
  try {
    const { billingID } = req.params;

    const electricBill = await ElectricBill.findOne({ billingID });

    if (!electricBill) {
      return res.status(404).json({ error: 'Electric bill not found' });
    }

    res.status(200).json(electricBill);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
