import React, { useState } from "react";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";

function Categories() {
  const [categories, setCategories] = useState([
    { id: 1, name: "Electronics", description: "Electronic devices", status: "Active" },
    { id: 2, name: "Clothing", description: "Fashion items", status: "Active" },
    { id: 3, name: "Home & Garden", description: "Home and garden products", status: "Active" },
    { id: 4, name: "Sports", description: "Sports equipment", status: "Inactive" },
    { id: 5, name: "Books", description: "Educational and fiction books", status: "Active" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ id: null, name: "", description: "", status: "Active" });
  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setCategories((prev) =>
        prev.map((cat) => (cat.id === editingId ? { ...formData, id: editingId } : cat))
      );
    } else {
      setCategories((prev) => [...prev, { ...formData, id: Date.now() }]);
    }
    resetForm();
  };

  const handleEdit = (category) => {
    setFormData(category);
    setEditingId(category.id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({ id: null, name: "", description: "", status: "Active" });
    setEditingId(null);
    setShowModal(false);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 700, margin: 0 }}>Categories</h1>
        <button
          className="x_btn x_btn-primary"
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
        >
          <FiPlus size={16} /> Add Category
        </button>
      </div>

      {/* Modal */}
      <div className={`x_modal-overlay ${showModal ? "x_active" : ""}`}>
        <div className="x_modal-content">
          <div className="x_modal-header">
            <h2>{editingId ? "Edit Category" : "Add New Category"}</h2>
            <button className="x_modal-close" onClick={resetForm}>
              ×
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="x_modal-body">
              <div className="x_form-group">
                <label className="x_form-label">Category Name</label>
                <input
                  type="text"
                  name="name"
                  className="x_form-control"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter category name"
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
                  placeholder="Enter description"
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

      {/* Table */}
      <div className="x_card">
        <div className="x_card-body">
          <div className="x_table-wrapper">
            <table className="x_table">
              <thead>
                <tr>
                  <th>Category Name</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id}>
                    <td style={{ fontWeight: 600 }}>{category.name}</td>
                    <td>{category.description}</td>
                    <td>
                      <span
                        style={{
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontSize: "12px",
                          fontWeight: 600,
                          backgroundColor: category.status === "Active" ? "#d4edda" : "#f8d7da",
                          color: category.status === "Active" ? "#155724" : "#721c24",
                        }}
                      >
                        {category.status}
                      </span>
                    </td>
                    <td>
                      <div className="x_table-action">
                        <button
                          className="x_btn x_btn-warning x_btn-sm"
                          onClick={() => handleEdit(category)}
                          title="Edit"
                        >
                          <FiEdit2 size={14} />
                        </button>
                        <button
                          className="x_btn x_btn-danger x_btn-sm"
                          onClick={() => handleDelete(category.id)}
                          title="Delete"
                        >
                          <FiTrash2 size={14} />
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

export default Categories;
