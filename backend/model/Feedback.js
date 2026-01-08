const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }, // optional for anonymous
    name: { type: String, required: true },      // added
    email: { type: String, required: true },     // added
    type: { type: String, enum: ['general', 'product', 'service'], default: 'general' },
    message: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Feedback', FeedbackSchema);
