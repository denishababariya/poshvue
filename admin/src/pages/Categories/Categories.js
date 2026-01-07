import React, { useState, useEffect } from "react";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
import client from "../../api/client";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
    status: "Active",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await client.get("/catalog/categories", { params: { page: 1, limit: 50 } });
        setCategories(Array.isArray(res.data.items) ? res.data.items : []);
      } catch (err) {
        const msg = err?.response?.data?.message || "Failed to load categories";
        setError(msg);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({ name: "", description: "", image: null, status: "Active" });
    setEditingId(null);
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      if (editingId) {
        const res = await client.put(`/catalog/categories/${editingId}`, formData);
        setCategories((prev) => prev.map((c) => (c._id === editingId ? res.data.item : c)));
      } else {
        const res = await client.post("/catalog/categories", formData);
        setCategories((prev) => [res.data.item, ...prev]);
      }
      resetForm();
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to save category";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category) => {
    setFormData({
      name: category.name || "",
      description: category.description || "",
      image: category.image || null,
      status: category.active === false ? "Inactive" : "Active",
    });
    setEditingId(category._id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    try {
      setLoading(true);
      setError("");
      await client.delete(`/catalog/categories/${id}`);
      setCategories((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to delete category";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700 }}>Categories</h1>
        <p style={{ color: "#7f8c8d" }}>Manage product categories</p>
      </div>
      {error && <div className="x_alert x_alert-danger" style={{ marginBottom: 12 }}>{error}</div>}

      <button
        className="x_btn x_btn-primary"
        onClick={() => setShowModal(true)}
        style={{ marginBottom: 20 }}
      >
        <FiPlus size={16} /> New Category
      </button>

      {/* Modal */}
      <div className={`x_modal-overlay ${showModal ? "x_active" : ""}`}>
        <div className="x_modal-content" style={{ maxWidth: "600px" }}>
          <div className="x_modal-header">
            <h2>{editingId ? "Edit Category" : "New Category"}</h2>
            <button className="x_modal-close" onClick={resetForm}>×</button>
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
                  placeholder="Category name"
                  required
                />
              </div>

              <div className="x_form-group">
                <label className="x_form-label">Description</label>
                <textarea
                  name="description"
                  className="x_form-control"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Short description"
                />
              </div>

              <div className="x_form-group">
                <label className="x_form-label">Image URL</label>
                <input
                  type="url"
                  name="image"
                  className="x_form-control"
                  value={formData.image || ""}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
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
                </select>
              </div>
            </div>

            <div className="x_modal-footer">
              <button type="button" className="x_btn x_btn-secondary" onClick={resetForm}>Cancel</button>
              <button type="submit" className="x_btn x_btn-primary">{editingId ? "Update" : "Create"}</button>
            </div>
          </form>
        </div>
      </div>

      {/* Table */}
      <div className="x_card">
        <div className="x_card-body">
          <div className="x_table-wrapper">
            <table className="x_data-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th style={{ textAlign: "center" }}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {categories.map((category) => (
                  <tr key={category._id || category.id}>
                    <td>
                      {category.image ? (
                        <img
                          src={category.image}
                          alt={category.name}
                          style={{ width: 40, height: 40, objectFit: "cover", borderRadius: 6 }}
                        />
                      ) : (
                        <div style={{ width: 40, height: 40, background: "#eee", borderRadius: 6 }} />
                      )}
                    </td>
                    <td>{category.name}</td>
                    <td>{category.description}</td>
                    <td>{category.active === false ? "Inactive" : "Active"}</td>
                    <td style={{ textAlign: "center" }}>
                      <button className="x_btn x_btn-primary x_btn-sm" onClick={() => handleEdit(category)}>
                        <FiEdit2 size={14} />
                      </button>
                      <button className="x_btn x_btn-danger x_btn-sm" onClick={() => handleDelete(category._id || category.id)} style={{ marginLeft: 8 }}>
                        <FiTrash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
                {categories.length === 0 && (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center" }}>No categories found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
