const mongoose = require('mongoose');

const homePosterSchema = new mongoose.Schema({
  topText: {
    title: String,
    desc: String,
  },
  mainContent: {
    title: String,
    desc: String,
    buttonText: String,
    image: String,
  },
  whyChooseUs: [{
    icon: String, // e.g., 'Award'
    title: String,
    desc: String,
  }],
  cards: [{
    image: String,
    title: String,
    buttonText: String,
  }],
});

module.exports = mongoose.model('HomePoster', homePosterSchema);