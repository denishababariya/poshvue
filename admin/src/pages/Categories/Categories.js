import React, { useState } from "react";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";

function Categories() {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Sarees",
      description: "Fashion items",
      image: "https://as2.ftcdn.net/v2/jpg/06/53/22/59/1000_F_653225962_K90KnjANu6tBzZpV0sIkezcIELnn4dMQ.jpg",
      status: "Active",
    },
    {
      id: 2,
      name: "Kurti",
      description: "Fashion items",
      image: "https://i.pinimg.com/736x/c3/eb/d2/c3ebd28d59d0d4357fa57d54474fedce.jpg",
      status: "Active",
    },
     {
      id: 3,
      name: "Gown",
      description: "Fashion items",
      image: "https://i.pinimg.com/736x/ed/a4/eb/eda4eb4f417fd1d6a71fdd9583601a32.jpg",
      status: "Active",
    },
    {
      id: 4,
      name: "Salwar Suit",
      description: "Fashion items",
      image: "https://i.pinimg.com/736x/a7/9b/83/a79b8353a1c0ee841fcbb805a7b374bc.jpg",
      status: "Active",
    },
     {
      id: 5,
      name: "Lehenga",
      description: "Fashion items",
      image: "https://i.pinimg.com/736x/ea/d8/d1/ead8d173e5e5563d40baba2ddbc2dcdd.jpg",
      status: "Active",
    },
    {
      id: 6,
      name: "Ethnic Set",
      description: "Fashion items",
      image: "https://i.pinimg.com/736x/22/b5/18/22b518727e876d4d591191dcada1f7b8.jpg",
      status: "Active",
    },
    {
      id: 7,
      name: "Indo-Western",
      description: "Fashion items",
      image: "https://i.pinimg.com/1200x/38/90/f2/3890f20d6509796248848e63f87eba6e.jpg",
      status: "Active",
    },
    {
      id: 8,
      name: "Angrakha Wear",
      description: "Fashion items",
      image: "https://i.pinimg.com/1200x/2c/28/91/2c2891ba1d80797a165e6dbf5d8aaff8.jpg",
      status: "Active",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
    status: "Active",
  });

  const totalPages = Math.ceil(categories.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentCategories = categories.slice(startIndex, endIndex);

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
                <label className="x_form-label">Category Image</label>
                <input
                  className="x_form-control"
                  type="file"
                  accept="image/*"
                  onChange={handleInputChange}
                />
              </div>

              <div className="x_form-group">
                <label className="x_form-label">Category Name</label>
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
                <label className="x_form-label">Description</label>
                <textarea
                  className="x_form-control"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>

              <div className="x_form-group">
                <label className="x_form-label">Status</label>
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
                {currentCategories.map((category) => (
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
                    <td style={{ textAlign: "center" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          gap: "12px",
                        }}
                      >
                        <button
                          onClick={() => handleEdit(category)}
                          style={{
                            background: "none",
                            border: "none",
                            color: "#3b82f6",
                            cursor: "pointer",
                            padding: "5px",
                            display: "flex",
                          }}
                          title="Edit"
                        >
                          <FiEdit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(category.id)}
                          style={{
                            background: "none",
                            border: "none",
                            color: "#ef4444",
                            cursor: "pointer",
                            padding: "5px",
                            display: "flex",
                          }}
                          title="Delete"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      

      {/* Pagination */}
      {categories.length > ITEMS_PER_PAGE && (
        <div className="x_pagination">
          <button
            className={`x_pagination-item ${currentPage === 1 ? "x_active" : ""}`}
            onClick={() => setCurrentPage(1)}
          >
            1
          </button>

          {currentPage > 3 && (
            <span className="x_pagination-dots">...</span>
          )}

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(
              (page) =>
                page !== 1 &&
                page !== totalPages &&
                page >= currentPage - 1 &&
                page <= currentPage + 1
            )
            .map((page) => (
              <button
                key={page}
                className={`x_pagination-item ${currentPage === page ? "x_active" : ""}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}

          {currentPage < totalPages - 2 && (
            <span className="x_pagination-dots">...</span>
          )}

          {totalPages > 1 && (
            <button
              className={`x_pagination-item ${currentPage === totalPages ? "x_active" : ""}`}
              onClick={() => setCurrentPage(totalPages)}
            >
              {totalPages}
            </button>
          )}
        </div>
      )}

      </div>
    </div>
  );
}

export default Categories;
