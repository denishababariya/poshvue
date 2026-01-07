import React, { useState } from "react";
import { FiTrash2, FiPlus, FiX } from "react-icons/fi";

function Subscribe() {
  const [subscribers, setSubscribers] = useState([
    { id: 1, email: "john@example.com", date: "2024-01-15" },
    { id: 2, email: "jane@example.com", date: "2024-01-14" },
    { id: 3, email: "mike@example.com", date: "2024-01-10" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ email: "" });

  const handleInputChange = (e) => {
    setFormData({ email: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email) {
      const newDate = new Date().toISOString().split("T")[0];
      setSubscribers([
        ...subscribers,
        { id: Date.now(), email: formData.email, date: newDate },
      ]);
      setFormData({ email: "" });
      setShowModal(false);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      setSubscribers(subscribers.filter((s) => s.id !== id));
    }
  };

  const handleExport = () => {
    const csv = subscribers.map((s) => `${s.email},${s.date}`).join("\n");
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(csv)
    );
    element.setAttribute("download", "subscribers.csv");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div>
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div>
        <h1 style={{ fontSize: "24px", fontWeight: 700 }}>Subscribers</h1>
        <p style={{ color: "#7f8c8d" }}>
          Manage newsletter subscribers ({subscribers.length} total)
        </p>
        </div>
         <button className="x_btn x_btn-success" onClick={handleExport}>
          Export CSV
        </button>
      </div>
      {/* Modal */}
      <div className={`x_modal-overlay ${showModal ? "x_active" : ""}`}>
        <div className="x_modal-content">
          <div className="x_modal-header">
            <h2>Add Subscriber</h2>
            <button
              className="x_modal-close"
              onClick={() => {
                setShowModal(false);
                setFormData({ email: "" });
              }}
            >
              <FiX />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="x_modal-body">
              <div className="x_form-group">
                <label className="x_form-label">Email</label>
                <input
                  type="email"
                  className="x_form-control"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="subscriber@example.com"
                  required
                />
              </div>
            </div>

            <div className="x_modal-footer">
              <button
                type="button"
                className="x_btn x_btn-secondary"
                onClick={() => {
                  setShowModal(false);
                  setFormData({ email: "" });
                }}
              >
                Cancel
              </button>
              <button type="submit" className="x_btn x_btn-primary">
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Subscribers Table */}
      <div className="x_card">
        <div className="x_card-body">
          <div className="xn_table-wrapper">
            <table className="x_table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Subscribed Date</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((subscriber) => (
                  <tr key={subscriber.id}>
                    <td style={{ fontWeight: 600 }}>{subscriber.email}</td>
                    <td>{subscriber.date}</td>
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

export default Subscribe;
