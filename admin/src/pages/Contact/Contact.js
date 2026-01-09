import React, { useState, useEffect } from "react";
import { FiX, FiEye } from "react-icons/fi";
import client from "../../api/client";

function Contact() {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [showViewModal, setShowViewModal] = useState(false);
    const [viewingData, setViewingData] = useState(null);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                setLoading(true);
                setError('');
                const res = await client.get('/support/contacts', { params: { page: 1, limit: 50 } });
                setContacts(res.data.items || []);
            } catch (err) {
                const msg = err?.response?.data?.message || 'Failed to load contacts';
                setError(msg);
            } finally {
                setLoading(false);
            }
        };
        fetchContacts();
    }, []);

    const handleView = (item) => {
        setViewingData(item);
        setShowViewModal(true);
    };

    const handleCloseView = () => {
        setViewingData(null);
        setShowViewModal(false);
    };

    const toggleStatus = async (item) => {
        try {
            const nextStatus = item.status === 'replied' ? 'new' : 'replied';
            const res = await client.put(`/support/contacts/${item._id}/status`, { status: nextStatus });
            const updated = res.data.item;
            setContacts((prev) => prev.map((c) => (c._id === item._id ? updated : c)));
        } catch (err) {
            alert(err?.response?.data?.message || 'Failed to update status');
        }
    };

    return (
        <div>
            <div style={{ marginBottom: "20px" }}>
                <h1 style={{ fontSize: "24px", fontWeight: 700 }}>Contact</h1>
                <p style={{ color: "#7f8c8d" }}>Manage contact form submissions</p>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}
            {loading && <div className="alert alert-info">Loading contacts...</div>}

            {/* Contact List Table */}
            <div className="x_card">
                <div className="x_card-body">
                    <div className="xn_table-wrapper">
                        <table className="x_table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Subject</th>
                                    <th>Status</th>
                                    <th>Message</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contacts.map((contact) => (
                                    <tr key={contact._id}>
                                        <td style={{ fontWeight: 600 }}>{contact.name}</td>
                                        <td>{contact.email}</td>
                                        <td>{contact.subject}</td>
                                        <td>{contact.status}</td>
                                        <td style={{ maxWidth: 400, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{contact.message}</td>
                                        <td>
                                            <div style={{ textAlign: "center" }}>                                                
                                                <button className="x_btn x_btn-sm mx-2"
                                                    onClick={() => handleView(contact)}
                                                    style={{ backgroundColor: "#d1ecf1", color: "#0c5460" }}>
                                                    <FiEye />
                                                </button>
                                                <button
                                                    className="x_btn x_btn-primary py-1"
                                                    style={{fontSize:"14px"}}
                                                    title={contact.status === 'replied' ? 'Mark New' : 'Mark Replied'}
                                                    onClick={() => toggleStatus(contact)}
                                                >
                                                    {contact.status === 'replied' ? 'Mark New' : 'Mark Replied'}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
