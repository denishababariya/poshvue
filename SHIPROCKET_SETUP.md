# Shiprocket Integration Setup

## Backend Environment Variables

Add the following environment variables to your `backend/.env` file:

```env
SHIPROCKET_URL=https://apiv2.shiprocket.in/v1/external
SHIPROCKET_EMAIL=sujal.kalathiyainfotech123@gmail.com
SHIPROCKET_PASSWORD=NaJn0Rc44xjfopm9Qd8AgR&u*T@TQksg
SHIPROCKET_PICKUP=Primary
```

## Notes

- The Shiprocket integration will automatically create shipments when orders are placed
- Tracking numbers will be stored in the order model
- Order status will be synchronized with Shiprocket status
- Make sure your Stripe payment gateway is configured for payment processing

## Testing

1. Place an order through the checkout flow
2. Complete payment (Card/NetBanking/UPI)
3. Check backend logs for Shiprocket shipment creation
4. Verify tracking number is generated in the order
