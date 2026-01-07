import React, { useState } from "react";
import { FiEdit2, FiTrash2, FiPlus, FiX } from "react-icons/fi";
import { FiStar } from "react-icons/fi";

function Reviews() {
    const [reviews, setReviews] = useState([
        {
            id: 1,
            productId: "PROD-001",
            userId: "USER-001",
            star: 5,
            msg: "Excellent product! Highly recommended.",
            img: "https://via.placeholder.com/100",
        },
        {
            id: 2,
            productId: "PROD-002",
            userId: "USER-002",
            star: 4,
            msg: "Good quality but shipping took time.",
            img: "https://via.placeholder.com/100",
        },
        {
            id: 3,
            productId: "PROD-001",
            userId: "USER-003",
            star: 3,
            msg: "Average product, could be better.",
            img: "https://via.placeholder.com/100",
        },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        productId: "",
        userId: "",
        star: 5,
        msg: "",
        img: "",
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
            setReviews(
                reviews.map((r) => (r.id === editingId ? { ...formData, id: editingId } : r))
            );
        } else {
            setReviews([...reviews, { ...formData, id: Date.now() }]);
        }
        resetForm();
    };

    const resetForm = () => {
        setFormData({ productId: "", userId: "", star: 5, msg: "", img: "" });
        setEditingId(null);
        setShowModal(false);
    };

    const handleEdit = (review) => {
        setFormData(review);
        setEditingId(review.id);
        setShowModal(true);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure?")) {
            setReviews(reviews.filter((r) => r.id !== id));
        }
    };

    const renderStars = (count) => {
        return Array.from({ length: 5 }).map((_, i) => (
            <FiStar
                key={i}
                size={14}
                style={{ color: i < count ? "#ffc107" : "#ddd", fill: i < count ? "#ffc107" : "none" }}
            />
        ));
    };

    return (
        <div>
            <div style={{ marginBottom: "20px" }}>
                    <h1 style={{ fontSize: "24px", fontWeight: 700 }}>Reviews</h1>
                    <p style={{ color: "#7f8c8d" }}>Manage product reviews and ratings</p>
            </div>


            {/* Modal */}
            <div className={`x_modal-overlay ${showModal ? "x_active" : ""}`}>
                <div className="x_modal-content">
                    <div className="x_modal-header">
                        <h2>{editingId ? "Edit Review" : "Add Review"}</h2>
                        <button className="x_modal-close" onClick={resetForm}>
                            <FiX />
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="x_modal-body">
                            <div className="x_form-group">
                                <label className="x_form-label">Product ID</label>
                                <input
                                    type="text"
                                    name="productId"
                                    className="x_form-control"
                                    value={formData.productId}
                                    onChange={handleInputChange}
                                    placeholder="e.g., PROD-001"
                                    required
                                />
                            </div>

                            <div className="x_form-group">
                                <label className="x_form-label">User ID</label>
                                <input
                                    type="text"
                                    name="userId"
                                    className="x_form-control"
                                    value={formData.userId}
                                    onChange={handleInputChange}
                                    placeholder="e.g., USER-001"
                                    required
                                />
                            </div>

                            <div className="x_form-group">
                                <label className="x_form-label">Rating (1-5)</label>
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
                                <label className="x_form-label">Image URL</label>
                                <input
                                    type="url"
                                    name="img"
                                    className="x_form-control"
                                    value={formData.img}
                                    onChange={handleInputChange}
                                    placeholder="https://..."
                                />
                            </div>

                            <div className="x_form-group">
                                <label className="x_form-label">Review Message</label>
                                <textarea
                                    name="msg"
                                    className="x_form-control"
                                    value={formData.msg}
                                    onChange={handleInputChange}
                                    placeholder="Write your review..."
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

            {/* Reviews Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
                {reviews.map((review) => (
                    <div key={review.id} className="x_card">
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "15px" }}>
                            <div style={{ display: "flex", gap: "5px" }}>{renderStars(review.star)}</div>
                        </div>

                        {review.img && (
                            <img
                                src={review.img}
                                alt="Review"
                                style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "4px", marginBottom: "10px" }}
                            />
                        )}

                        <p style={{ fontSize: "12px", color: "#7f8c8d", marginBottom: "5px" }}>
                            Product: {review.productId} | User: {review.userId}
                        </p>
                        <p style={{ fontSize: "14px", lineHeight: "1.5" }}>{review.msg}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Reviews;
