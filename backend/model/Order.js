const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    title: { type: String },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    size: { type: String },   // variant size
    color: { type: String },  // variant color
  },
  { _id: false }
);

const OrderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    customerName: { type: String },
    customerEmail: { type: String },
    customerPhone: { type: String },
    items: { type: [OrderItemSchema], required: true },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    address: { type: String },
    paymentIntentId: { type: String },
    shippingData: { type: mongoose.Schema.Types.Mixed }, // raw Shiprocket response or tracking info
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);