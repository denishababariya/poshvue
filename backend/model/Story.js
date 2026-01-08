const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  hero: {
    title: String,
    subtitle: String,
    backgroundImage: String
  },
  philosophy: {
    established: String,
    title: String,
    text1: String,
    text2: String,
    image: String
  },
  values: {
    title: String,
    subtitle: String,
    cards: [{
      icon: String,
      title: String,
      description: String
    }]
  },
  craftsmanship: {
    title: String,
    text: String,
    image: String,
    points: [{
      icon: String,
      title: String,
      description: String
    }]
  },
  whyChooseUs: [{
    icon: String,
    title: String,
    description: String
  }],
  cta: {
    title: String,
    subtitle: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Story', storySchema);