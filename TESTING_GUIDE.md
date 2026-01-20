# Testing Guide - Shiprocket Order Integration

## Quick Test Commands

### 1. Create Test Address

```bash
curl -X POST http://localhost:5000/api/addresses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "user": "695dfea3b884ea1e25d81346",
    "type": "Home",
    "name": "Test Address",
    "mobile": "8160503291",
    "address": "A-1101 Milanio, Street Name",
    "pincode": "395006",
    "isDefault": true
  }'
```

### 2. Create Test Order

```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "user": "695dfea3b884ea1e25d81346",
    "items": [
      {
        "name": "Test Product 1",
        "qty": 1,
        "price": 200,
        "discount": 0,
        "tax": 0,
        "product": "PRODUCT_ID_1"
      },
      {
        "name": "Test Product 2",
        "qty": 2,
        "price": 150,
        "discount": 10,
        "tax": 0,
        "product": "PRODUCT_ID_2"
      }
    ],
    "shippingInfo": {
      "firstName": "Sujal",
      "lastName": "Prajapat",
      "email": "sujal@example.com",
      "phone": "1234567890",
      "address": "123 Electronics Street",
      "city": "Tech City",
      "state": "GJ",
      "country": "India",
      "pincode": "395010"
    },
    "subTotal": 500,
    "discount": 10,
    "dimension": {
      "length": 10,
      "breadth": 10,
      "height": 5,
      "weight": 2.5
    },
    "paymentMethod": "card",
    "paymentStatus": "completed"
  }'
```

### 3. Track Order

```bash
curl -X POST http://localhost:5000/api/orders/track \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "ORDER_ID_FROM_CREATE_RESPONSE",
    "email": "sujal@example.com"
  }'
```

### 4. Get All Orders for User

```bash
curl -X GET http://localhost:5000/api/orders/user/695dfea3b884ea1e25d81346 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 5. Get Orders with Filters (Admin)

```bash
curl -X GET "http://localhost:5000/api/orders?userId=695dfea3b884ea1e25d81346&status=processing&page=1&limit=20" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 6. Update Order Status

```bash
curl -X PUT http://localhost:5000/api/orders/ORDER_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "status": "shipped"
  }'
```

## Using Postman

### 1. Setup Environment Variables
```
@base_url = http://localhost:5000
@token = YOUR_JWT_TOKEN
@user_id = 695dfea3b884ea1e25d81346
@order_id = (copy from create response)
```

### 2. Create Order Request
```
POST {{@base_url}}/api/orders
Headers:
  - Authorization: Bearer {{@token}}
  - Content-Type: application/json

Body (JSON):
{
  "user": "{{@user_id}}",
  "items": [
    {
      "name": "Test Product",
      "qty": 1,
      "price": 200,
      "discount": 0,
      "tax": 0
    }
  ],
  "shippingInfo": {
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "phone": "1234567890",
    "address": "123 Test Street",
    "city": "Test City",
    "state": "GJ",
    "country": "India",
    "pincode": "395006"
  },
  "subTotal": 200,
  "discount": 0,
  "dimension": {
    "length": 10,
    "breadth": 10,
    "height": 5,
    "weight": 0.5
  },
  "paymentMethod": "card",
  "paymentStatus": "completed"
}
```

## JavaScript/Node Testing

### Test Script
```javascript
const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';
const TOKEN = 'YOUR_JWT_TOKEN';

async function testShiprocketIntegration() {
  try {
    // Create order
    console.log('Creating order...');
    const orderResponse = await axios.post(
      `${BASE_URL}/orders`,
      {
        user: '695dfea3b884ea1e25d81346',
        items: [
          {
            name: 'Test Product',
            qty: 1,
            price: 200,
            discount: 0,
            tax: 0,
          },
        ],
        shippingInfo: {
          firstName: 'Test',
          lastName: 'User',
          email: 'test@example.com',
          phone: '1234567890',
          address: '123 Test Street',
          city: 'Test City',
          state: 'GJ',
          country: 'India',
          pincode: '395006',
        },
        subTotal: 200,
        discount: 0,
        dimension: {
          length: 10,
          breadth: 10,
          height: 5,
          weight: 0.5,
        },
        paymentMethod: 'card',
        paymentStatus: 'completed',
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );

    const order = orderResponse.data.item;
    console.log('✅ Order created:', order._id);
    console.log('✅ Shipment ID:', order.shipmentId);
    console.log('✅ Order ID (Shiprocket):', order.orderId);
    console.log('Shipment Detail:', JSON.stringify(order.shipmentDetail, null, 2));

    // Track order
    console.log('\nTracking order...');
    const trackResponse = await axios.post(
      `${BASE_URL}/orders/track`,
      {
        orderId: order._id.toString(),
        email: 'test@example.com',
      }
    );

    const trackingData = trackResponse.data;
    console.log('✅ Order tracked successfully');
    console.log('Status:', trackingData.order.status);
    console.log('Tracking Number:', trackingData.order.trackingNumber);
    console.log('Tracking Info:', JSON.stringify(trackingData.trackingInfo, null, 2));

  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

// Run test
testShiprocketIntegration();
```

