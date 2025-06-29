const mongoose = require('mongoose');

const railwaySchema = new mongoose.Schema({
    StationCode: {
        type: String,
        required: true,
        unique: true
    },
    StationName: {
        type: String,
        required: true
    },
    Place: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Railway', railwaySchema);