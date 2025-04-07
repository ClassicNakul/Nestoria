const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
  title: String,
  address: String,
  size: String,
  pricePerMonth: String,
  contactName: String,
  contactEmail: String,
  contactPhone: String,
  image: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Rental', rentalSchema);
