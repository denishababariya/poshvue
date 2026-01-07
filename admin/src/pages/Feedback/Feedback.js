import React, { useState } from "react";
import { FiEdit2, FiTrash2, FiPlus, FiX, FiEye } from "react-icons/fi";

function Feedback() {
    const [feedbacks, setFeedbacks] = useState([
        {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            about: "Website Navigation",
            star: 4,
            msg: "The site is easy to navigate but could use better search functionality.",
        },
        {
            id: 2,
            name: "Jane Smith",
            email: "jane@example.com",
            about: "Product Quality",
            star: 5,
            msg: "Excellent quality products and fast delivery!",
        },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [viewingData, setViewingData] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        about: "",
        star: 5,
        msg: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "star" ? parseInt(value) : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId) {
            setFeedbacks(
                feedbacks.map((f) => (f.id === editingId ? { ...formData, id: editingId } : f))
            );
        } else {
            setFeedbacks([...feedbacks, { ...formData, id: Date.now() }]);
        }
        resetForm();
    };

    const resetForm = () => {
        setFormData({ name: "", email: "", about: "", star: 5, msg: "" });
        setEditingId(null);
        setShowModal(false);
    };

    const handleEdit = (feedback) => {
        setFormData(feedback);
        setEditingId(feedback.id);
        setShowModal(true);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure?")) {
            setFeedbacks(feedbacks.filter((f) => f.id !== id));
        }
    };

    return (
        <div>
            <div style={{ marginBottom: "20px" }}>
                    <h1 style={{ fontSize: "24px", fontWeight: 700 }}>Feedback</h1>
                    <p style={{ color: "#7f8c8d" }}>Manage customer feedback</p>
            </div>


            {/* Modal */}
            <div className={`x_modal-overlay ${showModal ? "x_active" : ""}`}>
                <div className="x_modal-content">
                    <div className="x_modal-header">
                        <h2>{editingId ? "Edit Feedback" : "Add Feedback"}</h2>
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
                                <label className="x_form-label">About</label>
                                <input
                                    type="text"
                                    name="about"
                                    className="x_form-control"
                                    value={formData.about}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Website Navigation"
                                    required
                                />
                            </div>

                            <div className="x_form-group">
                                <label className="x_form-label">Rating</label>
                                <select
                                    name="star"
                                    className="x_form-select"
                                    value={formData.star}
                                    onChange={handleInputChange}
                                >
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <option key={s} value={s}>
                                            {s} Star{s > 1 ? "s" : ""}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="x_form-group">
                                <label className="x_form-label">Message</label>
                                <textarea
                                    name="msg"
                                    className="x_form-control"
                                    value={formData.msg}
                                    onChange={handleInputChange}
                                    placeholder="Your feedback..."
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

            {/* Feedback Table */}
            <div className="x_card">
                <div className="x_card-body">
                    <div className="xn_table-wrapper">
                        <table className="x_table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>About</th>
                                    <th>Rating</th>
                                    <th>Message</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {feedbacks.map((feedback) => (
                                    <tr key={feedback.id}>
                                        <td style={{ fontWeight: 600 }}>{feedback.name}</td>
                                        <td>{feedback.email}</td>
                                        <td>{feedback.about}</td>
                                        <td>
                                            <span style={{ color: "#ffc107", fontWeight: 600 }}>★ {feedback.star}</span>
                                        </td>
                                        <td>{feedback.msg.substring(0, 50)}...</td>
                                        <td>
                                            {/* <button
                                                className="x_btn x_btn-sm x_btn-info"
                                                onClick={() => {
                                                    setViewingData(feedback);
                                                    setShowViewModal(true);
                                                }}
                                                style={{ marginRight: "5px" }}
                                            >
                                                <FiEye size={14} /> View
                                            </button> */}
                                            <button className="x_btn x_btn x_btn-sm mx-2"
                                                onClick={() => {
                                                    setViewingData(feedback);
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
                        <h2>Feedback Details</h2>
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
                                    <label className="x_form-label">About</label>
                                    <p style={{ padding: "10px", background: "#f5f5f5", borderRadius: "4px" }}>
                                        {viewingData.about}
                                    </p>
                                </div>
                                <div className="x_form-group">
                                    <label className="x_form-label">Rating</label>
                                    <p style={{ padding: "10px", background: "#f5f5f5", borderRadius: "4px", color: "#ffc107", fontWeight: 600 }}>
                                        ★ {viewingData.star} / 5
                                    </p>
                                </div>
                                <div className="x_form-group">
                                    <label className="x_form-label">Message</label>
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

export default Feedback;
