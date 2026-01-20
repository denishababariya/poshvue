import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { 
  FaSearch, 
  FaBox, 
  FaCheckCircle, 
  FaTruckLoading, 
  FaMapMarkerAlt, 
  FaHandSparkles,
  FaCreditCard,
  FaSpinner
} from 'react-icons/fa';
import { trackOrder } from '../api/client';
import Loader from './Loader';

const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState(null);

  // Status mapping for tracking steps
  const statusSteps = {
    pending: { step: 0, label: "Order Placed", icon: <FaCheckCircle />, completed: true },
    paid: { step: 1, label: "Payment Confirmed", icon: <FaCreditCard />, completed: true },
    processing: { step: 2, label: "Processing", icon: <FaHandSparkles />, completed: true },
    shipped: { step: 3, label: "Shipped", icon: <FaTruckLoading />, completed: true },
    out_for_delivery: { step: 4, label: "Out for Delivery", icon: <FaBox />, completed: true },
    delivered: { step: 5, label: "Delivered", icon: <FaMapMarkerAlt />, completed: true },
    cancelled: { step: -1, label: "Cancelled", icon: <FaCheckCircle />, completed: false },
  };

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!orderId.trim()) {
      setError("Please enter an Order ID");
      return;
    }

    setLoading(true);
    setError(null);
    setOrderData(null);

    try {
      const res = await trackOrder({
        orderId: orderId.trim(),
        email: email.trim() || undefined,
      });

      setOrderData(res.data);
    } catch (err) {
      console.error("Track order error:", err);
      setError(err.response?.data?.message || "Order not found. Please check your Order ID and Email.");
    } finally {
      setLoading(false);
    }
  };

  const currentStatus = orderData?.order ? statusSteps[orderData.order.status] : null;
  const allSteps = [
    statusSteps.pending,
    statusSteps.paid,
    statusSteps.processing,
    statusSteps.shipped,
    statusSteps.out_for_delivery,
    statusSteps.delivered,
  ];

  return (
    <div className="d_track_wrapper py-5">
      <Container>
        {/* Header */}
        <Row className="justify-content-center text-center mb-md-4 mb-3">
          <Col md={7}>
            <h2 className="d_track_title mb-3">Track Your Order</h2>
            <p className="text-muted">Enter your order details to track the status of your order.</p>
          </Col>
        </Row>

        {/* Search Bar */}
        <Row className="justify-content-center mb-5">
          <Col md={6}>
            <Card className="d_search_card border-0 shadow-sm p-4 rounded-0">
              <Form onSubmit={handleTrack}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold text-uppercase">Order ID / Order Number</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="e.g. #ABC12345 or full order ID" 
                    className="rounded-0 d_input_focus"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label className="small fw-bold text-uppercase">Email Address (Optional)</Form.Label>
                  <Form.Control 
                    type="email" 
                    placeholder="The email used during checkout" 
                    className="rounded-0 d_input_focus"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Form.Text className="text-muted">
                    Enter email to verify order ownership
                  </Form.Text>
                </Form.Group>
                <Button 
                  type="submit" 
                  variant="dark" 
                  className="w-100 rounded-0 d_btn_track py-2"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <FaSpinner className="me-2 spin" /> Tracking...
                    </>
                  ) : (
                    <>
                      <FaSearch className="me-2" /> Track Order
                    </>
                  )}
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>

        {/* Error Message */}
        {error && (
          <Row className="justify-content-center mb-4">
            <Col md={6}>
              <Alert variant="danger" className="rounded-0">
                {error}
              </Alert>
            </Col>
          </Row>
        )}

        {/* Tracking Results */}
        {orderData && orderData.order && (
          <Row className="justify-content-center">
            <Col lg={8}>
              <Card className="border-0 shadow-sm rounded-0 d_status_card">
                <Card.Header className="bg-white border-bottom-0 pt-4 px-4">
                  <div className="d-flex justify-content-between align-items-center flex-wrap">
                    <div>
                      <h5 className="mb-0 fw-bold">Order #{orderData.order.orderNumber}</h5>
                      <small className="text-muted">
                        Placed on {new Date(orderData.order.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </small>
                    </div>
                    <span 
                      className={`badge p-2 mt-2 ${orderData.order.status === 'delivered' ? 'bg-success' : 
                                                      orderData.order.status === 'cancelled' ? 'bg-danger' : 
                                                      'bg-warning'}`}
                    >
                      {orderData.order.statusLabel || orderData.order.status.toUpperCase()}
                    </span>
                  </div>
                </Card.Header>
                <Card.Body className="p-4">
                  {/* Order Details */}
                  <div className="mb-4">
                    <h6 className="fw-bold mb-3">Order Details</h6>
                    <Row>
                      <Col md={6} className="mb-2">
                        <strong>Customer:</strong> {orderData.order.customerName}
                      </Col>
                      <Col md={6} className="mb-2">
                        <strong>Email:</strong> {orderData.order.customerEmail}
                      </Col>
                      <Col md={6} className="mb-2">
                        <strong>Phone:</strong> {orderData.order.customerPhone}
                      </Col>
                      <Col md={6} className="mb-2">
                        <strong>Payment Method:</strong> {orderData.order.paymentMethod?.toUpperCase() || 'N/A'}
                      </Col>
                      <Col md={12} className="mb-2">
                        <strong>Delivery Address:</strong> {orderData.order.address || 'N/A'}
                      </Col>
                      {orderData.order.trackingNumber && (
                        <Col md={6} className="mb-2">
                          <strong>Tracking Number:</strong> {orderData.order.trackingNumber}
                        </Col>
                      )}
                      {orderData.order.trackingUrl && (
                        <Col md={6} className="mb-2">
                          <strong>Tracking URL:</strong>{' '}
                          <a href={orderData.order.trackingUrl} target="_blank" rel="noopener noreferrer">
                            View Tracking
                          </a>
                        </Col>
                      )}
                    </Row>
                  </div>

                  {/* Order Items */}
                  <div className="mb-4">
                    <h6 className="fw-bold mb-3">Order Items</h6>
                    <table className="table table-sm">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Quantity</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderData.order.items?.map((item, index) => (
                          <tr key={index}>
                            <td>{item.title}</td>
                            <td>{item.quantity}</td>
                            <td>₹{item.price}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan="2" className="text-end fw-bold">Total:</td>
                          <td className="fw-bold">₹{orderData.order.total}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>

                  {/* Visual Stepper */}
                  <div className="d_stepper_container mt-4">
                    {allSteps.map((step, index) => {
                      const isCompleted = currentStatus && step.step <= currentStatus.step;
                      const isCurrent = currentStatus && step.step === currentStatus.step;
                      
                      return (
                        <div 
                          key={index} 
                          className={`d_step_item ${isCompleted ? 'active' : ''} ${isCurrent ? 'current' : ''}`}
                        >
                          <div className="d_step_icon">
                            {step.icon}
                          </div>
                          <div className="d_step_content">
                            <h6 className="mb-0 fw-bold">{step.label}</h6>
                            {isCurrent && (
                              <small className="text-success">Current Status</small>
                            )}
                          </div>
                          {index !== allSteps.length - 1 && <div className={`d_step_line ${isCompleted ? 'active' : ''}`} />}
                        </div>
                      );
                    })}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>

      <style>{`
        .d_track_wrapper {
          background-color: #fcfaf8;
        }
        .d_track_title {
          font-weight: 700;
          color: #2c2c2c;
        }
        .d_input_focus:focus {
          border-color: #d4af37;
          box-shadow: none;
        }
        .d_btn_track {
          background-color: #2c2c2c;
          letter-spacing: 1px;
          transition: 0.3s;
        }
        .d_btn_track:hover:not(:disabled) {
          background-color: #d4af37;
          border-color: #d4af37;
        }
        .d_btn_track:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Stepper Styling */
        .d_stepper_container {
          display: flex;
          flex-direction: column;
          gap: 20px;
          position: relative;
          margin-top: 30px;
        }
        .d_step_item {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          position: relative;
        }
        .d_step_icon {
          width: 40px;
          height: 40px;
          background: #eee;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
          color: #999;
          transition: 0.3s;
        }
        .d_step_item.active .d_step_icon {
          background: #d4af37;
          color: white;
        }
        .d_step_item.current .d_step_icon {
          background: #28a745;
          color: white;
          box-shadow: 0 0 0 4px rgba(40, 167, 69, 0.2);
        }
        .d_step_line {
          position: absolute;
          left: 19px;
          top: 40px;
          width: 2px;
          height: calc(100% + 20px);
          background: #eee;
          z-index: 1;
        }
        .d_step_line.active {
          background: #d4af37;
        }
        .d_step_content {
          padding-top: 5px;
        }

        @media (max-width: 768px) {
          .d_step_icon {
            width: 35px;
            height: 35px;
          }
          .d_step_line {
            left: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default TrackOrder;
