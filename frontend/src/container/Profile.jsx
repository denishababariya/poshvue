import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Nav,
  Tab,
  Form,
  Button,
  Table,
} from "react-bootstrap";

function Profile() {
  const [key, setKey] = useState("myProfile");

  const orders = [
    { id: "ORD001", date: "2026-01-01", status: "Delivered", amount: "$120" },
    { id: "ORD002", date: "2026-01-10", status: "Pending", amount: "$80" },
  ];

  // State to track which coupon's details are open
  const [openCouponIndex, setOpenCouponIndex] = useState(null);

  const coupons = [
    {
      header: "Shipping Offer",
      offer: "Free Shipping on US $250",
      code: "DECM250",
      expiry: "2026-01-02",
    },
    {
      header: "10% Off",
      offer: "Buy anything, Save 10% – min Spend 200$",
      code: "DECM10",
      expiry: "2026-01-02",
    },
  ];

  const toggleCouponDetails = (index) => {
    setOpenCouponIndex(openCouponIndex === index ? null : index);
  };

  return (
    <>
      <section className="z_prof_section py-5">
        <Container>
          <Tab.Container activeKey={key} onSelect={(k) => setKey(k)}>
            <Row>
              {/* Sidebar Nav */}
              <Col lg={3} md={4} className="mb-4">
                <Nav variant="pills" className="flex-column z_prof_nav">
                  <Nav.Item>
                    <Nav.Link eventKey="myProfile">My Profile</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="myOrders">My Orders</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="myCoupons">My Coupons</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="myAddresses">Addresses</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="changePassword">
                      Change Password
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="logout">Logout</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>

              {/* Tab Content */}
              <Col lg={9} md={8}>
                <Tab.Content className="z_prof_tab_content">
                  {/* My Profile */}
                  <Tab.Pane eventKey="myProfile">
                    <div className="z_prof_card p-4">
                      <h4 className="z_prof_title mb-3">My Profile</h4>
                      <Form>
                        <Form.Group className="mb-3">
                          <Form.Label>Name</Form.Label>
                          <Form.Control type="text" defaultValue="John Doe" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            defaultValue="john@example.com"
                          />
                        </Form.Group>
                        <Button className="z_prof_btn" type="submit">
                          Update Profile
                        </Button>
                      </Form>
                    </div>
                  </Tab.Pane>

                  {/* My Orders */}
                  <Tab.Pane eventKey="myOrders">
                    <div className="z_prof_card p-4">
                      <h4 className="z_prof_title mb-4">My Orders</h4>
                      <div className="z_orders_timeline">
                        {orders.map((order, index) => (
                          <div key={order.id} className="z_order_timeline_item">
                            <div className="z_order_marker">
                              <span
                                className={`z_order_dot ${order.status.toLowerCase()}`}
                              ></span>
                              {index !== orders.length - 1 && (
                                <span className="z_order_line"></span>
                              )}
                            </div>
                            <div className="z_order_content">
                              <div className="z_order_id_status">
                                <span className="z_order_id">{order.id}</span>
                                <span
                                  className={`z_order_status ${order.status.toLowerCase()}`}
                                >
                                  {order.status}
                                </span>
                              </div>
                              <div className="z_order_details">
                                <span>
                                  <strong>Date:</strong> {order.date}
                                </span>
                                <span>
                                  <strong>Amount:</strong> {order.amount}
                                </span>
                              </div>
                              <Button className="z_order_btn mt-2">
                                View Details
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Tab.Pane>

                  {/* My Coupons */}
                  <Tab.Pane eventKey="myCoupons">
                    <div className="z_prof_card p-4">
                      <h4 className="z_prof_title mb-3">My Coupons</h4>
                      <ul className="z_prof_coupon_list">
                        {coupons.map((c, index) => (
                          <li key={index}>
                            <div className="z_coupon_header">{c.header}</div>
                            <div className="z_coupon_offer">{c.offer}</div>
                            <div className="z_coupon_code">Code: {c.code}</div>

                            {openCouponIndex === index && (
                              <div className="z_coupon_expiry">
                                Expiry: {c.expiry}
                              </div>
                            )}

                            <a
                              className="z_coupon_details"
                              style={{ cursor: "pointer" }}
                              onClick={() => toggleCouponDetails(index)}
                            >
                              {openCouponIndex === index
                                ? "Hide Details"
                                : "Details"}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Tab.Pane>

                  {/* Addresses */}
                  <Tab.Pane eventKey="myAddresses">
                    <div className="z_prof_card p-4">
                      <h4 className="z_prof_title mb-3">Addresses</h4>
                      <ul className="z_prof_address_list">
                        <li>
                          <strong>Home:</strong> 123 Street, City, Country
                        </li>
                        <li>
                          <strong>Office:</strong> 456 Avenue, City, Country
                        </li>
                      </ul>
                      <Button className="z_prof_btn mt-3">
                        Add New Address
                      </Button>
                    </div>
                  </Tab.Pane>

                  {/* Change Password */}
                  <Tab.Pane eventKey="changePassword">
                    <div className="z_prof_card p-4">
                      <h4 className="z_prof_title mb-3">Change Password</h4>
                      <Form>
                        <Form.Group className="mb-3">
                          <Form.Label>Current Password</Form.Label>
                          <Form.Control type="password" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>New Password</Form.Label>
                          <Form.Control type="password" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Confirm Password</Form.Label>
                          <Form.Control type="password" />
                        </Form.Group>
                        <Button className="z_prof_btn" type="submit">
                          Update Password
                        </Button>
                      </Form>
                    </div>
                  </Tab.Pane>

                  {/* Logout */}
                  <Tab.Pane eventKey="logout">
                    <div className="z_prof_card p-4">
                      <h4 className="z_prof_title mb-3">Logout</h4>
                      <p>Click below to logout from your account.</p>
                      <Button className="z_prof_btn">Logout</Button>
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Container>
      </section>

      <style jsx="true">
        {`
          .row {
            --bs-gutter-x: 1.5rem !important;
          }
        `}
      </style>
    </>
  );
}

export default Profile;