## Expected Response Format

### Successful Order Creation
```json
{
  "item": {
    "_id": "696a187f68bdfbc1ae6dbb5c",
    "user": "695dfea3b884ea1e25d81346",
    "items": [
      {
        "name": "Test Product",
        "qty": 1,
        "price": 200,
        "discount": 0,
        "tax": 0,
        "_id": "ID"
      }
    ],
    "shippingInfo": {
      "firstName": "Test",
      "lastName": "User",
      "email": "test@example.com",
      "phone": "1234567890",
      "address": "123 Test Street",
      "city": "Test City",
      "state": "GJ",
      "country": "India",
      "pincode": "395006"
    },
    "subTotal": 200,
    "discount": 0,
    "dimension": {
      "length": 10,
      "breadth": 10,
      "height": 5,
      "weight": 0.5
    },
    "status": "processing",
    "paymentMethod": "card",
    "paymentStatus": "completed",
    "orderId": 1137362655,
    "shipmentId": 1133719741,
    "order_date": "2026-01-20 10:30:45",
    "shipmentDetail": {
      "pickup_location_added": 0,
      "order_created": 1,
      "awb_generated": 0,
      "label_generated": 0,
      "shipment_id": 1133719741,
      "order_id": 1137362655,
      "channel_order_id": "696a187f68bdfbc1ae6dbb5c",
      "courier_name": "Delhivery",
      "label_url": null,
      "awb_code": "",
      "awb_assign_error": ""
    },
    "createdAt": "2026-01-20T10:30:45.000Z",
    "updatedAt": "2026-01-20T10:30:45.000Z",
    "__v": 0
  }
}
```

## Testing Scenarios

### Scenario 1: Valid Order with Shiprocket
**Input**: Valid pincode, complete shipping info, payment completed
**Expected**: Order created, shipment generated, shipmentId populated

### Scenario 2: Invalid Pincode
**Input**: Invalid pincode (5 digits, non-existent code)
**Expected**: Order created, `awb_assign_error` populated with error message

### Scenario 3: Payment Not Completed
**Input**: paymentStatus = "pending"
**Expected**: Order created, no shipment generated, shipmentId null

### Scenario 4: Missing Required Fields
**Input**: Missing shippingInfo.pincode
**Expected**: 400 error with validation message

### Scenario 5: Update Status to Shipped
**Input**: Order with pending shipment, update status to "shipped"
**Expected**: If no shipment exists, creates shipment automatically

## Debugging Checklist

- ✅ Check `.env` has Shiprocket credentials
- ✅ Verify MongoDB connection is active
- ✅ Check pincode is exactly 6 digits
- ✅ Verify phone is exactly 10 digits
- ✅ Confirm paymentStatus is "completed" for automatic shipment
- ✅ Check server logs for Shiprocket API errors
- ✅ Verify JWT token is valid
- ✅ Check user ID exists in database
- ✅ Validate product IDs are correct

## Common Issues and Solutions

### Issue: "Order created but shipmentId is null"
**Solution**:
1. Check paymentStatus is "completed"
2. Verify Shiprocket credentials in .env
3. Check pincode is 6 digits
4. Review server logs for Shiprocket errors

### Issue: "Invalid Pincode error from Shiprocket"
**Solution**:
1. Verify pincode exists in India
2. Check pincode format (must be 6 digits)
3. Confirm city/state match the pincode

### Issue: "Authentication failed with Shiprocket"
**Solution**:
1. Verify email and password in .env
2. Check if Shiprocket account is active
3. Confirm credentials don't have special characters

### Issue: "MongoDB connection error"
**Solution**:
1. Check if MongoDB service is running
2. Verify connection string in .env
3. Check database credentials

## Performance Testing

### Load test (100 concurrent orders):
```bash
ab -n 100 -c 10 -T 'application/json' \
  -H 'Authorization: Bearer TOKEN' \
  -p order.json \
  http://localhost:5000/api/orders
```

### Response time check:
```javascript
const start = Date.now();
// make request
const duration = Date.now() - start;
console.log(`Request took ${duration}ms`);
```

## Database Verification

### Check order in MongoDB:
```javascript
use your_database
db.orders.findOne({_id: ObjectId("ORDER_ID")})
```

### Check address in MongoDB:
```javascript
db.addresses.findOne({user: ObjectId("USER_ID")})
```

### Check shipment details:
```javascript
db.orders.findOne(
  {shipmentId: {$exists: true}},
  {shipmentDetail: 1, shipmentId: 1, orderId: 1}
)
```

## Next Steps After Testing

1. ✅ Verify order creation with Shiprocket
2. ✅ Test error scenarios (invalid pincode, etc.)
3. ✅ Verify shipment tracking
4. ✅ Test return order creation
5. ✅ Update frontend with new format
6. ✅ Update admin dashboard
7. ✅ Load test with production data volume
8. ✅ Monitor Shiprocket API usage
