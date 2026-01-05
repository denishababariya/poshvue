import React, { useState } from "react";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";

function Categories() {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Electronics",
      description: "Electronic devices",
      image: "https://flagcdn.com/w40/in.png",
      status: "Active",
    },
    {
      id: 2,
      name: "Clothing",
      description: "Fashion items",
      image: null,
      status: "Active",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
    status: "Active",
  });

  // Handle input
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        image: files[0] || null,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    const imageUrl =
      formData.image && typeof formData.image === "object"
        ? URL.createObjectURL(formData.image)
        : formData.image;

    if (editingId) {
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === editingId
            ? { ...cat, ...formData, image: imageUrl }
            : cat
        )
      );
    } else {
      setCategories((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...formData,
          image: imageUrl,
        },
      ]);
    }

    resetForm();
  };

  // Edit
  const handleEdit = (category) => {
    setFormData({
      name: category.name,
      description: category.description,
      image: category.image,
      status: category.status,
    });
    setEditingId(category.id);
    setShowModal(true);
  };

  // Delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
    }
  };

  // Reset
  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      image: null,
      status: "Active",
    });
    setEditingId(null);
    setShowModal(false);
  };

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <h1 style={{ fontSize: "24px", fontWeight: 700 }}>Categories</h1>
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
            <h2>{editingId ? "Edit Category" : "Add Category"}</h2>
            <button className="x_modal-close" onClick={resetForm}>
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="x_modal-body">
              <div className="x_form-group">
                <label className="x_form-label" >Category Image</label>
                <input
                  className="x_form-control"
                  type="file"
                  accept="image/*"
                  onChange={handleInputChange}
                />
              </div>

              <div className="x_form-group">
                <label className="x_form-label" >Category Name</label>
                <input
                  className="x_form-control"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="x_form-group">
                <label className="x_form-label" >Description</label>
                <textarea
                  className="x_form-control"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>

              <div className="x_form-group">
                <label className="x_form-label" >Status</label>
                <select
                  className="x_form-select"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="x_modal-footer">
              <button
                type="button"
                className="x_btn x_btn-secondary"
                onClick={resetForm}
              >
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
          <table className="x_table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td>
                    {category.image ? (
                      <img
                        src={category.image}
                        alt="category"
                        style={{
                          width: 40,
                          height: 40,
                          objectFit: "cover",
                          borderRadius: 4,
                          border: "1px solid #ddd",
                        }}
                      />
                    ) : (
                      <span style={{ fontSize: 12, color: "#999" }}>No image</span>
                    )}
                  </td>
                  <td style={{ fontWeight: 600 }}>{category.name}</td>
                  <td>{category.description}</td>
                  <td>
                    <span
                      style={{
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        fontWeight: 600,
                        background:
                          category.status === "Active"
                            ? "#d4edda"
                            : "#f8d7da",
                        color:
                          category.status === "Active"
                            ? "#155724"
                            : "#721c24",
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
  );
}

export default Categories;
