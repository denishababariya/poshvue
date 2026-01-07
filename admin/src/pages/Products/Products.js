import React, { useState } from "react";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";

function Products() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      images: [
        "https://flagpedia.net/data/flags/h80/my.webp",
        "https://flagcdn.com/w40/in.png",
      ],
      colors: ["red"],
      category: "Electronics",
      price: 89.99,
      discountPercent: 0,
      salePrice: 89.99,
      rating: 4.5,
      description: "High-quality wireless headphones",
      fabric: "N/A",
      manufacturer: "TechBrand",
      occasion: "Daily Use",
      washCare: "N/A",
      productType: "Audio Device",
      work: "Noise Cancelling",
      stock: 45,
      status: "Active",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    images: [],
    colors: [],
    category: "Electronics",
    price: "",
    discountPercent: 0,
    salePrice: "",
    rating: "",
    description: "",
    fabric: "",
    manufacturer: "",
    occasion: "",
    washCare: "",
    productType: "",
    work: "",
    stock: "",
    status: "Active",
  });
  const [editingId, setEditingId] = useState(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColorHex, setSelectedColorHex] = useState("#000000");

  const predefinedColors = [
    { name: "Red", hex: "#FF0000" },
    { name: "Blue", hex: "#0000FF" },
    { name: "Green", hex: "#00AA00" },
    { name: "Yellow", hex: "#FFFF00" },
    { name: "Black", hex: "#000000" },
    { name: "White", hex: "#FFFFFF" },
    { name: "Pink", hex: "#FFC0CB" },
    { name: "Orange", hex: "#FFA500" },
    { name: "Purple", hex: "#800080" },
    { name: "Gray", hex: "#808080" },
  ];

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const newImages = Array.from(files);
      setFormData((prev) => ({
        ...prev,
        images: [...(prev.images || []), ...newImages],
      }));
    } else if (name === "price" || name === "discountPercent") {
      const price =
        name === "price" ? parseFloat(value) : parseFloat(formData.price || 0);
      const discount =
        name === "discountPercent"
          ? parseFloat(value)
          : parseFloat(formData.discountPercent || 0);

      const newPrice = parseFloat(value) || 0;
      const newDiscount = discount;
      const salePrice = price - (price * newDiscount) / 100;

      setFormData((prev) => ({
        ...prev,
        [name]: newPrice,
        salePrice: salePrice.toFixed(2),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const addColor = (color) => {
    if (!formData.colors.some((c) => c.hex === color.hex)) {
      setFormData((prev) => ({
        ...prev,
        colors: [...prev.colors, color],
      }));
    }
    setShowColorPicker(false);
  };

  const removeColor = (colorHex) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.filter((c) => c.hex !== colorHex),
    }));
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setProducts((prev) =>
        prev.map((prod) =>
          prod.id === editingId ? { ...formData, id: editingId } : prod
        )
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
      images: [],
      colors: [],
      category: "Electronics",
      price: "",
      discountPercent: 0,
      salePrice: "",
      rating: "",
      description: "",
      fabric: "",
      manufacturer: "",
      occasion: "",
      washCare: "",
      productType: "",
      work: "",
      stock: "",
      status: "Active",
    });
    setEditingId(null);
    setShowModal(false);
    setShowColorPicker(false);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1 style={{ fontSize: "24px", fontWeight: 700, margin: 0 }}>
          Products
        </h1>
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
      <div
        className={`x_modal-overlay ${showModal ? "x_active" : ""}`}
        style={{ overflowY: "auto" }}
      >
        <div className="x_modal-content" style={{ maxWidth: "700px" }}>
          <div className="x_modal-header">
            <h2>{editingId ? "Edit Product" : "Add New Product"}</h2>
            <button className="x_modal-close" onClick={resetForm}>
              ×
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div
              className="x_modal-body"
              style={{ maxHeight: "70vh", overflowY: "auto" }}
            >
              {/* Images Section */}
              <div className="x_form-group">
                <label className="x_form-label">
                  Product Images (Multi-Select)
                </label>
                <input
                  type="file"
                  name="images"
                  className="x_form-control"
                  onChange={handleInputChange}
                  accept="image/*"
                  multiple
                />
                {formData.images && formData.images.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "10px",
                      marginTop: "10px",
                    }}
                  >
                    {formData.images.map((img, idx) => (
                      <div
                        key={idx}
                        style={{
                          position: "relative",
                          width: "60px",
                          height: "60px",
                        }}
                      >
                        {typeof img === "object" ? (
                          <div
                            style={{
                              width: "100%",
                              height: "100%",
                              backgroundColor: "#f0f0f0",
                              borderRadius: "4px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "10px",
                              textAlign: "center",
                              padding: "5px",
                              position: "relative",
                            }}
                          >
                            {img.name || "Image"}
                            <button
                              type="button"
                              onClick={() => removeImage(idx)}
                              style={{
                                position: "absolute",
                                top: "-8px",
                                right: "-8px",
                                backgroundColor: "#ff4444",
                                color: "white",
                                border: "none",
                                borderRadius: "50%",
                                width: "20px",
                                height: "20px",
                                cursor: "pointer",
                                fontSize: "14px",
                              }}
                            >
                              ×
                            </button>
                          </div>
                        ) : (
                          <img
                            src={img}
                            alt={`Product ${idx}`}
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "4px",
                              objectFit: "cover",
                              position: "relative",
                            }}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Colors Section */}
              <div className="x_form-group">
                <label className="x_form-label">
                  Colors (Multi-Select with Color Picker)
                </label>
                <div
                  style={{ display: "flex", gap: "10px", alignItems: "center" }}
                >
                  <button
                    type="button"
                    className="x_btn x_btn-primary"
                    onClick={() => setShowColorPicker(!showColorPicker)}
                    style={{ padding: "8px 12px", fontSize: "14px" }}
                  >
                    Add Color
                  </button>
                </div>

                {showColorPicker && (
                  <div
                    style={{
                      marginTop: "10px",
                      padding: "10px",
                      backgroundColor: "#f9f9f9",
                      borderRadius: "4px",
                      border: "1px solid #ddd",
                    }}
                  >
                    <div style={{ marginBottom: "10px" }}>
                      <label
                        style={{
                          fontSize: "12px",
                          display: "block",
                          marginBottom: "5px",
                        }}
                      >
                        Select Color:
                      </label>
                      <input
                        type="color"
                        value={selectedColorHex}
                        onChange={(e) => setSelectedColorHex(e.target.value)}
                        style={{
                          width: "50px",
                          height: "40px",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                    <div
                      style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}
                    >
                      {predefinedColors.map((color) => (
                        <button
                          key={color.hex}
                          type="button"
                          onClick={() => addColor(color)}
                          style={{
                            width: "40px",
                            height: "40px",
                            backgroundColor: color.hex,
                            border: "2px solid #ccc",
                            borderRadius: "4px",
                            cursor: "pointer",
                            title: color.name,
                          }}
                          title={color.name}
                        />
                      ))}
                    </div>
                    <button
                      type="button"
                      className="x_btn x_btn-primary"
                      onClick={() =>
                        addColor({ name: "Custom", hex: selectedColorHex })
                      }
                      style={{
                        marginTop: "10px",
                        padding: "6px 10px",
                        fontSize: "12px",
                      }}
                    >
                      Add Custom Color
                    </button>
                  </div>
                )}

                {formData.colors && formData.colors.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "10px",
                      marginTop: "10px",
                      alignItems: "center",
                    }}
                  >
                    {formData.colors.map((color) => (
                      <div
                        key={color.hex}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "6px 10px",
                          backgroundColor: "#f0f0f0",
                          borderRadius: "4px",
                          border: `3px solid ${color.hex}`,
                        }}
                      >
                        <div
                          style={{
                            width: "20px",
                            height: "20px",
                            backgroundColor: color.hex,
                            borderRadius: "3px",
                            border: "1px solid #999",
                          }}
                        />
                        <span style={{ fontSize: "13px" }}>{color.name}</span>
                        <button
                          type="button"
                          onClick={() => removeColor(color.hex)}
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            cursor: "pointer",
                            color: "#ff0000",
                            fontSize: "16px",
                            fontWeight: "bold",
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Basic Product Info */}
              <div className="x_form-group">
                <label className="x_form-label">Product Name *</label>
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

              {/* Pricing Section */}
              <div
                style={{
                  borderTop: "1px solid #ddd",
                  paddingTop: "15px",
                  marginTop: "15px",
                }}
              >
                <h4 style={{ marginBottom: "12px" }}>Pricing & Offers</h4>

                <div className="x_form-group">
                  <label className="x_form-label">Price (Base) *</label>
                  <input
                    type="number"
                    name="price"
                    className="x_form-control"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="e.g., 99.99"
                    step="0.01"
                    required
                  />
                </div>

                <div className="x_form-group">
                  <label className="x_form-label">Discount % (Optional)</label>
                  <input
                    type="number"
                    name="discountPercent"
                    className="x_form-control"
                    value={formData.discountPercent}
                    onChange={handleInputChange}
                    placeholder="e.g., 10"
                    min="0"
                    max="100"
                    step="0.01"
                  />
                  <small style={{ color: "#666" }}>
                    Sale price will auto-calculate
                  </small>
                </div>

                <div className="x_form-group">
                  <label className="x_form-label">
                    Sale Price (Auto-calculated)
                  </label>
                  <input
                    type="number"
                    name="salePrice"
                    className="x_form-control"
                    value={formData.salePrice}
                    disabled
                    placeholder="Auto-calculated"
                  />
                </div>

                <div className="x_form-group">
                  <label className="x_form-label">Rating (Optional)</label>
                  <input
                    type="number"
                    name="rating"
                    className="x_form-control"
                    value={formData.rating}
                    onChange={handleInputChange}
                    placeholder="e.g., 4.5"
                    min="0"
                    max="5"
                    step="0.1"
                  />
                </div>
              </div>

              {/* Stock & Status */}
              <div
                style={{
                  borderTop: "1px solid #ddd",
                  paddingTop: "15px",
                  marginTop: "15px",
                }}
              >
                <h4 style={{ marginBottom: "12px" }}>Stock & Status</h4>

                <div className="x_form-group">
                  <label className="x_form-label">Stock Quantity *</label>
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

              {/* Product Information */}
              <div
                style={{
                  borderTop: "1px solid #ddd",
                  paddingTop: "15px",
                  marginTop: "15px",
                }}
              >
                <h4 style={{ marginBottom: "12px" }}>Product Information</h4>

                <div className="x_form-group">
                  <label className="x_form-label">Product Description</label>
                  <textarea
                    name="description"
                    className="x_form-control"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter detailed product description"
                    rows="3"
                  />
                </div>

                <div className="x_form-group">
                  <label className="x_form-label">Fabric</label>
                  <input
                    type="text"
                    name="fabric"
                    className="x_form-control"
                    value={formData.fabric}
                    onChange={handleInputChange}
                    placeholder="e.g., Cotton, Polyester, Silk"
                  />
                </div>

                <div className="x_form-group">
                  <label className="x_form-label">Manufacturer Name</label>
                  <input
                    type="text"
                    name="manufacturer"
                    className="x_form-control"
                    value={formData.manufacturer}
                    onChange={handleInputChange}
                    placeholder="Enter manufacturer name"
                  />
                </div>

                <div className="x_form-group">
                  <label className="x_form-label">Occasion</label>
                  <input
                    type="text"
                    name="occasion"
                    className="x_form-control"
                    value={formData.occasion}
                    onChange={handleInputChange}
                    placeholder="e.g., Daily Wear, Formal, Casual"
                  />
                </div>

                <div className="x_form-group">
                  <label className="x_form-label">Wash Care</label>
                  <textarea
                    name="washCare"
                    className="x_form-control"
                    value={formData.washCare}
                    onChange={handleInputChange}
                    placeholder="Enter care instructions"
                    rows="2"
                  />
                </div>

                <div className="x_form-group">
                  <label className="x_form-label">Product Type</label>
                  <input
                    type="text"
                    name="productType"
                    className="x_form-control"
                    value={formData.productType}
                    onChange={handleInputChange}
                    placeholder="e.g., T-Shirt, Jeans, Dress"
                  />
                </div>

                <div className="x_form-group">
                  <label className="x_form-label">Work/Design Details</label>
                  <input
                    type="text"
                    name="work"
                    className="x_form-control"
                    value={formData.work}
                    onChange={handleInputChange}
                    placeholder="e.g., Embroidered, Printed, Solid"
                  />
                </div>
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
      {/* Table Section */}

      <style>
        {`/* ટેબલ કન્ટેનર: આ જ મેઈન સ્ક્રોલ કંટ્રોલ કરે છે */
       .x_table-wrapper {
           max-width: 89vw;
           overflow-x: auto; /* માત્ર આડા સ્ક્રોલ માટે */
           background: #ffffff;
           border-radius: 8px;
           box-shadow: 0 2px 10px rgba(0,0,0,0.08);
           border: 1px solid #e0e0e0;
       }
       
       /* સ્ક્રોલબારની ડિઝાઈન (Chrome/Safari માટે) */
       .x_table-wrapper::-webkit-scrollbar {
           height: 6px;
       }
       .x_table-wrapper::-webkit-scrollbar-track {
           background: #f1f1f1;
       }
       .x_table-wrapper::-webkit-scrollbar-thumb {
           background: #ccc;
           border-radius: 10px;
       }
       .x_table-wrapper::-webkit-scrollbar-thumb:hover {
           background: #aaa;
       }
       
       /* ટેબલ સ્ટાઈલ */
       .x_data-table {
           width: 100%;
           min-width: 1000px; /* આનાથી ટેબલની વિડ્થ જળવાઈ રહેશે અને સ્ક્રોલ આવશે */
           border-collapse: collapse;
           text-align: left;
       }
       
       .x_data-table th {
           background-color: #f8f9fa;
           padding: 15px 12px;
           font-weight: 600;
           color: #333;
           border-bottom: 2px solid #dee2e6;
           white-space: nowrap; /* હેડિંગ એક જ લાઈનમાં રહેશે */
       }
       
       .x_data-table td {
           padding: 12px;
           border-bottom: 1px solid #eee;
           vertical-align: middle;
           color: #444;
       }
       
       /* રો હોવર ઇફેક્ટ */
       .x_data-table tbody tr:hover {
           background-color: #fcfcfc;
       }
       
       @media (max-width: 1350px) and (min-width: 769px) {
           .x_table-wrapper {
           max-width: calc(100vw - 360px); /* એડજસ્ટ કરેલ સાઇડબાર માટે */
          }
          }
       `}
      </style>
      {/* Table Section */}
      <div className="x_card ">
        <div className="x_card-body">
          <div className="x_table-wrapper">
            <table className="x_data-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Colors</th>
                  <th style={{ textAlign: "center" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    {/* Product Image & Name */}
                    <td>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <img
                          src={
                            typeof product.images[0] === "string"
                              ? product.images[0]
                              : URL.createObjectURL(product.images[0])
                          }
                          alt={product.name}
                          style={{
                            width: "45px",
                            height: "45px",
                            borderRadius: "6px",
                            objectFit: "cover",
                            border: "1px solid #eee",
                          }}
                        />
                        <span style={{ fontWeight: "500" }}>{product.name}</span>
                      </div>
                    </td>

                    {/* Category */}
                    <td>{product.category}</td>

                    {/* Price */}
                    <td>
                      <div style={{ lineHeight: "1.2" }}>
                        <div style={{ fontWeight: "700", color: "#222" }}>
                          ${product.salePrice}
                        </div>
                        {product.discountPercent > 0 && (
                          <div
                            style={{
                              fontSize: "11px",
                              color: "#999",
                              textDecoration: "line-through",
                            }}
                          >
                            ${product.price}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Stock */}
                    <td style={{ fontWeight: "500" }}>{product.stock}</td>

                    {/* Status */}
                    <td>
                      <span
                        style={{
                          padding: "4px 10px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          fontWeight: "500",
                          backgroundColor:
                            product.status === "Active" ? "#e6f4ea" : "#feeaee",
                          color:
                            product.status === "Active" ? "#1e7e34" : "#d93025",
                        }}
                      >
                        {product.status}
                      </span>
                    </td>

                    {/* Colors */}
                    <td>
                      <div style={{ display: "flex", gap: "5px" }}>
                        {product.colors.map((c, i) => (
                          <div
                            key={i}
                            title={c.name}
                            style={{
                              width: "16px",
                              height: "16px",
                              borderRadius: "50%",
                              backgroundColor: c.hex,
                              border: "1px solid #ddd",
                              boxShadow: "inset 0 0 2px rgba(0,0,0,0.1)",
                            }}
                          />
                        ))}
                      </div>
                    </td>

                    {/* Actions */}
                    <td style={{ textAlign: "center" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          gap: "12px",
                        }}
                      >
                        <button
                          onClick={() => handleEdit(product)}
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
                          onClick={() => handleDelete(product.id)}
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

      </div>
    </div>
  );
}

export default Products;
