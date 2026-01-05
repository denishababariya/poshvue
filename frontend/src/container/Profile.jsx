import React, { useEffect, useState, useRef } from "react";
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
import { MdOutlineEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { MdCamera } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import Tooltip from "bootstrap/js/dist/tooltip";

function Profile() {
  const [key, setKey] = useState("myProfile");
  // State to track which coupon's details are open
  const [openCouponIndex, setOpenCouponIndex] = useState(null);
  const [openOrderId, setOpenOrderId] = useState(null);

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const fileInputRef = useRef(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: "Home",
      name: "John Doe",
      mobile: "9876543210",
      address: "123 Street, City, Country",
    },
    {
      id: 2,
      type: "Office",
      name: "John Doe",
      mobile: "9876501234",
      address: "456 Avenue, City, Country",
    },
  ]);

  const [addressForm, setAddressForm] = useState({
    type: "",
    name: "",
    mobile: "",
    address: "",
  });

  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "1234567890",
    dob: "",
    image:
      "https://i.pinimg.com/1200x/59/ce/78/59ce78d39fee53f1156c8d36a4eb9acb.jpg", // Placeholder image
  });

  const orders = [
    {
      id: "ORD001",
      date: "2026-01-01",
      status: "Delivered",
      amount: "$120",
      items: [
        { name: "Orange Traditional Set", qty: 1, price: "$50" },
        { name: "Pink Floral Anarkali", qty: 2, price: "$70" },
      ],
      address: "123 Street, City, Country",
    },
    {
      id: "ORD002",
      date: "2026-01-10",
      status: "Pending",
      amount: "$80",
      items: [{ name: "Indian wedding Lehenga", qty: 1, price: "$80" }],
      address: "456 Avenue, City, Country",
    },
  ];

  useEffect(() => {
    const initializeTooltips = () => {
      const tooltipTriggerList = document.querySelectorAll(
        '[data-bs-toggle="tooltip"]'
      );
      tooltipTriggerList.forEach(
        (tooltipTriggerEl) => new Tooltip(tooltipTriggerEl)
      );
    };

    // Delay to ensure items are rendered
    setTimeout(initializeTooltips, 100);
  }, [orders]); // re-run when orders change

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

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressForm({ ...addressForm, [name]: value });
  };

  const handleAddOrUpdateAddress = (e) => {
    e.preventDefault();

    if (editId) {
      // Update
      setAddresses(
        addresses.map((addr) =>
          addr.id === editId ? { ...addr, ...addressForm } : addr
        )
      );
    } else {
      // Add
      setAddresses([...addresses, { id: Date.now(), ...addressForm }]);
    }

    setAddressForm({ type: "", name: "", mobile: "", address: "" });
    setEditId(null);
    setShowAddressForm(false);
  };

  const handleEditAddress = (addr) => {
    setEditId(addr.id);
    setAddressForm(addr);
    setShowAddressForm(true);
  };

  const handleDeleteAddress = (id) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };

  const handleViewOrderDetails = (orderId) => {
    setOpenOrderId(openOrderId === orderId ? null : orderId);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfile({ ...profile, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <section className="z_prof_section py-5">
        <Container>
          <Tab.Container activeKey={key} onSelect={(k) => setKey(k)}>
            <Row>
              {/* Sidebar Nav */}
              <Col lg={3} className="mb-md-4">
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
              <Col lg={9}>
                <Tab.Content className="z_prof_tab_content">
                  {/* My Profile */}
                  <Tab.Pane eventKey="myProfile">
                    <div className="z_prof_card p-4">
                      <h4 className="z_prof_title mb-3">My Profile</h4>
                      <div className="text-center mb-3 w-auto">
                        {profile.image.startsWith("data:") ? (
                          <img
                            src={profile.image}
                            alt="Profile"
                            className="rounded-circle"
                            style={{
                              width: "100px",
                              height: "100px",
                              cursor: "pointer",
                              objectFit: "cover",
                            }}
                            onClick={() => fileInputRef.current.click()}
                          />
                        ) : (
                          <MdCamera
                            size={50}
                            style={{ color: "#ccc", cursor: "pointer" }}
                            onClick={() => fileInputRef.current.click()}
                          />
                        )}
                        <input
                          type="file"
                          ref={fileInputRef}
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </div>
                      <Form>
                        <Form.Group className="mb-3">
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                            type="text"
                            value={profile.name}
                            onChange={(e) =>
                              setProfile({ ...profile, name: e.target.value })
                            }
                            disabled={!isEditMode}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            value={profile.email}
                            onChange={(e) =>
                              setProfile({ ...profile, email: e.target.value })
                            }
                            disabled={!isEditMode}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Phone</Form.Label>
                          <Form.Control
                            type="tel"
                            value={profile.phone}
                            onChange={(e) =>
                              setProfile({ ...profile, phone: e.target.value })
                            }
                            disabled={!isEditMode}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Date of Birth</Form.Label>
                          <Form.Control
                            type="date"
                            value={profile.dob}
                            onChange={(e) =>
                              setProfile({ ...profile, dob: e.target.value })
                            }
                            disabled={!isEditMode}
                          />
                        </Form.Group>
                        <Button
                          className="z_prof_btn d-flex align-items-center gap-2"
                          onClick={() => setIsEditMode(!isEditMode)}
                        >
                          {!isEditMode && <MdOutlineEdit size={20} />}
                          {isEditMode ? "Update Profile" : ""}
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
                              <Button
                                className="z_order_btn mt-2"
                                onClick={() => handleViewOrderDetails(order.id)}
                              >
                                {openOrderId === order.id
                                  ? "Hide Details"
                                  : "View Details"}
                              </Button>
                            </div>
                            {openOrderId === order.id && (
                              <div className="z_order_details_box mt-3">
                                <p>
                                  <strong>Delivery Address:</strong>{" "}
                                  {order.address}
                                </p>

                                <div className="z_table_scroll">
                                  <Table bordered size="sm" className="mt-2">
                                    <thead>
                                      <tr>
                                        <th>Product</th>
                                        <th>Qty</th>
                                        <th>Price</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {order.items.map((item, i) => {
                                        const shortName =
                                          item.name.length > 20
                                            ? item.name.slice(0, 20) + "..."
                                            : item.name;

                                        return (
                                          <tr key={i}>
                                            <td>
                                              <span
                                                className="z_product_name"
                                                data-bs-toggle="tooltip"
                                                data-bs-placement="top"
                                                title={item.name}
                                              >
                                                {shortName}
                                              </span>
                                            </td>

                                            <td>{item.qty}</td>
                                            <td>{item.price}</td>
                                          </tr>
                                        );
                                      })}
                                    </tbody>
                                  </Table>
                                </div>

                                <div className="text-end fw-bold">
                                  Total: {order.amount}
                                </div>
                              </div>
                            )}
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
                        {addresses.map((addr) => (
                          <li key={addr.id} className="mb-3">
                            <div className="d-flex justify-content-between align-items-center z_prof_address_item">
                              <div>
                                <strong>{addr.type}:</strong> {addr.address}
                                <br />
                                <small>
                                  {addr.name} | {addr.mobile}
                                </small>
                              </div>
                              <div className="mt-2 d-flex gap-2">
                                <button
                                  className="z_outline_btn z_outline_edit z_icon_btn"
                                  onClick={() => handleEditAddress(addr)}
                                >
                                  <MdOutlineEdit size={20} />
                                  <span className="z_btn_text">Edit</span>
                                </button>

                                <button
                                  className="z_outline_btn z_outline_delete z_icon_btn"
                                  onClick={() => handleDeleteAddress(addr.id)}
                                >
                                  <MdDeleteOutline size={20} />
                                  <span className="z_btn_text">Delete</span>
                                </button>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>

                      <Button
                        className="z_prof_btn mt-3"
                        onClick={() => {
                          setShowAddressForm(true);
                          setEditId(null);
                          setAddressForm({
                            type: "",
                            name: "",
                            mobile: "",
                            address: "",
                          });
                        }}
                      >
                        Add New Address
                      </Button>

                      {/* Address Form */}
                      {showAddressForm && (
                        <Form
                          className="mt-4"
                          onSubmit={handleAddOrUpdateAddress}
                        >
                          <Form.Group className="mb-3">
                            <Form.Label>Address Type</Form.Label>
                            <Form.Control
                              type="text"
                              name="type"
                              placeholder="Home / Office"
                              value={addressForm.type}
                              onChange={handleAddressChange}
                              required
                            />
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="name"
                              value={addressForm.name}
                              onChange={handleAddressChange}
                              required
                            />
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Mobile</Form.Label>
                            <Form.Control
                              type="tel"
                              name="mobile"
                              value={addressForm.mobile}
                              onChange={handleAddressChange}
                              required
                            />
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Full Address</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              name="address"
                              value={addressForm.address}
                              onChange={handleAddressChange}
                              required
                            />
                          </Form.Group>

                          <Button type="submit" className="z_prof_btn me-2">
                            {editId ? "Update Address" : "Save Address"}
                          </Button>

                          <Button
                            variant="secondary"
                            onClick={() => setShowAddressForm(false)}
                          >
                            Cancel
                          </Button>
                        </Form>
                      )}
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
