import React, { useState } from "react";
import { FiTrendingUp, FiBox, FiDollarSign, FiUsers } from "react-icons/fi";


// Import for shopping cart icon
import { FiShoppingCart } from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.min.css";
// import Chart from "../components/Chart";
// import Sidebar from "../components/Sidebar";
// import Header from "../components/Header";

function Dashboard() {
  const [stats] = useState({
    totalOrders: 1250,
    totalRevenue: "$45,230",
    totalProducts: 342,
    totalUsers: 1890,
    orderChange: 12.5,
    revenueChange: 8.3,
    productChange: 5.2,
    userChange: 15.8,
  });

  const [recentOrders] = useState([
    {
      id: "ORD-001",
      customer: "John Doe",
      amount: "$150.00",
      status: "Delivered",
      date: "2024-01-02",
    },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      amount: "$280.50",
      status: "Processing",
      date: "2024-01-02",
    },
    {
      id: "ORD-003",
      customer: "Mike Johnson",
      amount: "$95.00",
      status: "Pending",
      date: "2024-01-01",
    },
    {
      id: "ORD-004",
      customer: "Sarah Williams",
      amount: "$320.00",
      status: "Delivered",
      date: "2024-01-01",
    },
    {
      id: "ORD-005",
      customer: "Tom Brown",
      amount: "$180.75",
      status: "Shipped",
      date: "2023-12-31",
    },
  ]);

  const [topProducts] = useState([
    { id: 1, name: "Wireless Headphones", sales: 234, revenue: "$8,520" },
    { id: 2, name: "Smart Watch", sales: 189, revenue: "$7,560" },
    { id: 3, name: "USB-C Cable", sales: 456, revenue: "$4,560" },
    { id: 4, name: "Phone Case", sales: 678, revenue: "$3,390" },
    { id: 5, name: "Screen Protector", sales: 890, revenue: "$2,670" },
  ]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Delivered":
        return <span style={{ color: "#27ae60", fontWeight: 600 }}>✓ {status}</span>;
      case "Processing":
        return <span style={{ color: "#f39c12", fontWeight: 600 }}>◐ {status}</span>;
      case "Shipped":
        return <span style={{ color: "#3498db", fontWeight: 600 }}>→ {status}</span>;
      case "Pending":
        return <span style={{ color: "#e74c3c", fontWeight: 600 }}>○ {status}</span>;
      default:
        return status;
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "30px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 700, margin: "0 0 20px 0" }}>
          Dashboard
        </h1>
      </div>

      {/* Stats Cards */}
      <div className="x_grid x_grid-2">
        {/* Total Orders */}
        <div className="x_stat-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div className="x_stat-label">Total Orders</div>
              <div className="x_stat-value">{stats.totalOrders}</div>
              <div className="x_stat-change">↑ {stats.orderChange}% from last month</div>
            </div>
            <FiShoppingCart size={32} style={{ color: "#3498db", opacity: 0.3 }} />
          </div>
        </div>

        {/* Total Revenue */}
        <div className="x_stat-card" style={{ borderLeftColor: "#27ae60" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div className="x_stat-label">Total Revenue</div>
              <div className="x_stat-value" style={{ color: "#27ae60" }}>
                {stats.totalRevenue}
              </div>
              <div className="x_stat-change">↑ {stats.revenueChange}% from last month</div>
            </div>
            <FiDollarSign size={32} style={{ color: "#27ae60", opacity: 0.3 }} />
          </div>
        </div>

        {/* Total Products */}
        <div className="x_stat-card" style={{ borderLeftColor: "#f39c12" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div className="x_stat-label">Total Products</div>
              <div className="x_stat-value" style={{ color: "#f39c12" }}>
                {stats.totalProducts}
              </div>
              <div className="x_stat-change">↑ {stats.productChange}% from last month</div>
            </div>
            <FiBox size={32} style={{ color: "#f39c12", opacity: 0.3 }} />
          </div>
        </div>

        {/* Total Users */}
        <div className="x_stat-card" style={{ borderLeftColor: "#e74c3c" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div className="x_stat-label">Total Users</div>
              <div className="x_stat-value" style={{ color: "#e74c3c" }}>
                {stats.totalUsers}
              </div>
              <div className="x_stat-change">↑ {stats.userChange}% from last month</div>
            </div>
            <FiUsers size={32} style={{ color: "#e74c3c", opacity: 0.3 }} />
          </div>
        </div>
      </div>

      {/* Recent Orders & Top Products */}
      <div className="x_grid x_grid-2" style={{ marginTop: "30px" }}>
        {/* Recent Orders */}
        <div className="x_card">
          <div className="x_card-header">
            <h2>Recent Orders</h2>
          </div>
          <div className="x_card-body">
            <div className="x_table-wrapper">
              <table className="x_table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td style={{ fontWeight: 600 }}>{order.id}</td>
                      <td>{order.customer}</td>
                      <td>{order.amount}</td>
                      <td>{getStatusBadge(order.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="x_card">
          <div className="x_card-header">
            <h2>Top Products</h2>
          </div>
          <div className="x_card-body">
            <div className="x_table-wrapper">
              <table className="x_table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Sales</th>
                    <th>Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.map((product) => (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>{product.sales}</td>
                      <td style={{ fontWeight: 600 }}>{product.revenue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Dashboard;
