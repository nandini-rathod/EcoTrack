const mongoose = require('mongoose');

const transportEmissionSchema = new mongoose.Schema({
  transport_mode: {
    type: String,
    required: true,
    unique: true
  },
  co2_emission_per_km: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('TransportEmission', transportEmissionSchema);