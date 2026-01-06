import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiTruck } from "react-icons/fi";

function Orders() {
  const navigate = useNavigate();
  const [orders] = useState([
    {
      id: "ORD-001",
      customer: "John Doe",
      amount: "$150.00",
      status: "Delivered",
      date: "2024-01-02",
      items: 3,
    },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      amount: "$280.50",
      status: "Processing",
      date: "2024-01-02",
      items: 2,
    },
    {
      id: "ORD-003",
      customer: "Mike Johnson",
      amount: "$95.00",
      status: "Pending",
      date: "2024-01-01",
      items: 1,
    },
    {
      id: "ORD-004",
      customer: "Sarah Williams",
      amount: "$320.00",
      status: "Delivered",
      date: "2024-01-01",
      items: 5,
    },
    {
      id: "ORD-005",
      customer: "Tom Brown",
      amount: "$180.75",
      status: "Shipped",
      date: "2023-12-31",
      items: 2,
    },
    {
      id: "ORD-006",
      customer: "Emma Davis",
      amount: "$245.00",
      status: "Processing",
      date: "2023-12-30",
      items: 4,
    },
  ]);

  const getStatusColor = (status) => {
    const colors = {
      Delivered: { bg: "#d4edda", text: "#155724" },
      Processing: { bg: "#fff3cd", text: "#856404" },
      Shipped: { bg: "#d1ecf1", text: "#0c5460" },
      Pending: { bg: "#f8d7da", text: "#721c24" },
    };
    return colors[status] || { bg: "#e2e3e5", text: "#383d41" };
  };

  const handleViewDetails = (orderId) => {
    alert(`View details for order ${orderId}`);
  };

  const handleTrackOrder = (orderId) => {
    navigate(`/orders/${orderId}/track`);
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 700, margin: "0 0 10px 0" }}>Orders</h1>
        <p style={{ color: "#7f8c8d", margin: 0 }}>Manage and track all customer orders</p>
      </div>

      {/* Filters */}
      <div className="x_card" style={{ marginBottom: "20px" }}>
        <div className="x_card-body">
          <div className="x_grid x_grid-2">
            <div className="x_form-group">
              <label className="x_form-label">Filter by Status</label>
              <select className="x_form-select">
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
            <div className="x_form-group">
              <label className="x_form-label">Date Range</label>
              <input type="date" className="x_form-control" />
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="x_card">
        <div className="x_card-body">
          <div className="xn_table-wrapper">
            <table className="x_table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Items</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  const statusColor = getStatusColor(order.status);
                  return (
                    <tr key={order.id}>
                      <td style={{ fontWeight: 600 }}>{order.id}</td>
                      <td>{order.customer}</td>
                      <td style={{ fontWeight: 600 }}>{order.amount}</td>
                      <td>{order.items}</td>
                      <td>
                        <span
                          style={{
                            padding: "4px 8px",
                            borderRadius: "4px",
                            fontSize: "12px",
                            fontWeight: 600,
                            backgroundColor: statusColor.bg,
                            color: statusColor.text,
                          }}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td>{order.date}</td>
                      <td>
                        <div className="x_table-action">
                          <button
                            className="x_btn x_btn-primary x_btn-sm"
                            onClick={() => handleViewDetails(order.id)}
                            title="View Details"
                          >
                            <FiEye size={14} />
                          </button>
                          <button
                            className="x_btn x_btn-success x_btn-sm"
                            onClick={() => handleTrackOrder(order.id)}
                            title="Track Order"
                          >
                            <FiTruck size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="x_pagination">
        <a className="x_pagination-item x_active" href="#1">
          1
        </a>
        <a className="x_pagination-item" href="#2">
          2
        </a>
        <a className="x_pagination-item" href="#3">
          3
        </a>
        <span style={{ padding: "8px 12px" }}>...</span>
        <a className="x_pagination-item" href="#10">
          10
        </a>
      </div>
    </div>
  );
}

export default Orders;
