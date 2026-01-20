const axios = require('axios');

const SHIPROCKET_URL = process.env.SHIPROCKET_URL || 'https://apiv2.shiprocket.in/v1/external';
const SHIPROCKET_EMAIL = process.env.SHIPROCKET_EMAIL;
const SHIPROCKET_PASSWORD = process.env.SHIPROCKET_PASSWORD;

let cachedToken = null;
let tokenExpiresAt = 0;

async function getToken() {
  const now = Date.now();
  if (cachedToken && now < tokenExpiresAt) {
    return cachedToken;
  }

  if (!SHIPROCKET_EMAIL || !SHIPROCKET_PASSWORD) {
    console.warn('Shiprocket credentials are not set. Skipping Shiprocket integration.');
    return null;
  }

  try {
    const res = await axios.post(`${SHIPROCKET_URL}/auth/login`, {
      email: SHIPROCKET_EMAIL,
      password: SHIPROCKET_PASSWORD,
    });

    cachedToken = res.data.token;
    // Token is typically valid for 10 minutes; keep it a bit shorter
    tokenExpiresAt = now + 8 * 60 * 1000;

    return cachedToken;
  } catch (err) {
    console.error('Error getting Shiprocket token:', err.response?.data || err.message);
    return null;
  }
}

/**
 * Create shipment for order in Shiprocket
 * Returns shipment detail object for storage in Order model
 */
