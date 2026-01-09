const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
  email: String,
  hours: String,
  mapUrl: String,
  image: String,
  lat: Number,
  lng: Number
}, { timestamps: true });

const storeLocatorSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  bannerImage: String,
  stores: [storeSchema]
}, { timestamps: true });

module.exports = mongoose.model('StoreLocator', storeLocatorSchema);
