import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, ListGroup } from 'react-bootstrap';
import { 
  FaSearch, 
  FaBox, 
  FaCheckCircle, 
  FaTruckLoading, 
  FaMapMarkerAlt, 
  FaHandSparkles 
} from 'react-icons/fa';

const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [showStatus, setShowStatus] = useState(false);

  // Mock data for the bridal order journey
  const orderSteps = [
    { status: 'Order Placed', date: 'Oct 12, 2023', icon: <FaCheckCircle />, completed: true },
    { status: 'Tailoring & Quality Check', date: 'Oct 15, 2023', icon: <FaHandSparkles />, completed: true },
    { status: 'Shipped', date: 'Oct 18, 2023', icon: <FaTruckLoading />, completed: true },
    { status: 'Out for Delivery', date: 'Pending', icon: <FaBox />, completed: false },
    { status: 'Delivered', date: 'Expected Oct 20', icon: <FaMapMarkerAlt />, completed: false },
  ];

  const handleTrack = (e) => {
    e.preventDefault();
    if(orderId) setShowStatus(true);
  };

  return (
    <div className="d_track_wrapper py-5">
      <Container>
        {/* Header */}
        <Row className="justify-content-center text-center mb-md-4 mb-3">
          <Col md={7}>
            <h2 className="d_track_title mb-3">Track Your Masterpiece</h2>
            <p className="text-muted">Enter your order details to follow the journey of your wedding ensemble.</p>
          </Col>
        </Row>

        {/* Search Bar */}
        <Row className="justify-content-center mb-5">
          <Col md={6}>
            <Card className="d_search_card border-0 shadow-sm p-4 rounded-0">
              <Form onSubmit={handleTrack}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold text-uppercase">Order Number</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="e.g. #WED-99281" 
                    className="rounded-0 d_input_focus"
                    onChange={(e) => setOrderId(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label className="small fw-bold text-uppercase">Email Address</Form.Label>
                  <Form.Control 
                    type="email" 
                    placeholder="The email used during checkout" 
                    className="rounded-0 d_input_focus"
                    required
                  />
                </Form.Group>
                <Button type="submit" variant="dark" className="w-100 rounded-0 d_btn_track py-2">
                  <FaSearch className="me-2" /> Track Order
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>

        {/* Tracking Results (Conditional) */}
        {showStatus && (
          <Row className="justify-content-center">
            <Col lg={8}>
              <Card className="border-0 shadow-sm rounded-0 d_status_card">
                <Card.Header className="bg-white border-bottom-0 pt-4 px-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0 fw-bold">Order ID: {orderId}</h5>
                    <span className="badge bg-gold p-2" style={{backgroundColor: '#d4af37'}}>IN TRANSIT</span>
                  </div>
                </Card.Header>
                <Card.Body className="p-4">
                  
                  {/* Visual Stepper */}
                  <div className="d_stepper_container mt-4">
                    {orderSteps.map((step, index) => (
                      <div key={index} className={`d_step_item ${step.completed ? 'active' : ''}`}>
                        <div className="d_step_icon">
                          {step.icon}
                        </div>
                        <div className="d_step_content">
                          <h6 className="mb-0 fw-bold">{step.status}</h6>
                          <small className="text-muted">{step.date}</small>
                        </div>
                        {index !== orderSteps.length - 1 && <div className="d_step_line"></div>}
                      </div>
                    ))}
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
        .d_btn_track:hover {
          background-color: #d4af37;
          border-color: #d4af37;
        }

        /* Stepper Styling */
        .d_stepper_container {
          display: flex;
          flex-direction: column;
          gap: 20px;
          position: relative;
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
        .d_step_line {
          position: absolute;
          left: 19px;
          top: 40px;
          width: 2px;
          height: calc(100% - 20px);
          background: #eee;
          z-index: 1;
        }
        .d_step_item.active .d_step_line {
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