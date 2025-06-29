const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  origin: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  operator: {
    type: String,
    required: true
  },
  departure_time: {
    type: String,
    required: true
  },
  arrival_time: {
    type: String,
    required: true
  },
  fare: {
    type: String,
    required: true
  },
  bus_type: {
    type: String,
    required: true
  },
  carbon_emission: {
    type: Number, 
    required: true
  }
});

const BusRoute = mongoose.model('BusRoute', routeSchema);

module.exports = BusRoute;
