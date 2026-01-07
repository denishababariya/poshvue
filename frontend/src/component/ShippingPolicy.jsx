import React from 'react';
import { Container, Row, Col, Accordion } from 'react-bootstrap';
import { 
  FaTruck, 
  FaGlobeAmericas, 
  FaBoxOpen, 
  FaCalendarCheck, 
  FaExclamationCircle 
} from 'react-icons/fa';

const ShippingPolicy = () => {
  return (
    <div className="d_shipping_wrapper py-5 bg-light">
      <Container>
        {/* Header Section */}
        <Row className="justify-content-center mb-5 text-center">
          <Col md={8}>
            <h1 className="display-4 d_policy_title mb-3">Shipping & Delivery</h1>
            <p className="lead text-muted">
              Every piece of wedding wear is crafted with love. Here is how we get your dream outfit to your doorstep.
            </p>
            <hr className="d_accent_hr mx-auto" style={{ width: '60px', borderTop: '3px solid #d4af37' }} />
          </Col>
        </Row>

        {/* Quick Info Cards */}
        <Row className="g-4 mb-5">
          {[
            { icon: <FaCalendarCheck />, title: "Processing Time", text: "Ready-to-wear: 3-5 days. Custom Bridal: 6-8 weeks." },
            { icon: <FaTruck />, title: "Free Shipping", text: "Complimentary shipping on all bridal orders over $500." },
            { icon: <FaGlobeAmericas />, title: "Global Delivery", text: "We ship to over 50 countries with insured logistics." }
          ].map((item, index) => (
            <Col lg={4} key={index}>
              <div className="d_info_card p-4 h-100 text-center bg-white shadow-sm border-0 rounded-0">
                <div className="d_icon_circle mb-3 text-gold" style={{ fontSize: '2rem', color: '#d4af37' }}>
                  {item.icon}
                </div>
                <h5 className="fw-bold">{item.title}</h5>
                <p className="small text-muted mb-0">{item.text}</p>
              </div>
            </Col>
          ))}
        </Row>

        {/* Detailed Policy Sections */}
        <Row className="justify-content-center">
          <Col lg={10}>
            <Accordion defaultActiveKey="0" flush className="d_custom_accordion shadow-sm">
              <Accordion.Item eventKey="0">
                <Accordion.Header className="fw-bold">Domestic Shipping (Within Country)</Accordion.Header>
                <Accordion.Body>
                  <p>Standard delivery typically takes 5-7 business days. Express shipping is available at checkout for an additional fee. Please note that signature is required upon delivery for all bridal couture.</p>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1">
                <Accordion.Header className="fw-bold">International Shipping & Duties</Accordion.Header>
                <Accordion.Body>
                  <p>International orders are shipped via DHL or FedEx. Delivery timelines range from 10-15 business days. 
                  <strong> Note:</strong> Import duties and taxes are not included in the item price and are the responsibility of the customer.</p>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="2">
                <Accordion.Header className="fw-bold"><FaBoxOpen className="me-2"/> Order Tracking</Accordion.Header>
                <Accordion.Body>
                  Once your order is dispatched, you will receive a confirmation email with a tracking link. You can also track your order through our "Order Status" page using your Order ID.
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="3">
                <Accordion.Header className="fw-bold"><FaExclamationCircle className="me-2"/> Delayed or Damaged Shipments</Accordion.Header>
                <Accordion.Body>
                  While we strive for perfection, delays may occur during peak wedding seasons. If your package arrives damaged, please contact our Concierge Team within 24 hours of receipt with photographic evidence.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>

        {/* Footer Contact */}
        <div className="text-center mt-5">
          <p className="text-muted italic">Questions about your delivery?</p>
          <a href="mailto:support@weddingwear.com" className="btn btn-outline-dark px-4 rounded-0 d_btn_hover">
            Contact Concierge
          </a>
        </div>
      </Container>

      {/* Custom Styles */}
      <style>{`
        .d_shipping_wrapper {
          color: #333;
        }
        .d_policy_title {
          font-weight: 700;
          letter-spacing: 1px;
        }
        .d_info_card {
          transition: transform 0.3s ease;
          border-top: 4px solid #d4af37 !important;
        }
        .d_info_card:hover {
          transform: translateY(-5px);
        }
        .d_custom_accordion .accordion-button:not(.collapsed) {
          background-color: #fcf8f0;
          color: #d4af37;
        }
        .d_custom_accordion .accordion-button:focus {
          box-shadow: none;
          border-color: rgba(212, 175, 55, 0.5);
        }
        .d_btn_hover:hover {
          background-color: #d4af37;
          border-color: #d4af37;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default ShippingPolicy;