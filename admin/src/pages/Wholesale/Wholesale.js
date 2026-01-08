import React, { useState } from "react";
import { FiEdit2, FiTrash2, FiPlus, FiX, FiEye } from "react-icons/fi";

function Wholesale() {
    const [wholesalers, setWholesalers] = useState([
        {
            id: 1,
            name: "ABC Wholesale Inc",
            companyName: "ABC Wholesale Inc",
            address: "123 Business Street",
            email: "contact@abcwholesale.com",
            city: "New York",
            phone: "+1-212-555-0123",
            state: "NY",
            country: "USA",
            pincode: "10001",
            details: "Bulk orders for retail chains",
        },
        {
            id: 2,
            name: "Global Trade Ltd",
            companyName: "Global Trade Ltd",
            address: "456 Commerce Ave",
            email: "info@globaltrade.com",
            city: "Los Angeles",
            phone: "+1-213-555-0456",
            state: "CA",
            country: "USA",
            pincode: "90001",
            details: "Import/export wholesale",
        },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [viewingData, setViewingData] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        companyName: "",
        address: "",
        email: "",
        city: "",
        phone: "",
        state: "",
        country: "",
        pincode: "",
        details: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId) {
            setWholesalers(
                wholesalers.map((w) => (w.id === editingId ? { ...formData, id: editingId } : w))
            );
        } else {
            setWholesalers([...wholesalers, { ...formData, id: Date.now() }]);
        }
        resetForm();
    };

    const resetForm = () => {
        setFormData({
            name: "",
            companyName: "",
            address: "",
            email: "",
            city: "",
            phone: "",
            state: "",
            country: "",
            pincode: "",
            details: "",
        });
        setEditingId(null);
        setShowModal(false);
    };

    const handleEdit = (wholesaler) => {
        setFormData(wholesaler);
        setEditingId(wholesaler.id);
        setShowModal(true);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure?")) {
            setWholesalers(wholesalers.filter((w) => w.id !== id));
        }

        
    };

    return (
        <div>
            <div style={{ marginBottom: "20px" }}>
                <div>
                <h1 style={{ fontSize: "24px", fontWeight: 700 }}>Wholesale Partners</h1>
                <p style={{ color: "#7f8c8d" }}>Manage wholesale business inquiries</p>
                </div>
            </div>
           


            {/* Modal */}
            <div className={`x_modal-overlay ${showModal ? "x_active" : ""}`}>
                <div className="x_modal-content" style={{ maxWidth: "600px" }}>
                    <div className="x_modal-header">
                        <h2>{editingId ? "Edit Wholesaler" : "Add Wholesaler"}</h2>
                        <button className="x_modal-close" onClick={resetForm}>
                            <FiX />
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="x_modal-body" style={{ maxHeight: "500px", overflowY: "auto" }}>
                            <div className="x_form-group">
                                <label className="x_form-label">Contact Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="x_form-control"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Full name"
                                    required
                                />
                            </div>

                            <div className="x_form-group">
                                <label className="x_form-label">Company Name</label>
                                <input
                                    type="text"
                                    name="companyName"
                                    className="x_form-control"
                                    value={formData.companyName}
                                    onChange={handleInputChange}
                                    placeholder="Company name"
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
                                    placeholder="email@company.com"
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
                                    placeholder="+1-XXX-XXX-XXXX"
                                    required
                                />
                            </div>

                            <div className="x_form-group">
                                <label className="x_form-label">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    className="x_form-control"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    placeholder="Street address"
                                    required
                                />
                            </div>

                            <div className="x_form-group">
                                <label className="x_form-label">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    className="x_form-control"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    placeholder="City"
                                    required
                                />
                            </div>

                            <div className="x_form-group">
                                <label className="x_form-label">State</label>
                                <input
                                    type="text"
                                    name="state"
                                    className="x_form-control"
                                    value={formData.state}
                                    onChange={handleInputChange}
                                    placeholder="State/Province"
                                    required
                                />
                            </div>

                            <div className="x_form-group">
                                <label className="x_form-label">Country</label>
                                <input
                                    type="text"
                                    name="country"
                                    className="x_form-control"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                    placeholder="Country"
                                    required
                                />
                            </div>

                            <div className="x_form-group">
                                <label className="x_form-label">Pincode</label>
                                <input
                                    type="text"
                                    name="pincode"
                                    className="x_form-control"
                                    value={formData.pincode}
                                    onChange={handleInputChange}
                                    placeholder="Postal code"
                                    required
                                />
                            </div>

                            <div className="x_form-group">
                                <label className="x_form-label">Details</label>
                                <textarea
                                    name="details"
                                    className="x_form-control"
                                    value={formData.details}
                                    onChange={handleInputChange}
                                    placeholder="Business details and requirements..."
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

            {/* Wholesalers Table */}
            <div className="x_card">
                <div className="x_card-body">
                    <div className="xn_table-wrapper">
                        <table className="x_table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Company</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>City</th>
                                    <th>Country</th>
                                    <th>Details</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {wholesalers.map((wholesaler) => (
                                    <tr key={wholesaler.id}>
                                        <td style={{ fontWeight: 600 }}>{wholesaler.name}</td>
                                        <td>{wholesaler.companyName}</td>
                                        <td>{wholesaler.email}</td>
                                        <td>{wholesaler.phone}</td>
                                        <td>{wholesaler.city}</td>
                                        <td>{wholesaler.country}</td>
                                        <td>{wholesaler.details.substring(0, 30)}...</td>
                                        <td>
                                            {/* <button
                        className="x_btn x_btn-sm x_btn-info"
                        onClick={() => {
                          setViewingData(wholesaler);
                          setShowViewModal(true);
                        }}
                      >
                        <FiEye size={14} /> View
                      </button> */}
                                            <button className="x_btn x_btn x_btn-sm mx-2"
                                                onClick={() => {
                                                    setViewingData(wholesaler);
                                                    setShowViewModal(true);
                                                }}
                                                style={{ backgroundColor: "#d1ecf1", color: "#0c5460" }}>
                                                <FiEye />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* View Detail Modal */}
            <div className={`x_modal-overlay ${showViewModal ? "x_active" : ""}`}>
                <div className="x_modal-content">
                    <div className="x_modal-header">
                        <h2>Wholesaler Details</h2>
                        <button
                            className="x_modal-close"
                            onClick={() => setShowViewModal(false)}
                        >
                            <FiX />
                        </button>
                    </div>
                    <div className="x_modal-body" style={{ maxHeight: "500px", overflowY: "auto" }}>
                        {viewingData && (
                            <div>
                                <div className="x_form-group">
                                    <label className="x_form-label">Name</label>
                                    <p style={{ padding: "10px", background: "#f5f5f5", borderRadius: "4px" }}>
                                        {viewingData.name}
                                    </p>
                                </div>
                                <div className="x_form-group">
                                    <label className="x_form-label">Company Name</label>
                                    <p style={{ padding: "10px", background: "#f5f5f5", borderRadius: "4px" }}>
                                        {viewingData.companyName}
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
                                    <label className="x_form-label">Address</label>
                                    <p style={{ padding: "10px", background: "#f5f5f5", borderRadius: "4px" }}>
                                        {viewingData.address}
                                    </p>
                                </div>
                                <div className="x_form-group">
                                    <label className="x_form-label">City</label>
                                    <p style={{ padding: "10px", background: "#f5f5f5", borderRadius: "4px" }}>
                                        {viewingData.city}
                                    </p>
                                </div>
                                <div className="x_form-group">
                                    <label className="x_form-label">State</label>
                                    <p style={{ padding: "10px", background: "#f5f5f5", borderRadius: "4px" }}>
                                        {viewingData.state}
                                    </p>
                                </div>
                                <div className="x_form-group">
                                    <label className="x_form-label">Country</label>
                                    <p style={{ padding: "10px", background: "#f5f5f5", borderRadius: "4px" }}>
                                        {viewingData.country}
                                    </p>
                                </div>
                                <div className="x_form-group">
                                    <label className="x_form-label">Pincode</label>
                                    <p style={{ padding: "10px", background: "#f5f5f5", borderRadius: "4px" }}>
                                        {viewingData.pincode}
                                    </p>
                                </div>
                                <div className="x_form-group">
                                    <label className="x_form-label">Business Details</label>
                                    <p style={{ padding: "10px", background: "#f5f5f5", borderRadius: "4px", lineHeight: "1.6" }}>
                                        {viewingData.details}
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

export default Wholesale;
