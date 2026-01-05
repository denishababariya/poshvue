import React, { useState } from "react";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";

function Coupons() {
  const [coupons, setCoupons] = useState([
    {
      id: 1,
      code: "SAVE10",
      discount: "10%",
      type: "Percentage",
      maxUses: 100,
      used: 45,
      expiryDate: "2024-12-31",
      status: "Active",
    },
    {
      id: 2,
      code: "FLAT50",
      discount: "$50",
      type: "Fixed",
      maxUses: 50,
      used: 30,
      expiryDate: "2024-02-28",
      status: "Active",
    },
    {
      id: 3,
      code: "NEWYEAR2024",
      discount: "15%",
      type: "Percentage",
      maxUses: 200,
      used: 189,
      expiryDate: "2024-01-15",
      status: "Active",
    },
    {
      id: 4,
      code: "HOLIDAY25",
      discount: "25%",
      type: "Percentage",
      maxUses: 150,
      used: 150,
      expiryDate: "2023-12-26",
      status: "Expired",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    code: "",
    discount: "",
    type: "Percentage",
    maxUses: "",
    expiryDate: "",
    status: "Active",
  });
  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setCoupons((prev) =>
        prev.map((coupon) =>
          coupon.id === editingId ? { ...formData, id: editingId, used: coupon.used } : coupon
        )
      );
    } else {
      setCoupons((prev) => [...prev, { ...formData, id: Date.now(), used: 0 }]);
    }
    resetForm();
  };

  const handleEdit = (coupon) => {
    setFormData(coupon);
    setEditingId(coupon.id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this coupon?")) {
      setCoupons((prev) => prev.filter((coupon) => coupon.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      id: null,
      code: "",
      discount: "",
      type: "Percentage",
      maxUses: "",
      expiryDate: "",
      status: "Active",
    });
    setEditingId(null);
    setShowModal(false);
  };

  const getUsagePercentage = (used, max) => {
    return Math.round((used / max) * 100);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 700, margin: 0 }}>Coupons & Discounts</h1>
        <button
          className="x_btn x_btn-primary"
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
        >
          <FiPlus size={16} /> Create Coupon
        </button>
      </div>

      {/* Modal */}
      <div className={`x_modal-overlay ${showModal ? "x_active" : ""}`}>
        <div className="x_modal-content">
          <div className="x_modal-header">
            <h2>{editingId ? "Edit Coupon" : "Create New Coupon"}</h2>
            <button className="x_modal-close" onClick={resetForm}>
              ×
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="x_modal-body">
              <div className="x_form-group">
                <label className="x_form-label">Coupon Code</label>
                <input
                  type="text"
                  name="code"
                  className="x_form-control"
                  value={formData.code}
                  onChange={handleInputChange}
                  placeholder="e.g., SAVE10"
                  required
                  style={{ textTransform: "uppercase" }}
                />
              </div>

              <div className="x_form-group">
                <label className="x_form-label">Discount Type</label>
                <select
                  name="type"
                  className="x_form-select"
                  value={formData.type}
                  onChange={handleInputChange}
                >
                  <option value="Percentage">Percentage (%)</option>
                  <option value="Fixed">Fixed Amount ($)</option>
                </select>
              </div>

              <div className="x_form-group">
                <label className="x_form-label">Discount Value</label>
                <input
                  type="text"
                  name="discount"
                  className="x_form-control"
                  value={formData.discount}
                  onChange={handleInputChange}
                  placeholder={formData.type === "Percentage" ? "e.g., 10" : "e.g., 50"}
                  required
                />
              </div>

              <div className="x_form-group">
                <label className="x_form-label">Maximum Uses</label>
                <input
                  type="number"
                  name="maxUses"
                  className="x_form-control"
                  value={formData.maxUses}
                  onChange={handleInputChange}
                  placeholder="e.g., 100"
                  required
                />
              </div>

              <div className="x_form-group">
                <label className="x_form-label">Expiry Date</label>
                <input
                  type="date"
                  name="expiryDate"
                  className="x_form-control"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="x_form-group">
                <label className="x_form-label">Status</label>
                <select
                  name="status"
                  className="x_form-select"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Expired">Expired</option>
                </select>
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

      {/* Coupons Grid */}
      <div className="x_grid x_grid-2">
        {coupons.map((coupon) => (
          <div className="x_card" key={coupon.id}>
            <div className="x_card-header">
              <div>
                <h2 style={{ fontSize: "18px", margin: "0 0 5px 0" }}>{coupon.code}</h2>
                <p style={{ margin: 0, fontSize: "13px", color: "#7f8c8d" }}>
                  {coupon.type} - {coupon.discount}
                </p>
              </div>
              <span
                style={{
                  padding: "4px 8px",
                  borderRadius: "4px",
                  fontSize: "12px",
                  fontWeight: 600,
                  backgroundColor: coupon.status === "Active" ? "#d4edda" : "#f8d7da",
                  color: coupon.status === "Active" ? "#155724" : "#721c24",
                  whiteSpace: "nowrap",
                }}
              >
                {coupon.status}
              </span>
            </div>
            <div className="x_card-body" style={{ padding: "20px" }}>
              <div style={{ marginBottom: "15px" }}>
                <p style={{ margin: "0 0 5px 0", fontSize: "12px", color: "#7f8c8d" }}>
                  Usage
                </p>
                <div
                  style={{
                    width: "100%",
                    height: "8px",
                    backgroundColor: "#ecf0f1",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${getUsagePercentage(coupon.used, coupon.maxUses)}%`,
                      backgroundColor: "#3498db",
                    }}
                  />
                </div>
                <p style={{ margin: "5px 0 0 0", fontSize: "12px", color: "#7f8c8d" }}>
                  {coupon.used} / {coupon.maxUses} used
                </p>
              </div>

              <div style={{ marginBottom: "15px" }}>
                <p style={{ margin: "0 0 5px 0", fontSize: "12px", color: "#7f8c8d" }}>
                  Expires on
                </p>
                <p style={{ margin: 0, fontSize: "13px", fontWeight: 600 }}>
                  {coupon.expiryDate}
                </p>
              </div>

              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  className="x_btn x_btn-warning x_btn-sm"
                  onClick={() => handleEdit(coupon)}
                  title="Edit"
                  style={{ flex: 1 }}
                >
                  <FiEdit2 size={14} /> Edit
                </button>
                <button
                  className="x_btn x_btn-danger x_btn-sm"
                  onClick={() => handleDelete(coupon.id)}
                  title="Delete"
                  style={{ flex: 1 }}
                >
                  <FiTrash2 size={14} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Coupons;
