const mongoose = require('mongoose');

const CountrySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    code: { type: String, required: true, trim: true, unique: true, uppercase: true }, // ISO country code (e.g., "IN", "US")
    currency: { type: String, required: true, trim: true, uppercase: true }, // Currency code (e.g., "INR", "USD")
    currencySymbol: { type: String, required: true, trim: true }, // Currency symbol (e.g., "₹", "$")
    flagUrl: { type: String, required: true, trim: true }, // Flag image URL
    exchangeRate: { type: Number, default: 1 }, // Exchange rate relative to base currency (e.g., INR)
    active: { type: Boolean, default: true },
    isDefault: { type: Boolean, default: false }, // Only one country can be default
  },
  { timestamps: true }
);

// Ensure only one default country
CountrySchema.pre('save', async function (next) {
  if (this.isDefault) {
    await mongoose.model('Country').updateMany(
      { _id: { $ne: this._id } },
      { $set: { isDefault: false } }
    );
  }
  next();
});

module.exports = mongoose.model('Country', CountrySchema);
