# Shiprocket Order Format Implementation

## Overview
Orders are now stored with a comprehensive structure that supports Shiprocket integration. The new format includes shipping information, dimensions, and shipment tracking data.

## Order Data Structure

### Example Order Document
```json
{
  "_id": "696a187f68bdfbc1ae6dbb5c",
  "pickup_location": "696a185a68bdfbc1ae6dbb56",
  "items": [
    {
      "name": "product 1",
      "qty": 1,
      "price": 200,
      "discount": 0
    },
    {
      "name": "product 2",
      "qty": 3,
      "price": 150,
      "discount": 2,
      "tax": 0
    }
  ],
  "shippingInfo": {
    "firstName": "sujal",
    "lastName": "prajapat",
    "email": "sujal.kalathiyainfotech@gmail.com",
    "phone": "1234567890",
    "address": "123 Electronics Street",
    "city": "Tech City",
    "state": "TC",
    "country": "India",
    "pincode": "395010"
  },
  "subTotal": 500,
  "discount": 2,
  "dimension": {
    "length": 5,
    "breadth": 10,
    "height": 20,
    "weight": 2.5
  },
  "status": "processing",
  "paymentStatus": "completed",
  "paymentMethod": "card",
  "order_date": "2026-01-16 16:22",
  "orderId": 1137362655,
  "shipmentId": 1133719741,
  "shipmentDetail": {
    "pickup_location_added": 0,
    "order_created": 1,
    "awb_generated": 0,
    "label_generated": 0,
    "pickup_generated": 0,
    "manifest_generated": 0,
    "pickup_scheduled_date": null,
    "pickup_booked_date": null,
    "order_id": 1137362655,
    "shipment_id": 1133719741,
    "awb_code": "",
    "courier_company_id": "",
    "courier_name": "",
    "assigned_date_time": "",
    "applied_weight": 2.5,
    "cod": 0,
    "label_url": null,
    "manifest_url": null,
    "awb_assign_error": "Invalid Pincode: 123456",
    "order_shipment_id": 1133719741,
    "channel_order_id": "696a187f68bdfbc1ae6dbb5c"
  },
  "returnOrderDetail": {
    "order_id": 1138971713,
    "channel_order_id": "RET-696a187f68bdfbc1ae6dbb5c",
    "shipment_id": 1135328548,
    "status": "RETURN PENDING",
    "status_code": 21,
    "company_name": "sujal prajapat",
    "is_qc_check": 0
  },
  "returnShipmentId": 1135328548,
  "createdAt": "2026-01-16T10:52:47.321Z",
  "updatedAt": "2026-01-19T06:20:13.156Z",
  "__v": 0
}
```

## Creating an Order

### POST /api/orders

