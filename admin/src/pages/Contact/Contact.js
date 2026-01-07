import React, { useState } from "react";
import { FiEdit2, FiTrash2, FiPlus, FiX, FiEye } from "react-icons/fi";

function Contact() {
    const [contacts, setContacts] = useState([
        {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            sub: "General Inquiry",
            msg: "I have a question about your products.",
        },
        {
            id: 2,
            name: "Jane Smith",
            email: "jane@example.com",
            sub: "Partnership Proposal",
            msg: "I would like to discuss a partnership opportunity.",
        },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [viewingData, setViewingData] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        sub: "",
        msg: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId) {
            setContacts(
                contacts.map((c) => (c.id === editingId ? { ...formData, id: editingId } : c))
            );
        } else {
            setContacts([...contacts, { ...formData, id: Date.now() }]);
        }
        resetForm();
    };

    const resetForm = () => {
        setFormData({ name: "", email: "", sub: "", msg: "" });
        setEditingId(null);
        setShowModal(false);
    };

    const handleEdit = (contact) => {
        setFormData(contact);
        setEditingId(contact.id);
        setShowModal(true);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure?")) {
            setContacts(contacts.filter((c) => c.id !== id));
        }
    };

    return (
        <div>
            <div style={{ marginBottom: "20px" }}>
                <h1 style={{ fontSize: "24px", fontWeight: 700 }}>Contact Messages</h1>
                <p style={{ color: "#7f8c8d" }}>Manage contact form submissions</p>
            </div>


            {/* Modal */}
            <div className={`x_modal-overlay ${showModal ? "x_active" : ""}`}>
                <div className="x_modal-content">
                    <div className="x_modal-header">
                        <h2>{editingId ? "Edit Contact" : "Add Contact"}</h2>
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
                                    placeholder="Full name"
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
                                <label className="x_form-label">Subject</label>
                                <input
                                    type="text"
                                    name="sub"
                                    className="x_form-control"
                                    value={formData.sub}
                                    onChange={handleInputChange}
                                    placeholder="Message subject"
                                    required
                                />
                            </div>

                            <div className="x_form-group">
                                <label className="x_form-label">Message</label>
                                <textarea
                                    name="msg"
                                    className="x_form-control"
                                    value={formData.msg}
                                    onChange={handleInputChange}
                                    placeholder="Your message..."
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

            {/* Contacts Table */}
            <div className="x_card">
                <div className="x_card-body">
                    <div className="xn_table-wrapper">
                        <table className="x_table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Subject</th>
                                    <th>Message</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contacts.map((contact) => (
                                    <tr key={contact.id}>
                                        <td style={{ fontWeight: 600 }}>{contact.name}</td>
                                        <td>{contact.email}</td>
                                        <td>{contact.sub}</td>
                                        <td>{contact.msg.substring(0, 50)}...</td>
                                        <td>
                                            {/* <button
                        className="x_btn x_btn-sm x_btn-info"
                        onClick={() => {
                          setViewingData(contact);
                          setShowViewModal(true);
                        }}
                      >
                        <FiEye size={14} /> View
                      </button> */}
                                            <button className="x_btn x_btn x_btn-sm mx-2"
                                                onClick={() => {
                                                    setViewingData(contact);
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
                        <h2>Contact Details</h2>
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
                                    <label className="x_form-label">Subject</label>
                                    <p style={{ padding: "10px", background: "#f5f5f5", borderRadius: "4px" }}>
                                        {viewingData.sub}
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

export default Contact;
