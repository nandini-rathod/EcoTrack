const mongoose = require('mongoose');

const electricBillSchema = new mongoose.Schema({
  aadharNumber: {
    type: String,
    required: true,
  },
  billingID: {
    type: String,
    required: true,
    unique: true,
  },
  Country : {
    type : String,
    required : true
  }
  ,
  billingAmount: {
    type: Number,
    required: true,
  },
  powerConsumed: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['Paid', 'Unpaid'],
    default: 'Unpaid',
  },
  dueDate: {
    type: Date,
    required: true,
  },
  monthConsumption: [
    {
      month: {
        type: String,
        required: true,
      },
      consumption: {
        type: Number,
        required: true,
      },
    },
  ],
}, { timestamps: true });

const ElectricBill = mongoose.model('ElectricBill', electricBillSchema);

module.exports = ElectricBill;
