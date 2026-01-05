import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiCheckCircle, FiCircle } from "react-icons/fi";

function TrackOrder() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const trackingSteps = [
    { step: "Order Confirmed", date: "2024-01-01", time: "10:30 AM", completed: true },
    { step: "Processing", date: "2024-01-01", time: "2:15 PM", completed: true },
    { step: "Shipped", date: "2024-01-02", time: "8:00 AM", completed: true },
    { step: "Out for Delivery", date: "2024-01-02", time: "3:45 PM", completed: true },
    { step: "Delivered", date: "2024-01-02", time: "5:30 PM", completed: true },
  ];

  const orderDetails = {
    orderId: orderId,
    customer: "John Doe",
    email: "john@example.com",
    phone: "+1-234-567-8900",
    amount: "$150.00",
    items: [
      { name: "Wireless Headphones", quantity: 1, price: "$89.99" },
      { name: "Phone Case", quantity: 2, price: "$19.99 each" },
    ],
    shippingAddress: "123 Main Street, New York, NY 10001",
    trackingNumber: "TRK-2024-001234567",
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <button
          className="x_btn x_btn-secondary"
          onClick={() => navigate("/orders")}
          title="Back to Orders"
        >
          <FiArrowLeft size={16} /> Back
        </button>
        <h1 style={{ fontSize: "24px", fontWeight: 700, margin: "0 0 0 15px" }}>
          Order Tracking - {orderId}
        </h1>
      </div>

      <div className="x_grid x_grid-2" style={{ gap: "20px" }}>
        {/* Tracking Timeline */}
        <div className="x_card">
          <div className="x_card-header">
            <h2>Tracking Timeline</h2>
          </div>
          <div className="x_card-body" style={{ padding: "20px" }}>
            <div style={{ position: "relative" }}>
              {trackingSteps.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    marginBottom: index < trackingSteps.length - 1 ? "30px" : "0",
                    position: "relative",
                  }}
                >
                  {/* Timeline Line */}
                  {index < trackingSteps.length - 1 && (
                    <div
                      style={{
                        position: "absolute",
                        left: "20px",
                        top: "40px",
                        bottom: "-30px",
                        width: "2px",
                        backgroundColor: item.completed ? "#27ae60" : "#ecf0f1",
                      }}
                    />
                  )}

                  {/* Timeline Dot */}
                  <div style={{ marginRight: "20px", position: "relative", zIndex: 1 }}>
                    {item.completed ? (
                      <FiCheckCircle size={40} style={{ color: "#27ae60" }} />
                    ) : (
                      <FiCircle size={40} style={{ color: "#bdc3c7" }} />
                    )}
                  </div>

                  {/* Timeline Content */}
                  <div style={{ flex: 1, paddingTop: "5px" }}>
                    <h3 style={{ margin: "0 0 5px 0", fontSize: "16px", fontWeight: 600 }}>
                      {item.step}
                    </h3>
                    <p style={{ margin: "0 0 3px 0", fontSize: "13px", color: "#7f8c8d" }}>
                      {item.date}
                    </p>
                    <p style={{ margin: 0, fontSize: "13px", color: "#95a5a6" }}>
                      {item.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Tracking Number */}
          <div className="x_card">
            <div className="x_card-header">
              <h2>Tracking Information</h2>
            </div>
            <div className="x_card-body" style={{ padding: "20px" }}>
              <div className="x_form-group">
                <label className="x_form-label">Tracking Number</label>
                <div
                  style={{
                    padding: "10px 12px",
                    backgroundColor: "#f8f9fa",
                    border: "1px solid #ecf0f1",
                    borderRadius: "4px",
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                >
                  {orderDetails.trackingNumber}
                </div>
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="x_card">
            <div className="x_card-header">
              <h2>Customer Information</h2>
            </div>
            <div className="x_card-body" style={{ padding: "20px" }}>
              <p style={{ margin: "0 0 10px 0" }}>
                <strong>Name:</strong> {orderDetails.customer}
              </p>
              <p style={{ margin: "0 0 10px 0" }}>
                <strong>Email:</strong> {orderDetails.email}
              </p>
              <p style={{ margin: 0 }}>
                <strong>Phone:</strong> {orderDetails.phone}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Items & Shipping */}
      <div className="x_grid x_grid-2" style={{ marginTop: "20px" }}>
        {/* Order Items */}
        <div className="x_card">
          <div className="x_card-header">
            <h2>Order Items</h2>
          </div>
          <div className="x_card-body">
            <div className="x_table-wrapper">
              <table className="x_table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetails.items.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ marginTop: "15px", paddingTop: "15px", borderTop: "1px solid #ecf0f1" }}>
              <p style={{ margin: "0 0 5px 0", fontSize: "14px" }}>
                <strong>Total Amount:</strong> {orderDetails.amount}
              </p>
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="x_card">
          <div className="x_card-header">
            <h2>Shipping Address</h2>
          </div>
          <div className="x_card-body" style={{ padding: "20px" }}>
            <p style={{ margin: 0, fontSize: "14px", lineHeight: "1.6" }}>
              {orderDetails.shippingAddress}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrackOrder;
