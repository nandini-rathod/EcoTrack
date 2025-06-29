const mongoose = require('mongoose');

const electricityGenerationStatsSchema = new mongoose.Schema({
  Country: {
    type: String,
    required: true,
    unique: true
  },
  Coal: {
    type: Number,
    required: true,
  },
  Gas: {
    type: Number,
    required: true,
  },
  Oil: {
    type: Number,
    required: true,
  },
  Hydro: {
    type: Number,
    required: true,
  },
  Renewable: {
    type: Number,
    required: true,
  },
  Nuclear: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

const ElectricityGenerationStats = mongoose.model('ElectricityGenerationStats', electricityGenerationStatsSchema);

module.exports = ElectricityGenerationStats;
