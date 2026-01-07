import React, { useState } from "react";
import { FiEdit2, FiTrash2, FiPlus, FiX, FiEye } from "react-icons/fi";

function Complaints() {
    const [complaints, setComplaints] = useState([
        {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            phone: "+1-234-567-8900",
            orderId: "ORD-001",
            subject: "Payment Issue",
            issue: "payment",
            msg: "Payment was deducted but order not placed.",
        },
        {
            id: 2,
            name: "Jane Smith",
            email: "jane@example.com",
            phone: "+1-234-567-8901",
            orderId: "ORD-002",
            subject: "Delivery Delay",
            issue: "delivery",
            msg: "Order delayed for 5 days without notification.",
        },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [viewingData, setViewingData] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        orderId: "",
        subject: "",
        issue: "payment",
        msg: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId) {
            setComplaints(
                complaints.map((c) => (c.id === editingId ? { ...formData, id: editingId } : c))
            );
        } else {
            setComplaints([...complaints, { ...formData, id: Date.now() }]);
        }
        resetForm();
    };

    const resetForm = () => {
        setFormData({
            name: "",
            email: "",
            phone: "",
            orderId: "",
            subject: "",
            issue: "payment",
            msg: "",
        });
        setEditingId(null);
        setShowModal(false);
    };

    const handleEdit = (complaint) => {
        setFormData(complaint);
        setEditingId(complaint.id);
        setShowModal(true);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure?")) {
            setComplaints(complaints.filter((c) => c.id !== id));
        }
    };

    const getIssueBadge = (issue) => {
        const colors = {
            payment: { bg: "#f8d7da", text: "#721c24" },
            delivery: { bg: "#fff3cd", text: "#856404" },
            management: { bg: "#d1ecf1", text: "#0c5460" },
        };
        return colors[issue] || { bg: "#e2e3e5", text: "#383d41" };
    };

    return (
        <div>
            <div style={{ marginBottom: "20px" }}>
                <h1 style={{ fontSize: "24px", fontWeight: 700 }}>Complaints</h1>
                <p style={{ color: "#7f8c8d" }}>Manage customer complaints and issues</p>
            </div>


            {/* Modal */}
            <div className={`x_modal-overlay ${showModal ? "x_active" : ""}`}>
                <div className="x_modal-content">
                    <div className="x_modal-header">
                        <h2>{editingId ? "Edit Complaint" : "Add Complaint"}</h2>
                        <button className="x_modal-close" onClick={resetForm}>
                            <FiX />
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="x_modal-body">
                            <div className="x_form-group">
                                <label className="x_form-label">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="x_form-control"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Customer name"
                                    required
                                />
                            </div>

                            <div className="x_form-group">
                                <label className="x_form-label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="x_form-control"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="email@example.com"
                                    required
                                />
                            </div>

                            <div className="x_form-group">
                                <label className="x_form-label">Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    className="x_form-control"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="+1-234-567-8900"
                                    required
                                />
                            </div>

                            <div className="x_form-group">
                                <label className="x_form-label">Order ID</label>
                                <input
                                    type="text"
                                    name="orderId"
                                    className="x_form-control"
                                    value={formData.orderId}
                                    onChange={handleInputChange}
                                    placeholder="ORD-001"
                                    required
                                />
                            </div>

                            <div className="x_form-group">
                                <label className="x_form-label">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    className="x_form-control"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    placeholder="Complaint subject"
                                    required
                                />
                            </div>

                            <div className="x_form-group">
                                <label className="x_form-label">Issue Category</label>
                                <select
                                    name="issue"
                                    className="x_form-select"
                                    value={formData.issue}
                                    onChange={handleInputChange}
                                >
                                    <option value="payment">Payment</option>
                                    <option value="delivery">Delivery</option>
                                    <option value="management">Management</option>
                                </select>
                            </div>

                            <div className="x_form-group">
                                <label className="x_form-label">Message</label>
                                <textarea
                                    name="msg"
                                    className="x_form-control"
                                    value={formData.msg}
                                    onChange={handleInputChange}
                                    placeholder="Complaint details..."
                                    required
                                />
                            </div>
                        </div>

                        <div className="x_modal-footer">
                            <button type="button" className="x_btn x_btn-secondary" onClick={resetForm}>
                                Cancel
                            </button>
                            <button type="submit" className="x_btn x_btn-primary">
                                {editingId ? "Update" : "Create"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Complaints Table */}
            <div className="x_card">
                <div className="x_card-body">
                    <div className="xn_table-wrapper">
                        <table className="x_table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Order ID</th>
                                    <th>Subject</th>
                                    <th>Issue</th>
                                    <th>Message</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {complaints.map((complaint) => {
                                    const badgeColor = getIssueBadge(complaint.issue);
                                    return (
                                        <tr key={complaint.id}>
                                            <td style={{ fontWeight: 600 }}>{complaint.name}</td>
                                            <td>{complaint.email}</td>
                                            <td>{complaint.phone}</td>
                                            <td>{complaint.orderId}</td>
                                            <td>{complaint.subject}</td>
                                            <td>
                                                <span
                                                    style={{
                                                        padding: "4px 8px",
                                                        borderRadius: "4px",
                                                        fontSize: "12px",
                                                        fontWeight: 600,
                                                        backgroundColor: badgeColor.bg,
                                                        color: badgeColor.text,
                                                    }}
                                                >
                                                    {complaint.issue.charAt(0).toUpperCase() + complaint.issue.slice(1)}
                                                </span>
                                            </td>
                                            <td>{complaint.msg.substring(0, 40)}...</td>
                                            <td>
                                                {/* <button
                                                    className="x_btn x_btn-sm x_btn-info"
                                                    onClick={() => {
                                                        setViewingData(complaint);
                                                        setShowViewModal(true);
                                                    }}
                                                >
                                                    <FiEye size={14} /> View
                                                </button> */}
                                                <button className="x_btn x_btn x_btn-sm mx-2"
                                                    onClick={() => {
                                                        setViewingData(complaint);
                                                        setShowViewModal(true);
                                                    }}
                                                    style={{ backgroundColor: "#d1ecf1", color: "#0c5460" }}>
                                                    <FiEye />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* View Detail Modal */}
            <div className={`x_modal-overlay ${showViewModal ? "x_active" : ""}`}>
                <div className="x_modal-content">
                    <div className="x_modal-header">
                        <h2>Complaint Details</h2>
                        <button
                            className="x_modal-close"
                            onClick={() => setShowViewModal(false)}
                        >
                            <FiX />
                        </button>
                    </div>
                    <div className="x_modal-body">
                        {viewingData && (
                            <div>
                                <div className="x_form-group">
                                    <label className="x_form-label">Name</label>
                                    <p style={{ padding: "10px", background: "#f5f5f5", borderRadius: "4px" }}>
                                        {viewingData.name}
                                    </p>
                                </div>
                                <div className="x_form-group">
                                    <label className="x_form-label">Email</label>
                                    <p style={{ padding: "10px", background: "#f5f5f5", borderRadius: "4px" }}>
                                        {viewingData.email}
                                    </p>
                                </div>
                                <div className="x_form-group">
                                    <label className="x_form-label">Phone</label>
                                    <p style={{ padding: "10px", background: "#f5f5f5", borderRadius: "4px" }}>
                                        {viewingData.phone}
                                    </p>
                                </div>
                                <div className="x_form-group">
                                    <label className="x_form-label">Order ID</label>
                                    <p style={{ padding: "10px", background: "#f5f5f5", borderRadius: "4px" }}>
                                        {viewingData.orderId}
                                    </p>
                                </div>
                                <div className="x_form-group">
                                    <label className="x_form-label">Subject</label>
                                    <p style={{ padding: "10px", background: "#f5f5f5", borderRadius: "4px" }}>
                                        {viewingData.subject}
                                    </p>
                                </div>
                                <div className="x_form-group">
                                    <label className="x_form-label">Issue Type</label>
                                    <p style={{ padding: "10px", background: "#f5f5f5", borderRadius: "4px", textTransform: "capitalize" }}>
                                        {viewingData.issue}
                                    </p>
                                </div>
                                <div className="x_form-group">
                                    <label className="x_form-label">Complaint Details</label>
                                    <p style={{ padding: "10px", background: "#f5f5f5", borderRadius: "4px", lineHeight: "1.6" }}>
                                        {viewingData.msg}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="x_modal-footer">
                        <button
                            type="button"
                            className="x_btn x_btn-secondary"
                            onClick={() => setShowViewModal(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Complaints;
