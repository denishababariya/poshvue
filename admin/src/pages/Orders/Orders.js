import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiEye, FiTruck } from "react-icons/fi";
import client from "../../api/client";

function Orders() {
  const navigate = useNavigate();
  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const [editOrderId, setEditOrderId] = useState(null);
  
  /* ================= Fetch Orders ================= */
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async (status = "", date = "") => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams();
      if (status) params.append('status', status.toLowerCase());
      
      const response = await client.get(`/commerce/orders?${params.toString()}`);
      
      let orders = response.data.items || [];
      
      // Filter by date if provided
      if (date) {
        orders = orders.filter(order => {
          const orderDate = new Date(order.createdAt).toISOString().split('T')[0];
          return orderDate === date;
        });
      }
      
      setOrdersData(orders);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusFilterChange = (newStatus) => {
    setStatusFilter(newStatus);
    fetchOrders(newStatus, dateFilter);
  };

  const handleDateFilterChange = (newDate) => {
    setDateFilter(newDate);
    fetchOrders(statusFilter, newDate);
  };

  /* ================= Pagination Logic ================= */
  const ORDERS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(ordersData.length / ORDERS_PER_PAGE);

  const startIndex = (currentPage - 1) * ORDERS_PER_PAGE;
  const endIndex = startIndex + ORDERS_PER_PAGE;

  const currentOrders = ordersData.slice(startIndex, endIndex);


  /* =================================================== */

  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase() || '';
    const colors = {
      delivered: { bg: "#d4edda", text: "#155724" },
      paid: { bg: "#d4edda", text: "#155724" },
      shipped: { bg: "#d1ecf1", text: "#0c5460" },
      pending: { bg: "#f8d7da", text: "#721c24" },
      cancelled: { bg: "#f5c6cb", text: "#721c24" },
    };
    return colors[statusLower] || { bg: "#e2e3e5", text: "#383d41" };
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await client.put(`/commerce/orders/${orderId}/status`, { status: newStatus });
      setOrdersData(ordersData.map(order => 
        order._id === orderId ? { ...order, status: newStatus } : order
      ));
      setEditOrderId(null);
    } catch (err) {
      console.error('Failed to update order status:', err);
      alert('Failed to update order status');
    }
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
              <select 
                className="x_form-select"
                value={statusFilter}
                onChange={(e) => handleStatusFilterChange(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="x_form-group">
              <label className="x_form-label">Date Range</label>
              <input 
                type="date" 
                className="x_form-control"
                value={dateFilter}
                onChange={(e) => handleDateFilterChange(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}


      <div className="x_card">
        <div className="x_card-body">
          {loading && <p style={{ textAlign: "center", color: "#666" }}>Loading orders...</p>}
          {error && <p style={{ textAlign: "center", color: "#d32f2f" }}>{error}</p>}
          
          {!loading && ordersData.length === 0 && (
            <p style={{ textAlign: "center", color: "#666" }}>No orders found</p>
          )}

          {!loading && ordersData.length > 0 && (
            <div className="x_table-wrapper">
              <table className="x_data-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Email</th>
                    <th>Total</th>
                    <th>Items</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th style={{ textAlign: "center" }}>Actions</th>
                  </tr>
                </thead>

                <tbody className="text-nowrap">
                  {currentOrders.map((order) => {
                    const statusColor = getStatusColor(order.status);
                    const orderDate = new Date(order.createdAt).toLocaleDateString();
                    
                    return (
                      <React.Fragment key={order._id}>
                        <tr>
                          <td>{order._id}</td>
                          <td>{order.customerName}</td>
                          <td>{order.customerEmail}</td>
                          <td>₹{order.total}</td>
                          <td>{order.items?.length || 0}</td>
                          <td>
                            {editOrderId === order._id ? (
                              <select
                                value={order.status}
                                onChange={(e) =>
                                  handleStatusChange(order._id, e.target.value)
                                }
                                className="x_form-select"
                                style={{ fontSize: "12px", padding: "4px" }}
                              >
                                <option value="pending">Pending</option>
                                <option value="paid">Paid</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            ) : (
                              <span
                                style={{
                                  background: statusColor.bg,
                                  color: statusColor.text,
                                  padding: "4px 8px",
                                  borderRadius: "4px",
                                  fontSize: "12px",
                                  fontWeight: 600,
                                  textTransform: "capitalize"
                                }}
                              >
                                {order.status}
                              </span>
                            )}
                          </td>

                          <td>{orderDate}</td>
                          <td style={{ textAlign: "center" }}>
                            <button
                              className="x_btn x_btn x_btn-sm me-2"
                              style={{ backgroundColor: "#fff3cd", color: "#856404" }}
                              onClick={() => setEditOrderId(order._id)}
                              title="Edit status"
                            >
                              <FiEdit />
                            </button>
                            <button
                              className="x_btn x_btn x_btn-sm"
                              style={{ backgroundColor: "#d1ecf1", color: "#0c5460" }}
                              onClick={() => setExpandedOrderId(expandedOrderId === order._id ? null : order._id)}
                              title="View details"
                            >
                              <FiEye />
                            </button>
                          </td>
                        </tr>
                        
                        {/* Order Items Expansion */}
                        {expandedOrderId === order._id && (
                          <tr style={{ backgroundColor: "#f9f9f9" }}>
                            <td colSpan="8">
                              <div style={{ padding: "15px 20px" }}>
                                <h5 style={{ marginTop: 0, marginBottom: "10px" }}>Order Items:</h5>
                                <div style={{ marginBottom: "10px" }}>
                                  {order.items?.map((item, idx) => (
                                    <div key={idx} style={{ 
                                      padding: "8px", 
                                      backgroundColor: "#fff", 
                                      marginBottom: "8px",
                                      borderLeft: "3px solid #007bff",
                                      borderRadius: "4px"
                                    }}>
                                      <p style={{ margin: "5px 0" }}><strong>{item.title}</strong></p>
                                      <p style={{ margin: "5px 0", fontSize: "13px", color: "#666" }}>
                                        Price: ₹{item.price} | Qty: {item.quantity} | Size: {item.size} | Color: {item.color}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                                <hr />
                                <p style={{ margin: "10px 0" }}><strong>Shipping Address:</strong> {order.address}</p>
                                <p style={{ margin: "10px 0" }}><strong>Phone:</strong> {order.customerPhone}</p>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ================= Pagination ================= */}
        {
          ordersData.length > ORDERS_PER_PAGE && (
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
          )
        }

        {/* ============================================== */}
      </div >
    </div >
  );
}

export default Orders;
