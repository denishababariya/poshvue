# Frontend Order Creation Guide

## Complete Order Creation Example

### JavaScript/React Example

```javascript
// Assume user has filled checkout form with:
// - Selected address from list
// - Selected items in cart
// - Payment method selected

const createOrder = async (formData) => {
  try {
    // Collect shipping information from address
    const shippingInfo = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      country: "India", // Or get from form
      pincode: formData.pincode,
    };

    // Calculate order totals
    const items = cart.items.map(item => ({
      name: item.productName,
      qty: item.quantity,
      price: item.price,
      discount: item.discount || 0,
      tax: item.tax || 0,
      product: item.productId,
    }));

    const subTotal = items.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const totalDiscount = items.reduce((sum, item) => sum + item.discount, 0);

    // Product dimensions (can be default or calculated)
    const dimension = {
      length: 10,
      breadth: 10,
      height: 5,
      weight: 0.5,
    };

    // Create order payload
    const orderPayload = {
      items,
      shippingInfo,
      subTotal,
      discount: totalDiscount,
      dimension,
      paymentMethod: formData.paymentMethod, // "card", "netbanking", "upi"
      paymentStatus: "completed", // Set to "completed" after successful payment
      user: currentUser._id,
    };

    // Send to backend
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(orderPayload),
    });

    const { item: order } = await response.json();
    console.log('Order created:', order);
    
    // Order now contains Shiprocket shipment details:
    console.log('Shipment ID:', order.shipmentId);
    console.log('Shipment Details:', order.shipmentDetail);
    
    return order;
  } catch (error) {
    console.error('Order creation failed:', error);
    throw error;
  }
};
```

## Required Fields Checklist

### Minimum Required Fields
- ✅ `items` - Array of items with name, qty, price
- ✅ `shippingInfo` - Customer shipping address with pincode
- ✅ `subTotal` - Total order amount
- ✅ `paymentMethod` - "card", "netbanking", or "upi"
- ✅ `paymentStatus` - "completed" (to trigger Shiprocket)

### Optional But Recommended
- 📌 `discount` - Total discount amount
- 📌 `dimension` - Package dimensions for accurate shipping
- 📌 `user` - User ID (auto-set if authenticated)

### Should NOT Include
- ❌ `orderId` - Set by Shiprocket
- ❌ `shipmentId` - Set by Shiprocket
- ❌ `shipmentDetail` - Set by Shiprocket
- ❌ `order_date` - Auto-generated if missing

## Address Selection Example

```javascript
// When user selects saved address from profile
const handleSelectAddress = (selectedAddress) => {
  const shippingInfo = {
    firstName: selectedAddress.name.split(' ')[0],
    lastName: selectedAddress.name.split(' ').slice(1).join(' '),
    email: userEmail,
    phone: selectedAddress.mobile,
    address: selectedAddress.address,
    city: "Default City", // Extract or ask user
    state: "State Code", // Extract or ask user
    country: "India",
    pincode: selectedAddress.pincode,
  };
  
  setFormData(prev => ({
    ...prev,
    shippingInfo,
  }));
};
```

## Dimension Calculation Example

```javascript
// Calculate dimensions based on items
const calculateDimensions = (items) => {
  let totalWeight = 0;
  let maxLength = 0;
  let maxBreadth = 0;
  let maxHeight = 0;

  items.forEach(item => {
    const itemDims = item.product?.dimensions || {
      length: 5,
      breadth: 5,
      height: 5,
      weight: 0.25,
    };
    
    totalWeight += itemDims.weight * item.quantity;
    maxLength = Math.max(maxLength, itemDims.length);
    maxBreadth = Math.max(maxBreadth, itemDims.breadth);
    maxHeight = Math.max(maxHeight, itemDims.height);
  });

  return {
    length: maxLength || 10,
    breadth: maxBreadth || 10,
    height: maxHeight || 5,
    weight: totalWeight || 0.5,
  };
};
```

## Payment Integration Example

```javascript
// After successful Razorpay/payment gateway transaction
const handlePaymentSuccess = async (paymentDetails) => {
  const orderPayload = {
    items: cart.items.map(item => ({
      name: item.name,
      qty: item.quantity,
      price: item.salePrice,
      discount: 0,
      tax: 0,
      product: item._id,
    })),
    shippingInfo: formData.shippingInfo,
    subTotal: calculateTotal(),
    discount: formData.discountApplied || 0,
    dimension: calculateDimensions(cart.items),
    paymentMethod: paymentDetails.method,
    paymentStatus: "completed", // ✅ Important: Set to completed
    paymentIntentId: paymentDetails.transactionId,
    user: currentUser._id,
  };

  const response = await createOrder(orderPayload);
  
  // Navigate to order confirmation
  navigate(`/order-confirmation/${response._id}`, {
    state: { order: response },
  });
};
```

## Form Structure Example

