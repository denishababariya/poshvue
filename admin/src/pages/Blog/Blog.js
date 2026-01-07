import React, { useState } from "react";
import { FiEdit2, FiTrash2, FiPlus, FiX } from "react-icons/fi";

function Blog() {
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "Fashion Trends 2024",
      author: "Admin",
      excerpt: "Discover the latest fashion trends for 2024...",
      category: "trends",
      introduction: "Fashion is constantly evolving with new trends emerging every season.",
      quote: "Style is a way to say who you are without having to speak.",
      sections: [
        { heading: "Color Trends", body: "This year focuses on earth tones and bold colors." },
        { heading: "Fabric Innovation", body: "Sustainable fabrics are becoming mainstream." },
      ],
      tips: ["Invest in quality basics", "Mix and match patterns", "Accessorize wisely"],
      images: [],
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    excerpt: "",
    category: "trends",
    introduction: "",
    quote: "",
    sections: [{ heading: "", body: "" }],
    tips: [""],
    images: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSectionChange = (index, field, value) => {
    const newSections = [...formData.sections];
    newSections[index] = { ...newSections[index], [field]: value };
    setFormData((prev) => ({ ...prev, sections: newSections }));
  };

  const handleTipsChange = (index, value) => {
    const newTips = [...formData.tips];
    newTips[index] = value;
    setFormData((prev) => ({ ...prev, tips: newTips }));
  };

  const addSection = () => {
    setFormData((prev) => ({
      ...prev,
      sections: [...prev.sections, { heading: "", body: "" }],
    }));
  };

  const removeSection = (index) => {
    setFormData((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index),
    }));
  };

  const addTip = () => {
    setFormData((prev) => ({
      ...prev,
      tips: [...prev.tips, ""],
    }));
  };

  const removeTip = (index) => {
    setFormData((prev) => ({
      ...prev,
      tips: prev.tips.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setBlogs(blogs.map((b) => (b.id === editingId ? { ...formData, id: editingId } : b)));
    } else {
      setBlogs([...blogs, { ...formData, id: Date.now() }]);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: "",
      author: "",
      excerpt: "",
      category: "trends",
      introduction: "",
      quote: "",
      sections: [{ heading: "", body: "" }],
      tips: [""],
      images: [],
    });
    setEditingId(null);
    setShowModal(false);
  };

  const handleEdit = (blog) => {
    setFormData(blog);
    setEditingId(blog.id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      setBlogs(blogs.filter((b) => b.id !== id));
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 700 }}>Blog</h1>
        <p style={{ color: "#7f8c8d" }}>Create and manage blog posts</p>
      </div>

      <button
        className="x_btn x_btn-primary"
        onClick={() => setShowModal(true)}
        style={{ marginBottom: "20px" }}
      >
        <FiPlus size={16} /> New Blog Post
      </button>

      {/* Modal */}
      <div className={`x_modal-overlay ${showModal ? "x_active" : ""}`}>
        <div className="x_modal-content" style={{ maxWidth: "700px" }}>
          <div className="x_modal-header">
            <h2>{editingId ? "Edit Blog Post" : "New Blog Post"}</h2>
            <button className="x_modal-close" onClick={resetForm}>
              <FiX />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="x_modal-body" style={{ maxHeight: "600px", overflowY: "auto" }}>
              <div className="x_form-group">
                <label className="x_form-label">Title</label>
                <input
                  type="text"
                  name="title"
                  className="x_form-control"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Blog post title"
                  required
                />
              </div>

              <div className="x_form-group">
                <label className="x_form-label">Author</label>
                <input
                  type="text"
                  name="author"
                  className="x_form-control"
                  value={formData.author}
                  onChange={handleInputChange}
                  placeholder="Author name"
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
                  <option value="trends">Trends</option>
                  <option value="styling">Styling</option>
                  <option value="heritage">Heritage</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="x_form-group">
                <label className="x_form-label">Excerpt</label>
                <textarea
                  name="excerpt"
                  className="x_form-control"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  placeholder="Short summary"
                  required
                />
              </div>

              <div className="x_form-group">
                <label className="x_form-label">Introduction</label>
                <textarea
                  name="introduction"
                  className="x_form-control"
                  value={formData.introduction}
                  onChange={handleInputChange}
                  placeholder="Blog introduction"
                  required
                />
              </div>

              <div className="x_form-group">
                <label className="x_form-label">Quote</label>
                <textarea
                  name="quote"
                  className="x_form-control"
                  value={formData.quote}
                  onChange={handleInputChange}
                  placeholder="Inspirational quote"
                />
              </div>

              <div className="x_form-group">
                <label className="x_form-label">Featured Image URL</label>
                <input
                  type="url"
                  className="x_form-control"
                  value={formData.images?.[0] || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      images: [e.target.value],
                    }))
                  }
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              {/* Sections */}
              <div style={{ marginTop: "20px", paddingTop: "20px", borderTop: "1px solid #dee2e6" }}>
                <h3 style={{ fontSize: "14px", fontWeight: 600, marginBottom: "10px" }}>
                  Sections
                </h3>
                {formData.sections.map((section, index) => (
                  <div key={index} style={{ marginBottom: "15px", padding: "10px", backgroundColor: "#f8f9fa", borderRadius: "4px" }}>
                    <div className="x_form-group">
                      <label className="x_form-label">Heading</label>
                      <input
                        type="text"
                        className="x_form-control"
                        value={section.heading}
                        onChange={(e) => handleSectionChange(index, "heading", e.target.value)}
                        placeholder="Section heading"
                      />
                    </div>
                    <div className="x_form-group">
                      <label className="x_form-label">Body</label>
                      <textarea
                        className="x_form-control"
                        value={section.body}
                        onChange={(e) => handleSectionChange(index, "body", e.target.value)}
                        placeholder="Section content"
                      />
                    </div>
                    {formData.sections.length > 1 && (
                      <button
                        type="button"
                        className="x_btn x_btn-danger x_btn-sm"
                        onClick={() => removeSection(index)}
                      >
                        <FiX size={14} /> Remove Section
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  className="x_btn x_btn-secondary x_btn-sm"
                  onClick={addSection}
                  style={{ marginTop: "10px" }}
                >
                  <FiPlus size={14} /> Add Section
                </button>
              </div>

              {/* Tips */}
              <div style={{ marginTop: "20px", paddingTop: "20px", borderTop: "1px solid #dee2e6" }}>
                <h3 style={{ fontSize: "14px", fontWeight: 600, marginBottom: "10px" }}>
                  Tips
                </h3>
                {formData.tips.map((tip, index) => (
                  <div key={index} style={{ marginBottom: "10px", display: "flex", gap: "10px" }}>
                    <input
                      type="text"
                      className="x_form-control"
                      value={tip}
                      onChange={(e) => handleTipsChange(index, e.target.value)}
                      placeholder={`Tip ${index + 1}`}
                    />
                    {formData.tips.length > 1 && (
                      <button
                        type="button"
                        className="x_btn x_btn-danger x_btn-sm"
                        onClick={() => removeTip(index)}
                        style={{ minWidth: "45px" }}
                      >
                        <FiX size={14} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  className="x_btn x_btn-secondary x_btn-sm"
                  onClick={addTip}
                  style={{ marginTop: "10px" }}
                >
                  <FiPlus size={14} /> Add Tip
                </button>
              </div>
            </div>

            <div className="x_modal-footer">
              <button type="button" className="x_btn x_btn-secondary" onClick={resetForm}>
                Cancel
              </button>
              <button type="submit" className="x_btn x_btn-primary">
                {editingId ? "Update" : "Publish"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Blog Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
        {blogs.map((blog) => (
          <div key={blog.id} className="x_blog-card">
            <div className="x_blog-header">
              <span className="x_blog-category">{blog.category}</span>
              <div className="x_blog-actions">
                <button
                  className="x_btn x_btn-primary x_btn-sm"
                  onClick={() => handleEdit(blog)}
                  title="Edit"
                >
                  <FiEdit2 size={14} />
                </button>
                <button
                  className="x_btn x_btn-danger x_btn-sm"
                  onClick={() => handleDelete(blog.id)}
                  title="Delete"
                >
                  <FiTrash2 size={14} />
                </button>
              </div>
            </div>

            <h3 className="x_blog-title">{blog.title}</h3>

            {blog.images?.[0] && (
              <img
                src={blog.images[0]}
                alt={blog.title}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "6px",
                  marginBottom: "12px",
                }}
              />
            )}

            <div className="x_blog-meta">
              <span>By {blog.author}</span>
            </div>

            <p className="x_blog-excerpt">{blog.excerpt}</p>

            {blog.quote && (
              <div className="x_blog-quote">
                "{blog.quote}"
              </div>
            )}

            <div className="x_blog-tips">
              <strong style={{ fontSize: "12px" }}>Tips:</strong>
              <ul style={{ margin: "5px 0 0 15px", fontSize: "12px" }}>
                {blog.tips.slice(0, 2).map((tip, idx) => (
                  tip && <li key={idx}>{tip}</li>
                ))}
                {blog.tips.filter(t => t).length > 2 && (
                  <li>+{blog.tips.filter(t => t).length - 2} more</li>
                )}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blog;
