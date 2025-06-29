const mongoose = require("mongoose");

const carbonCardSchema = new mongoose.Schema({
  monthlyCarbonEmission: [
    {
      month: {
        type: String,
        required: true,
      },
      carbonEmission: {
        type: Number,
        default: 0,
      },
    },
  ],
  electricityConsumptionCO2e: {
    type: Number,
    default: 0,
  },
  greenCredits: {
    type: Number,
    default: 0,
  },
  balance: {
    type: Number,
    default: 0,
  },
  sustainableSelectPurchaseAmount: {
    type: Number,
    default: 0,
  },
  points: {
    type: Number,
    default: 0,
  },
  wasteco2e: { 
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("CarbonCard", carbonCardSchema);