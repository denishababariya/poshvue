const mongoose = require('mongoose');

const termAndConditionSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  points: [{
    text: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('TermAndCondition', termAndConditionSchema);