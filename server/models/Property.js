const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: String,
  location: String,
  size: String,
  price: String,
  contactName: String,
  contactEmail: String,
  contactPhone: String,
  image: String,
  description: String,
});

module.exports = mongoose.model('Property', propertySchema);
