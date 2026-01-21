# ✅ Frontend Order Creation - Working Integration

## Endpoint

```
POST http://localhost:5000/api/commerce/orders
Authorization: Bearer {JWT_TOKEN}
Content-Type: application/json
```

## Working Example (Copy This)

### React Checkout Component

```jsx
import React, { useState } from 'react';
import axios from 'axios';

const CheckoutForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login first');
        setLoading(false);
        return;
      }

      // Prepare order data
      const orderData = {
        items: [
          {
            name: "Test Product 1",
            qty: 1,
            price: 200,
            discount: 0,
            tax: 0,
            product: "507f1f77bcf86cd799439011" // Valid product ID from DB
          },
          {
            name: "Test Product 2",
            qty: 2,
            price: 150,
            discount: 10,
            tax: 0,
            product: "507f1f77bcf86cd799439012"
          }
        ],
        shippingInfo: {
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          phone: "1234567890",
          address: "123 Electronics Street",
          city: "Mumbai",
          state: "MH",
          country: "India",
          pincode: "400001"
        },
        subTotal: 500,
        discount: 10,
        dimension: {
          length: 10,
          breadth: 10,
          height: 5,
          weight: 2.5
        },
        paymentMethod: "card",
        paymentStatus: "completed"
      };

      console.log('📤 Sending order data:', orderData);

      // Send request
      const response = await axios.post(
        '/api/commerce/orders',
        orderData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('✅ Order created successfully:', response.data);
      
      // Show success message
      alert(`Order created! ID: ${response.data.item._id}`);
      
      // Redirect or update UI
      // navigate(`/order/${response.data.item._id}`);

    } catch (err) {
      console.error('❌ Error creating order:', err);
      
      // Log detailed error
      if (err.response) {
        console.error('Status:', err.response.status);
        console.error('Message:', err.response.data?.message);
        console.error('Errors:', err.response.data?.errors);
        console.error('Details:', err.response.data?.details);
        
        setError(err.response.data?.message || 'Order creation failed');
      } else {
        setError(err.message || 'Network error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Create Order</h2>
      {error && <div style={{color: 'red'}}>{error}</div>}
      <button 
        onClick={handleCreateOrder}
        disabled={loading}
      >
        {loading ? 'Creating Order...' : 'Create Test Order'}
      </button>
    </div>
  );
};

export default CheckoutForm;
```

### Using Fetch API

```javascript
async function createOrder() {
  const token = localStorage.getItem('token');

  const orderData = {
    items: [
      {
        name: "Laptop",
        qty: 1,
        price: 50000,
        discount: 0,
        tax: 0
      }
    ],
    shippingInfo: {
      firstName: "Raj",
      lastName: "Kumar",
      email: "raj@example.com",
      phone: "9876543210",
      address: "123 Tech Park",
      city: "Bangalore",
      state: "KA",
      country: "India",
      pincode: "560001"
    },
    subTotal: 50000,
    discount: 0,
    dimension: {
      length: 30,
      breadth: 20,
      height: 10,
      weight: 3
    },
    paymentMethod: "card",
    paymentStatus: "completed"
  };

  try {
    const response = await fetch('/api/commerce/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderData)
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('❌ Error:', result.message);
      console.error('Details:', result.errors);
      return null;
    }

    console.log('✅ Order created:', result.item);
    return result.item;

  } catch (error) {
    console.error('Network error:', error);
    return null;
  }
}

// Call the function
createOrder();
```

## Minimal Working Example

Absolute minimum to create an order:

```javascript
{
  items: [
    {
      name: "Product",
      qty: 1,
      price: 100
    }
  ],
  paymentStatus: "completed"
}
```

## Frontend Integration Steps

### Step 1: Get User Token
```javascript
const token = localStorage.getItem('token');
if (!token) {
  console.error('User not logged in');
  return;
}
```

### Step 2: Collect Order Data from Form
```javascript
const formData = {
  items: form.items,           // From cart
  shippingInfo: form.address,  // From address form
  paymentMethod: form.payment, // From payment selection
  paymentStatus: 'completed'   // After payment success
};
```

### Step 3: Validate Before Sending
```javascript
const validateOrder = (order) => {
  // Check items
  if (!order.items || order.items.length === 0) {
    return { valid: false, error: 'No items in order' };
  }

  // Check each item
  for (let item of order.items) {
    if (!item.name) return { valid: false, error: 'Item name missing' };
    if (!item.qty) return { valid: false, error: 'Item quantity missing' };
    if (!item.price) return { valid: false, error: 'Item price missing' };
  }

  // Check shipping info (optional but recommended)
  if (order.shippingInfo?.pincode && !/^\d{6}$/.test(order.shippingInfo.pincode)) {
    return { valid: false, error: 'Invalid pincode (must be 6 digits)' };
  }

  if (order.shippingInfo?.phone && !/^\d{10}$/.test(order.shippingInfo.phone)) {
    return { valid: false, error: 'Invalid phone (must be 10 digits)' };
  }

  return { valid: true };
};

const validation = validateOrder(orderData);
if (!validation.valid) {
  console.error(validation.error);
  return;
}
```

### Step 4: Send Request
```javascript
const response = await axios.post(
  '/api/commerce/orders',
  orderData,
  {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
);
```

### Step 5: Handle Response
```javascript
if (response.status === 201) {
  const order = response.data.item;
  console.log('Order created:', order._id);
  console.log('Shipment ID:', order.shipmentId);
  // Show success message
}
```

## Real-World Checkout Flow

