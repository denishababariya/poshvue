const mongoose = require('mongoose');

const aboutUsSchema = new mongoose.Schema({
  heroHeader: {
    title: String,
    subtitle: String,
  },
  ourStory: {
    image: String,
    subtitle: String,
    title: String,
    description: [String], // Array of paragraphs
    stats: [{
      number: String,
      label: String,
    }],
  },
  whyChooseUs: [{
    icon: String,
    title: String,
    desc: String,
  }],
  visionSection: {
    quoteIcon: String,
    subtitle: String,
    visionText: String,
    buttonText: String,
  },
  experienceBanner: {
    icon: String,
    title: String,
    description: String,
  },
});

module.exports = mongoose.model('AboutUs', aboutUsSchema);