const axios = require('axios');

let cachedToken = null;
let tokenExpiresAt = 0;

async function getToken() {
  const now = Date.now();
  if (cachedToken && now < tokenExpiresAt) {
    return cachedToken;
  }

  const email = process.env.SHIPROCKET_EMAIL;
  const password = process.env.SHIPROCKET_PASSWORD;

  if (!email || !password) {
    console.warn('Shiprocket credentials are not set. Skipping Shiprocket integration.');
    return null;
  }

  const res = await axios.post('https://apiv2.shiprocket.in/v1/external/auth/login', {
    email,
    password,
  });

  cachedToken = res.data.token;
  // Token is typically valid for 10 minutes; keep it a bit shorter
  tokenExpiresAt = now + 8 * 60 * 1000;

  return cachedToken;
}

exports.createShipmentForOrder = async (order) => {
  try {
    const token = await getToken();
    if (!token) return null;

    const items = order.items.map((item, index) => ({
      name: item.title || `Item ${index + 1}`,
      sku: String(item.product),
      units: item.quantity,
      selling_price: item.price,
    }));

    const payload = {
      order_id: String(order._id),
      order_date: order.createdAt || new Date(),
      pickup_location: process.env.SHIPROCKET_PICKUP || 'Primary',
      channel_id: '',
      billing_customer_name: order.customerName || 'Customer',
      billing_last_name: '',
      billing_address: order.address || 'NA',
      billing_city: '',
      billing_pincode: '',
      billing_state: '',
      billing_country: 'India',
      billing_email: order.customerEmail || '',
      billing_phone: order.customerPhone || '',
      shipping_is_billing: true,
      order_items: items,
      payment_method: order.status === 'paid' ? 'Prepaid' : 'COD',
      sub_total: order.total,
      length: 10,
      breadth: 10,
      height: 5,
      weight: 0.5,
    };

    const res = await axios.post(
      'https://apiv2.shiprocket.in/v1/external/orders/create/adhoc',
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return res.data;
  } catch (err) {
    console.error('Error creating Shiprocket shipment:', err.response?.data || err.message);
    return null;
  }
};