**Request Body:**
```json
{
  "user": "user_id",
  "items": [
    {
      "name": "product name",
      "qty": 1,
      "price": 200,
      "discount": 0
    }
  ],
  "shippingInfo": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "address": "123 Main Street",
    "city": "New York",
    "state": "NY",
    "country": "India",
    "pincode": "400001"
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

## Key Fields

### Order Items
- `name` (String): Product name
- `qty` (Number): Quantity
- `price` (Number): Price per unit
- `discount` (Number): Discount amount
- `tax` (Number): Tax amount
- `product` (ObjectId): Reference to Product model

### Shipping Info
- `firstName`, `lastName`: Customer name
- `email`: Customer email
- `phone`: Customer phone number
- `address`: Delivery address
- `city`: City name
- `state`: State code
- `country`: Country name
- `pincode`: 6-digit postal code

### Dimensions
- `length`: Length in cm
- `breadth`: Width in cm
- `height`: Height in cm
- `weight`: Weight in kg

### Shipment Detail (Auto-populated by Shiprocket)
Contains all shipment tracking information from Shiprocket API:
- `shipment_id`: Shiprocket shipment ID
- `awb_code`: Air Way Bill code
- `label_url`: Shipping label URL
- `courier_name`: Courier company name
- `status`: Shipment status

### Return Order Detail (Optional)
Used when return is initiated:
- `status`: Return status ("RETURN PENDING", "IN TRANSIT", etc.)
- `status_code`: Status code
- `shipment_id`: Return shipment ID

## Address Model

Addresses are stored separately with the following format:

```json
{
  "_id": "696f09df41ffa454a2a1e983",
  "user": "695dfea3b884ea1e25d81346",
  "type": "Home",
  "name": "xxx",
  "mobile": "8160503291",
  "address": "A-1101 Milanio",
  "pincode": "395006",
  "isDefault": false,
  "createdAt": "2026-01-20T04:51:43.845Z",
  "updatedAt": "2026-01-20T04:51:43.845Z",
  "__v": 0
}
```

### Address Fields
- `user`: User ID reference
- `type`: "Home", "Office", or "Other"
- `name`: Address label/name
- `mobile`: 10-digit mobile number
- `address`: Full address
- `pincode`: 6-digit postal code
- `isDefault`: Boolean flag for default address

## API Endpoints

### Create Order
```
POST /api/orders
```
Creates new order with automatic Shiprocket integration if payment is completed.

### Get Orders
```
GET /api/orders
GET /api/orders?userId=user_id&status=processing&page=1&limit=20
```
List orders with filtering and pagination.

### Get User Orders
```
GET /api/orders/user/:userId
```
Get all orders for a specific user.

### Update Order Status
```
PUT /api/orders/:orderId
Body: { "status": "shipped" }
```
Update order status. If status is "shipped" and no shipment exists, automatically creates Shiprocket shipment.

### Track Order
```
POST /api/orders/track
Body: { "orderId": "order_id", "email": "user@email.com" }
```
Get order tracking information including Shiprocket shipment details.

## Shiprocket Integration

### Automatic Shipment Creation
When an order is created with `paymentStatus: "completed"`, the system automatically:
1. Calls Shiprocket API to create a shipment
2. Stores shipment details in `shipmentDetail` field
3. Stores shipment ID in `shipmentId` field

### Shipment Status Tracking
- `order_created`: 1 = order successfully sent to Shiprocket
- `awb_generated`: 1 = airway bill generated
- `label_generated`: 1 = shipping label generated
- `pickup_generated`: 1 = pickup scheduled

### Error Handling
If Shiprocket returns an error (e.g., invalid pincode), it's stored in `awb_assign_error` field but doesn't block order creation.

## Environment Variables

Ensure these are set in `.env`:
```
SHIPROCKET_URL=https://apiv2.shiprocket.in/v1/external
SHIPROCKET_EMAIL=your_email@example.com
SHIPROCKET_PASSWORD=your_password
SHIPROCKET_PICKUP=Primary
```

## Migration Notes

### Legacy Field Support
For backward compatibility, these legacy fields are still supported:
- `customerName` (use `shippingInfo.firstName`)
- `customerEmail` (use `shippingInfo.email`)
- `customerPhone` (use `shippingInfo.phone`)
- `address` (use `shippingInfo.address`)
- `total` (use `subTotal`)
- `trackingNumber` (mapped to `shipmentId`)
- `trackingUrl`
- `shippingData`

### Updating Existing Orders
To migrate existing orders to new format, map fields as needed:
```javascript
// Old format → New format
{
  customerName → shippingInfo.firstName
  customerEmail → shippingInfo.email
  customerPhone → shippingInfo.phone
  address → shippingInfo.address
  total → subTotal
}
```

## Response Format

### Create Order Response
```json
{
  "item": {
    "_id": "696a187f68bdfbc1ae6dbb5c",
    "items": [...],
    "shippingInfo": {...},
    "subTotal": 500,
    "shipmentId": 1133719741,
    "shipmentDetail": {...},
    "status": "processing",
    "createdAt": "2026-01-16T10:52:47.321Z"
  }
}
```

### Track Order Response
```json
{
  "order": {
    "_id": "696a187f68bdfbc1ae6dbb5c",
    "orderNumber": "AE6DBB5C",
    "status": "processing",
    "statusLabel": "Processing",
    "currentStep": 2,
    "customerName": "sujal",
    "shippingInfo": {...},
    "shipmentDetail": {...},
    "trackingNumber": 1133719741
  },
  "trackingInfo": {
    "track_status": [...],
    "shipment_track_activities": [...]
  }
}
```

## Best Practices

1. **Always include shippingInfo** when creating orders - it's used for Shiprocket shipment creation
2. **Validate pincode format** - must be 6 digits for Shiprocket
3. **Set paymentStatus to "completed"** to enable automatic Shiprocket integration
4. **Include accurate dimensions** - affects shipping cost and packaging
5. **Store order_date** - helps with Shiprocket order reconciliation

## Troubleshooting

### Order created but shipment not generated
- Check if `paymentStatus` is "completed"
- Verify Shiprocket credentials are set in `.env`
- Check if pincode is valid (must be 6 digits)

### awb_assign_error showing in shipmentDetail
- Usually indicates invalid pincode
- Verify pincode in shippingInfo is valid
- Try updating the order once the issue is resolved

### Missing Shiprocket data
- Ensure Shiprocket service is properly initialized
- Check API credentials and token generation
- Review server logs for Shiprocket API errors
