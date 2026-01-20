const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema(
  {
    name: { type: String },
    qty: { type: Number, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    size: { type: String },
    color: { type: String },
  },
  { _id: false }
);

const ShippingInfoSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    pincode: { type: String },
  },
  { _id: false }
);

const DimensionSchema = new mongoose.Schema(
  {
    length: { type: Number },
    breadth: { type: Number },
    height: { type: Number },
    weight: { type: Number },
  },
  { _id: false }
);

const ShipmentDetailSchema = new mongoose.Schema(
  {
    pickup_location_added: { type: Number, default: 0 },
    order_created: { type: Number, default: 0 },
    awb_generated: { type: Number, default: 0 },
    label_generated: { type: Number, default: 0 },
    pickup_generated: { type: Number, default: 0 },
    manifest_generated: { type: Number, default: 0 },
    pickup_scheduled_date: { type: String, default: null },
    pickup_booked_date: { type: String, default: null },
    order_id: { type: Number },
    shipment_id: { type: Number },
    awb_code: { type: String, default: '' },
    courier_company_id: { type: String, default: '' },
    courier_name: { type: String, default: '' },
    assigned_date_time: { type: String, default: '' },
    applied_weight: { type: Number },
    cod: { type: Number, default: 0 },
    label_url: { type: String, default: null },
    manifest_url: { type: String, default: null },
    awb_assign_error: { type: String },
    order_shipment_id: { type: Number },
    channel_order_id: { type: String },
  },
  { _id: false }
);

const ReturnOrderDetailSchema = new mongoose.Schema(
  {
    order_id: { type: Number },
    channel_order_id: { type: String },
    shipment_id: { type: Number },
    status: { type: String },
    status_code: { type: Number },
    company_name: { type: String },
    is_qc_check: { type: Number, default: 0 },
  },
  { _id: false }
);

const OrderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    pickup_location: { type: mongoose.Schema.Types.ObjectId },
    items: { type: [OrderItemSchema], required: true },
    shippingInfo: ShippingInfoSchema,
    subTotal: { type: Number },
    discount: { type: Number, default: 0 },
    dimension: DimensionSchema,
    status: {
      type: String,
      enum: ['pending', 'paid', 'processing', 'shipped', 'out_for_delivery', 'delivered', 'cancelled', 'cancle'],
      default: 'pending',
    },
    paymentMethod: { 
      type: String, 
      enum: ['card', 'netbanking', 'upi'], 
      default: 'card' 
    },
    paymentIntentId: { type: String },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    orderId: { type: Number }, // Shiprocket order ID
    order_date: { type: String }, // Format: "2026-01-16 16:22"
    shipmentDetail: ShipmentDetailSchema,
    shipmentId: { type: Number }, // Shiprocket shipment ID
    returnOrderDetail: ReturnOrderDetailSchema,
    returnShipmentId: { type: Number },
    // Legacy fields for backward compatibility
    customerName: { type: String },
    customerEmail: { type: String },
    customerPhone: { type: String },
    address: { type: String },
    total: { type: Number },
    trackingNumber: { type: String },
    trackingUrl: { type: String },
    shippingData: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);