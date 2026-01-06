import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiTruck } from "react-icons/fi";

function Orders() {
  const navigate = useNavigate();
  const ordersData = [
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
    {
      id: "ORD-007",
      customer: "Alex Carter",
      amount: "$199.99",
      status: "Delivered",
      date: "2023-12-29",
      items: 2,
    },
    {
      id: "ORD-008",
      customer: "Liam Scott",
      amount: "$89.99",
      status: "Pending",
      date: "2023-12-28",
      items: 1,
    },
    {
      id: "ORD-009",
      customer: "Olivia Green",
      amount: "$560.00",
      status: "Shipped",
      date: "2023-12-27",
      items: 6,
    },
    {
      id: "ORD-010",
      customer: "Noah Hill",
      amount: "$120.00",
      status: "Delivered",
      date: "2023-12-26",
      items: 2,
    },
    {
      id: "ORD-011",
      customer: "William King",
      amount: "$75.00",
      status: "Processing",
      date: "2023-12-25",
      items: 1,
    },
  ];
  /* ================= Pagination Logic ================= */
  const ORDERS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(ordersData.length / ORDERS_PER_PAGE);

  const startIndex = (currentPage - 1) * ORDERS_PER_PAGE;
  const endIndex = startIndex + ORDERS_PER_PAGE;

  const currentOrders = ordersData.slice(startIndex, endIndex);


  /* =================================================== */

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
          <div className="x_table-wrapper">
            <table className="x_data-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Items</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th style={{ textAlign: "center" }}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {currentOrders.map((order) => {
                  const statusColor = getStatusColor(order.status);
                  return (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.customer}</td>
                      <td>{order.amount}</td>
                      <td>{order.items}</td>
                      <td>
                        <span
                          style={{
                            background: statusColor.bg,
                            color: statusColor.text,
                            padding: "4px 8px",
                            borderRadius: "4px",
                            fontSize: "12px",
                            fontWeight: 600,
                          }}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td>{order.date}</td>
                      <td style={{ textAlign: "center" }}>
                        <button className="x_btn x_btn-primary x_btn-sm me-2">
                          <FiEye />
                        </button>
                        <button
                          className="x_btn x_btn-success x_btn-sm"
                          onClick={() =>
                            navigate(`/orders/${order.id}/track`)
                          }
                        >
                          <FiTruck />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================= Pagination ================= */}
        {ordersData.length > ORDERS_PER_PAGE && (
          <div className="x_pagination">
            {/* First Page */}
            <button
              className={`x_pagination-item ${currentPage === 1 ? "x_active" : ""}`}
              onClick={() => setCurrentPage(1)}
            >
              1
            </button>

            {/* Left dots */}
            {currentPage > 3 && (
              <span className="x_pagination-dots">...</span>
            )}

            {/* Middle Pages */}
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
                  className={`x_pagination-item ${currentPage === page ? "x_active" : ""
                    }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}

            {/* Right dots */}
            {currentPage < totalPages - 2 && (
              <span className="x_pagination-dots">...</span>
            )}

            {/* Last Page */}
            {totalPages > 1 && (
              <button
                className={`x_pagination-item ${currentPage === totalPages ? "x_active" : ""
                  }`}
                onClick={() => setCurrentPage(totalPages)}
              >
                {totalPages}
              </button>
            )}
          </div>
        )}

        {/* ============================================== */}
      </div>
    </div>
  );
}

export default Orders;