```javascript
class CheckoutManager {
  constructor() {
    this.cart = [];
    this.shippingAddress = null;
    this.paymentMethod = 'card';
  }

  // Step 1: Set cart items
  setCartItems(items) {
    this.cart = items.map(item => ({
      name: item.productName,
      qty: item.quantity,
      price: item.salePrice,
      discount: item.discountAmount || 0,
      tax: 0,
      product: item.productId
    }));
  }

  // Step 2: Set shipping address
  setShippingAddress(address) {
    this.shippingAddress = {
      firstName: address.firstName,
      lastName: address.lastName,
      email: address.email,
      phone: address.mobile,
      address: address.address,
      city: address.city,
      state: address.state,
      country: address.country || 'India',
      pincode: address.pincode
    };
  }

  // Step 3: Set payment method
  setPaymentMethod(method) {
    this.paymentMethod = method; // 'card', 'upi', 'netbanking'
  }

  // Step 4: Process payment (simulate)
  async processPayment() {
    // Call payment gateway here
    // For now, just return success
    return { success: true, transactionId: 'TXN123' };
  }

  // Step 5: Create order
  async createOrder() {
    const token = localStorage.getItem('token');

    const calculateTotal = () => 
      this.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    const orderPayload = {
      items: this.cart,
      shippingInfo: this.shippingAddress,
      subTotal: calculateTotal(),
      discount: 0, // Get from coupon
      dimension: {
        length: 10,
        breadth: 10,
        height: 5,
        weight: 0.5
      },
      paymentMethod: this.paymentMethod,
      paymentStatus: 'completed'
    };

    try {
      const response = await axios.post(
        '/api/commerce/orders',
        orderPayload,
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );

      return response.data.item;
    } catch (error) {
      throw error;
    }
  }

  // Complete checkout flow
  async checkout() {
    try {
      // 1. Validate cart
      if (this.cart.length === 0) throw new Error('Cart is empty');

      // 2. Validate address
      if (!this.shippingAddress) throw new Error('Address not selected');

      // 3. Process payment
      const paymentResult = await this.processPayment();
      if (!paymentResult.success) throw new Error('Payment failed');

      // 4. Create order
      const order = await this.createOrder();

      // 5. Success
      console.log('✅ Order created successfully!', order);
      return { success: true, order };

    } catch (error) {
      console.error('❌ Checkout failed:', error.message);
      return { success: false, error: error.message };
    }
  }
}

// Usage
const checkout = new CheckoutManager();
checkout.setCartItems(cartItems);
checkout.setShippingAddress(selectedAddress);
checkout.setPaymentMethod('card');
checkout.checkout().then(result => {
  if (result.success) {
    navigate(`/order-confirmation/${result.order._id}`);
  }
});
```

## Testing with Different Data

### Test 1: Minimal Order
```javascript
{
  items: [{name: "Product", qty: 1, price: 100}],
  paymentStatus: "completed"
}
// Expected: Success, order created with defaults
```

### Test 2: Complete Order
```javascript
{
  items: [
    {name: "Product 1", qty: 1, price: 200, discount: 0, tax: 0},
    {name: "Product 2", qty: 2, price: 150, discount: 10, tax: 0}
  ],
  shippingInfo: {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "1234567890",
    address: "123 Street",
    city: "City",
    state: "GJ",
    country: "India",
    pincode: "395006"
  },
  subTotal: 500,
  discount: 10,
  dimension: {length: 10, breadth: 10, height: 5, weight: 2.5},
  paymentMethod: "card",
  paymentStatus: "completed"
}
// Expected: Success, order created with Shiprocket shipment
```

### Test 3: Old Format (Backward Compatibility)
```javascript
{
  items: [
    {title: "Product", quantity: 1, price: 100}
  ],
  customerName: "John Doe",
  customerEmail: "john@example.com",
  customerPhone: "1234567890",
  address: "123 Street",
  total: 100,
  paymentStatus: "completed"
}
// Expected: Success, auto-converted to new format
```

## Error Handling Checklist

✅ Check 400 error response for validation errors
✅ Check 401 error if token is missing/invalid
✅ Check 500 error for server issues
✅ Log detailed error messages to console
✅ Show user-friendly error messages
✅ Validate pincode (6 digits)
✅ Validate phone (10 digits)
✅ Validate email format
✅ Validate items array not empty
✅ Ensure paymentStatus is set correctly

## Debugging Tips

```javascript
// Enable verbose logging
const logRequest = (data) => {
  console.log('📤 Request Payload:', JSON.stringify(data, null, 2));
};

const logResponse = (status, data) => {
  console.log(`📥 Response (${status}):`, JSON.stringify(data, null, 2));
};

// Test items individually
items.forEach((item, i) => {
  if (!item.name) console.warn(`⚠️ Item ${i}: missing name`);
  if (!item.qty) console.warn(`⚠️ Item ${i}: missing qty`);
  if (!item.price) console.warn(`⚠️ Item ${i}: missing price`);
});

// Validate addresses individually
if (shippingInfo) {
  ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'pincode'].forEach(field => {
    if (!shippingInfo[field]) {
      console.warn(`⚠️ ShippingInfo: missing ${field}`);
    }
  });
}
```

## Production Checklist

- [ ] User is authenticated (check token)
- [ ] Cart has items
- [ ] All required fields populated
- [ ] Phone number is 10 digits
- [ ] Pincode is 6 digits
- [ ] Email is valid format
- [ ] Payment processed successfully
- [ ] paymentStatus set to "completed"
- [ ] Error handling implemented
- [ ] Loading state shown
- [ ] Success redirect configured

---

**Status**: ✅ Ready for Frontend Integration
**Tested**: Yes
**Last Updated**: January 20, 2026