```jsx
import React, { useState } from 'react';

const CheckoutForm = ({ user, cart }) => {
  const [formData, setFormData] = useState({
    shippingInfo: {
      firstName: '',
      lastName: '',
      email: user?.email || '',
      phone: '',
      address: '',
      city: '',
      state: '',
      country: 'India',
      pincode: '',
    },
    paymentMethod: 'card',
    dimension: {
      length: 10,
      breadth: 10,
      height: 5,
      weight: 0.5,
    },
  });

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      shippingInfo: {
        ...prev.shippingInfo,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare order payload
    const orderPayload = {
      items: cart.items.map(item => ({
        name: item.name,
        qty: item.quantity,
        price: item.salePrice,
        discount: 0,
        tax: 0,
        product: item._id,
      })),
      shippingInfo: formData.shippingInfo,
      subTotal: cart.total,
      discount: 0,
      dimension: formData.dimension,
      paymentMethod: formData.paymentMethod,
      paymentStatus: 'completed', // After payment success
      user: user._id,
    };

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(orderPayload),
      });

      const { item: order } = await response.json();
      console.log('Order created with Shiprocket shipment:', order.shipmentId);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Shipping Info Fields */}
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.shippingInfo.firstName}
        onChange={handleShippingChange}
        required
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.shippingInfo.lastName}
        onChange={handleShippingChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.shippingInfo.email}
        onChange={handleShippingChange}
        required
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone (10 digits)"
        value={formData.shippingInfo.phone}
        onChange={handleShippingChange}
        pattern="[0-9]{10}"
        required
      />
      <textarea
        name="address"
        placeholder="Full Address"
        value={formData.shippingInfo.address}
        onChange={handleShippingChange}
        required
      />
      <input
        type="text"
        name="city"
        placeholder="City"
        value={formData.shippingInfo.city}
        onChange={handleShippingChange}
        required
      />
      <input
        type="text"
        name="state"
        placeholder="State Code (e.g., GJ)"
        value={formData.shippingInfo.state}
        onChange={handleShippingChange}
        required
      />
      <input
        type="text"
        name="pincode"
        placeholder="Pincode (6 digits)"
        value={formData.shippingInfo.pincode}
        onChange={handleShippingChange}
        pattern="[0-9]{6}"
        required
      />

      <select
        name="paymentMethod"
        value={formData.paymentMethod}
        onChange={(e) => setFormData(prev => ({
          ...prev,
          paymentMethod: e.target.value,
        }))}
      >
        <option value="card">Credit/Debit Card</option>
        <option value="netbanking">Net Banking</option>
        <option value="upi">UPI</option>
      </select>

      <button type="submit">Create Order</button>
    </form>
  );
};

export default CheckoutForm;
```

## Tracking Order Status

```javascript
// Track order after creation
const trackOrder = async (orderId, email) => {
  const response = await fetch('/api/orders/track', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      orderId,
      email,
    }),
  });

  const { order, trackingInfo } = await response.json();
  
  console.log('Order Status:', order.status); // "pending", "paid", "processing", "shipped", etc.
  console.log('Shipment ID:', order.shipmentId);
  console.log('Tracking Number:', order.trackingNumber);
  console.log('Tracking Info:', trackingInfo); // Shiprocket tracking data
};
```

## Common Errors & Solutions

### Error: "Invalid pincode"
```javascript
// Make sure pincode is exactly 6 digits
const validatePincode = (pincode) => {
  return /^[0-9]{6}$/.test(pincode);
};
```

### Error: "Invalid mobile number"
```javascript
// Phone must be exactly 10 digits
const validatePhone = (phone) => {
  return /^[0-9]{10}$/.test(phone);
};
```

### Order created but shipment not generated
```javascript
// Make sure paymentStatus is "completed"
const orderPayload = {
  // ... other fields
  paymentStatus: 'completed', // ✅ This is critical
};
```

## Best Practices

1. **Validate all inputs** before sending to backend
2. **Include pincode** in proper 6-digit format
3. **Set paymentStatus to "completed"** only after successful payment
4. **Use saved addresses** when possible to reduce errors
5. **Display shipment info** to user once order is created
6. **Show tracking number** from `order.shipmentId`
7. **Verify email** matches before tracking

## API Response Structure

```javascript
// Successful order creation response
{
  "item": {
    "_id": "696a187f68bdfbc1ae6dbb5c",
    "user": "695dfea3b884ea1e25d81346",
    "items": [...],
    "shippingInfo": {...},
    "subTotal": 500,
    "discount": 0,
    "dimension": {...},
    "status": "processing",
    "paymentStatus": "completed",
    "paymentMethod": "card",
    "orderId": 1137362655,          // Shiprocket order ID
    "shipmentId": 1133719741,       // Shiprocket shipment ID
    "order_date": "2026-01-16 16:22",
    "shipmentDetail": {
      "order_created": 1,
      "awb_generated": 0,
      "label_generated": 0,
      "shipment_id": 1133719741,
      ...
    },
    "createdAt": "2026-01-16T10:52:47.321Z",
    "updatedAt": "2026-01-16T10:52:47.321Z"
  }
}
```
