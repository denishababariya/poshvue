const mongoose = require('mongoose');

const sliderSchema = new mongoose.Schema({
  slides: [{
    title: String,
    subtitle: String,
    image: String,
    buttonText: String,
    textPosition: {
      type: String,
      enum: ['start', 'center', 'end'],
      default: 'center'
    },
  }],
});

module.exports = mongoose.model('Slider', sliderSchema);