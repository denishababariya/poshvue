const mongoose = require("mongoose");

const ComplaintSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    mobile: {
      type: String,
      required: true,
    },

    orderNumber: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    complaintType: {
      type: String,
      required: true,
      enum: [
        "Order Related",
        "Payment Issue",
        "Delivery Issue",
        "Product Issue",
        "Return / Refund",
        "Other",
      ],
    },

    message: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["open", "in-progress", "resolved"],
      default: "open",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Complaint", ComplaintSchema);
