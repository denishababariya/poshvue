const mongoose = require('mongoose');

const contactPageSchema = new mongoose.Schema({
  title: String,
  breadcrumb: String,
  bannerImage: String,
  formIntro: String,
  infoCards: [{ icon: String, title: String, text: String }],
  mapSrc: String,
  followLinks: { facebook: String, instagram: String, youtube: String },
  contactPhone: String,
  contactEmail: String
}, { timestamps: true });

module.exports = mongoose.model('ContactPage', contactPageSchema);