exports.createShipmentForOrder = async (order) => {
  try {
    const token = await getToken();
    if (!token) return null;

    const items = order.items.map((item, index) => ({
      name: item.name || item.title || `Item ${index + 1}`,
      sku: String(item.product || ''),
      units: item.qty || item.quantity,
      selling_price: item.price,
    }));

    // Get shipping info from order
    const shippingInfo = order.shippingInfo || {};
    const dimension = order.dimension || { length: 10, breadth: 10, height: 5, weight: 0.5 };

    const payload = {
      order_id: String(order._id),
      order_date: order.order_date || new Date(order.createdAt || Date.now()).toISOString().replace('T', ' ').split('.')[0],
      pickup_location: process.env.SHIPROCKET_PICKUP || 'Primary',
      channel_id: '',
      billing_customer_name: shippingInfo.firstName || order.customerName || 'Customer',
      billing_last_name: shippingInfo.lastName || '',
      billing_address: shippingInfo.address || order.address || 'NA',
      billing_city: shippingInfo.city || 'Mumbai',
      billing_pincode: shippingInfo.pincode || '400001',
      billing_state: shippingInfo.state || 'Maharashtra',
      billing_country: shippingInfo.country || 'India',
      billing_email: shippingInfo.email || order.customerEmail || '',
      billing_phone: shippingInfo.phone || order.customerPhone || '',
      shipping_is_billing: true,
      order_items: items,
      payment_method: order.paymentStatus === 'completed' ? 'Prepaid' : 'COD',
      sub_total: order.subTotal || order.total || 0,
      length: dimension.length || 10,
      breadth: dimension.breadth || 10,
      height: dimension.height || 5,
      weight: dimension.weight || 0.5,
    };

    console.log('Creating Shiprocket order with payload:', payload);

    const res = await axios.post(
      `${SHIPROCKET_URL}/orders/create/adhoc`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Shiprocket response:', res.data);

    // Map Shiprocket response to our shipmentDetail format
    const shipmentDetail = {
      pickup_location_added: res.data.pickup_location_added || 0, 
      order_created: res.data.order_created || 1,
      awb_generated: res.data.awb_generated || 0,
      label_generated: res.data.label_generated || 0,
      pickup_generated: res.data.pickup_generated || 0,
      manifest_generated: res.data.manifest_generated || 0,
      pickup_scheduled_date: res.data.pickup_scheduled_date || null,
      pickup_booked_date: res.data.pickup_booked_date || null,
      order_id: res.data.order_id,
      shipment_id: res.data.shipment_id,
      awb_code: res.data.awb_code || '',
      courier_company_id: res.data.courier_company_id || '',
      courier_name: res.data.courier_name || '',
      assigned_date_time: res.data.assigned_date_time || '',
      applied_weight: res.data.applied_weight || dimension.weight || 0.5,
      cod: res.data.cod || 0,
      label_url: res.data.label_url || null,
      manifest_url: res.data.manifest_url || null,
      awb_assign_error: res.data.awb_assign_error || '',
      order_shipment_id: res.data.order_shipment_id || res.data.shipment_id,
      channel_order_id: String(order._id),
    };

    return {
      shipmentDetail,
      shipmentId: res.data.shipment_id,
      orderId: res.data.order_id,
    };
  } catch (err) {
    console.error('Error creating Shiprocket shipment:', err.response?.data || err.message);
    return null;
  }
};

/**
 * Get shipment tracking details from Shiprocket
 */
exports.getShipmentTracking = async (shipmentId) => {
  try {
    const token = await getToken();
    if (!token || !shipmentId) return null;

    const res = await axios.get(
      `${SHIPROCKET_URL}/courier/track/shipment/${shipmentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (err) {
    console.error('Error getting Shiprocket tracking:', err.response?.data || err.message);
    return null;
  }
};

/**
 * Get order by Shiprocket order ID
 */
exports.getOrderByShiprocketId = async (shiprocketOrderId) => {
  try {
    const token = await getToken();
    if (!token || !shiprocketOrderId) return null;

    const res = await axios.get(
      `${SHIPROCKET_URL}/orders/show/${shiprocketOrderId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (err) {
    console.error('Error getting Shiprocket order:', err.response?.data || err.message);
    return null;
  }
};

/**
 * Update order with Shiprocket shipment data
 */
exports.updateOrderWithShipmentData = async (order, shiprocketData) => {
  try {
    if (!shiprocketData) return order;

    order.orderId = shiprocketData.orderId;
    order.shipmentId = shiprocketData.shipmentId;
    order.shipmentDetail = shiprocketData.shipmentDetail;
    order.trackingNumber = shiprocketData.shipmentId; // For backward compatibility

    // Set order_date if not already set
    if (!order.order_date) {
      order.order_date = new Date(order.createdAt).toISOString().replace('T', ' ').split('.')[0];
    }

    return order;
  } catch (err) {
    console.error('Error updating order with shipment data:', err);
    return order;
  }
};

/**
 * Handle return order creation
 */
exports.createReturnOrder = async (orderId, returnData) => {
  try {
    const token = await getToken();
    if (!token) return null;

    const payload = {
      shipment_id: returnData.shipmentId,
      return_reason: returnData.returnReason || 'Product defective',
      return_comments: returnData.returnComments || '',
    };

    const res = await axios.post(
      `${SHIPROCKET_URL}/orders/create/return`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Shiprocket return order response:', res.data);

    // Map to our returnOrderDetail format
    const returnOrderDetail = {
      order_id: res.data.order_id,
      channel_order_id: `RET-${orderId}`,
      shipment_id: res.data.shipment_id,
      status: res.data.status || 'RETURN PENDING',
      status_code: res.data.status_code || 21,
      company_name: returnData.companyName || '',
      is_qc_check: res.data.is_qc_check || 0,
    };

    return {
      returnOrderDetail,
      returnShipmentId: res.data.shipment_id,
    };
  } catch (err) {
    console.error('Error creating Shiprocket return order:', err.response?.data || err.message);
    return null;
  }
};

/**
 * Update shipment status (webhook handler)
 */
exports.updateShipmentStatus = async (webhookData) => {
  try {
    // Handle Shiprocket webhook data
    // This can be called from a webhook endpoint
    return {
      success: true,
      data: webhookData,
    };
  } catch (err) {
    console.error('Error updating shipment status:', err);
    return null;
  }
};
