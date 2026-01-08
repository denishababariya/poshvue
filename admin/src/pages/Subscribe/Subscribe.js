import React, { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import client from "../../api/client";

function Subscribe() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  

  useEffect(() => {
    const fetchSubs = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await client.get("/support/subscriptions", { params: { page: 1, limit: 100 } });
        setItems(res.data.items || []);
      } catch (err) {
        const msg = err?.response?.data?.message || "Failed to load subscriptions";
        setError(msg);
      } finally {
        setLoading(false);
      }
    };
    fetchSubs();
  }, []);

  const handleDelete = async (item) => {
    if (!window.confirm("Delete this subscriber?")) return;
    try {
      await client.delete(`/support/subscriptions/${item._id}`);
      setItems((prev) => prev.filter((s) => s._id !== item._id));
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to delete");
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 700 }}>Newsletter Subscribers</h1>
        <p style={{ color: "#7f8c8d" }}>Manage email subscriptions</p>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div className="alert alert-info">Loading subscribers...</div>}

      <div className="x_card">
        <div className="x_card-body">
          <div className="xn_table-wrapper">
            <table className="x_table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Source</th>
                  <th>Subscribed At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((sub) => (
                  <tr key={sub._id}>
                    <td style={{ fontWeight: 600 }}>{sub.email}</td>
                    <td>{sub.source || 'frontend'}</td>
                    <td>{new Date(sub.createdAt).toLocaleString()}</td>
                    <td>
                      <button className="x_btn x_btn-danger" title="Delete" onClick={() => handleDelete(sub)}>
                        <FiTrash2 />
                      </button>
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

export default Subscribe;
