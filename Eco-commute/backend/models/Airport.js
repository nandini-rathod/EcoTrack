const mongoose = require('mongoose');

const airportSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ICAO: {
        type: String
    },
    IATA: {
        type: String
    },
    country: {
        type: String,
        required: true
    },
    coordinates: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Airport', airportSchema);
