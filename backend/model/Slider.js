const mongoose = require('mongoose');

const sliderSchema = new mongoose.Schema({
  slides: [{
    title: String,
    subtitle: String,
    image: String,
    buttonText: String,
  }],
});

module.exports = mongoose.model('Slider', sliderSchema);