import React, { useState } from "react";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";

function Products() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      category: "Electronics",
      price: "$89.99",
      stock: 45,
      status: "Active",
    },
    {
      id: 2,
      name: "USB-C Cable",
      category: "Electronics",
      price: "$12.99",
      stock: 230,
      status: "Active",
    },
    {
      id: 3,
      name: "Phone Case",
      category: "Accessories",
      price: "$19.99",
      stock: 120,
      status: "Active",
    },
    {
      id: 4,
      name: "Screen Protector",
      category: "Accessories",
      price: "$7.99",
      stock: 0,
      status: "Out of Stock",
    },
    {
      id: 5,
      name: "Smart Watch",
      category: "Electronics",
      price: "$199.99",
      stock: 15,
      status: "Active",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    category: "Electronics",
    price: "",
    stock: "",
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
      setProducts((prev) =>
        prev.map((prod) => (prod.id === editingId ? { ...formData, id: editingId } : prod))
      );
    } else {
      setProducts((prev) => [...prev, { ...formData, id: Date.now() }]);
    }
    resetForm();
  };

  const handleEdit = (product) => {
    setFormData(product);
    setEditingId(product.id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts((prev) => prev.filter((prod) => prod.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      id: null,
      name: "",
      category: "Electronics",
      price: "",
      stock: "",
      status: "Active",
    });
    setEditingId(null);
    setShowModal(false);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 700, margin: 0 }}>Products</h1>
        <button
          className="x_btn x_btn-primary"
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
        >
          <FiPlus size={16} /> Add Product
        </button>
      </div>

      {/* Modal */}
      <div className={`x_modal-overlay ${showModal ? "x_active" : ""}`}>
        <div className="x_modal-content">
          <div className="x_modal-header">
            <h2>{editingId ? "Edit Product" : "Add New Product"}</h2>
            <button className="x_modal-close" onClick={resetForm}>
              ×
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="x_modal-body">
              <div className="x_form-group">
                <label className="x_form-label">Product Name</label>
                <input
                  type="text"
                  name="name"
                  className="x_form-control"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div className="x_form-group">
                <label className="x_form-label">Category</label>
                <select
                  name="category"
                  className="x_form-select"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="Electronics">Electronics</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Home">Home & Garden</option>
                </select>
              </div>

              <div className="x_form-group">
                <label className="x_form-label">Price</label>
                <input
                  type="text"
                  name="price"
                  className="x_form-control"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="e.g., $99.99"
                  required
                />
              </div>

              <div className="x_form-group">
                <label className="x_form-label">Stock Quantity</label>
                <input
                  type="number"
                  name="stock"
                  className="x_form-control"
                  value={formData.stock}
                  onChange={handleInputChange}
                  placeholder="Enter stock quantity"
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
                  <option value="Out of Stock">Out of Stock</option>
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
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td style={{ fontWeight: 600 }}>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.price}</td>
                    <td>{product.stock}</td>
                    <td>
                      <span
                        style={{
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontSize: "12px",
                          fontWeight: 600,
                          backgroundColor:
                            product.status === "Active"
                              ? "#d4edda"
                              : product.status === "Out of Stock"
                              ? "#f8d7da"
                              : "#e2e3e5",
                          color:
                            product.status === "Active"
                              ? "#155724"
                              : product.status === "Out of Stock"
                              ? "#721c24"
                              : "#383d41",
                        }}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td>
                      <div className="x_table-action">
                        <button
                          className="x_btn x_btn-warning x_btn-sm"
                          onClick={() => handleEdit(product)}
                          title="Edit"
                        >
                          <FiEdit2 size={14} />
                        </button>
                        <button
                          className="x_btn x_btn-danger x_btn-sm"
                          onClick={() => handleDelete(product.id)}
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

export default Products;
