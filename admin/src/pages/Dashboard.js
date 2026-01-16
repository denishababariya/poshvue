import React, { useState } from "react";
import { FiTrendingUp, FiBox, FiDollarSign, FiUsers } from "react-icons/fi";
import { FiShoppingCart } from "react-icons/fi";

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
      customer: "Eleven",
      amount: "$150.00",
      status: "Delivered",
      date: "2024-01-02",
    },
    {
      id: "ORD-002",
      customer: "Mike Wheeler",
      amount: "$280.50",
      status: "Processing",
      date: "2024-01-02",
    },
    {
      id: "ORD-003",
      customer: "Dustin Henderson",
      amount: "$95.00",
      status: "Pending",
      date: "2024-01-01",
    },
    {
      id: "ORD-004",
      customer: "Lucas Sinclair",
      amount: "$320.00",
      status: "Delivered",
      date: "2024-01-01",
    },
    {
      id: "ORD-005",
      customer: "Max Mayfield",
      amount: "$180.75",
      status: "Shipped",
      date: "2023-12-31",
    },
  ]);

  const [topProducts] = useState([
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
    {
      id: 2,
      name: "Smart Watch",
      images: [
        "https://flagcdn.com/w40/us.png",
        "https://flagcdn.com/w40/gb.png",
      ],
      colors: ["black", "blue"],
      category: "Wearables",
      price: 129.99,
      discountPercent: 10,
      salePrice: 116.99,
      rating: 4.3,
      description: "Smart fitness tracking watch",
      fabric: "Silicone Strap",
      manufacturer: "WearTech",
      occasion: "Sports",
      washCare: "N/A",
      productType: "Smart Watch",
      work: "Heart Rate Monitoring",
      stock: 72,
      status: "Active",
    },
    {
      id: 3,
      name: "USB-C Cable",
      images: [
        "https://flagcdn.com/w40/de.png",
      ],
      colors: ["white"],
      category: "Accessories",
      price: 9.99,
      discountPercent: 5,
      salePrice: 9.49,
      rating: 4.1,
      description: "Fast charging USB-C cable",
      fabric: "Rubber",
      manufacturer: "CablePro",
      occasion: "Daily Use",
      washCare: "N/A",
      productType: "Cable",
      work: "Fast Charging",
      stock: 200,
      status: "Active",
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

  return (
    <div>
      <div style={{ marginBottom: "30px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 700, margin: "0 0 20px 0" }}>
          Dashboard
        </h1>
      </div>

      {/* Stats Cards (Bootstrap Grid) */}
      <div className="row g-4 mb-4">
        {/* Total Orders */}
        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
          <div className="x_stat-card h-100">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <div className="x_stat-label">Total Orders</div>
                <div className="x_stat-value">{stats.totalOrders}</div>
                <div className="x_stat-change">
                  ↑ {stats.orderChange}% from last month
                </div>
              </div>
              <FiShoppingCart size={32} style={{ color: "#336a63", opacity: 0.3 }} />
            </div>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
          <div className="x_stat-card h-100" style={{ borderLeftColor: "#27ae60" }}>
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <div className="x_stat-label">Total Revenue</div>
                <div className="x_stat-value" style={{ color: "#27ae60" }}>
                  {stats.totalRevenue}
                </div>
                <div className="x_stat-change">
                  ↑ {stats.revenueChange}% from last month
                </div>
              </div>
              <FiDollarSign size={32} style={{ color: "#27ae60", opacity: 0.3 }} />
            </div>
          </div>
        </div>

        {/* Total Products */}
        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
          <div className="x_stat-card h-100" style={{ borderLeftColor: "#f39c12" }}>
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <div className="x_stat-label">Total Products</div>
                <div className="x_stat-value" style={{ color: "#f39c12" }}>
                  {stats.totalProducts}
                </div>
                <div className="x_stat-change">
                  ↑ {stats.productChange}% from last month
                </div>
              </div>
              <FiBox size={32} style={{ color: "#f39c12", opacity: 0.3 }} />
            </div>
          </div>
        </div>

        {/* Total Users */}
        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
          <div className="x_stat-card h-100" style={{ borderLeftColor: "#e74c3c" }}>
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <div className="x_stat-label">Total Users</div>
                <div className="x_stat-value" style={{ color: "#e74c3c" }}>
                  {stats.totalUsers}
                </div>
                <div className="x_stat-change">
                  ↑ {stats.userChange}% from last month
                </div>
              </div>
              <FiUsers size={32} style={{ color: "#e74c3c", opacity: 0.3 }} />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders & Top Products */}
      <section>
        {/* Table Section */}
        <div className="x_card ">
          <div className="x_card-header">
            <h2>Recent Orders</h2>
          </div>
          <div className="x_card-body">
            <div className="x_table-wrapper">
              <table className="x_data-table">
                <thead>
                  <tr>
                    <th>customer_id</th>
                    <th>customer</th>
                    <th>amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((product) => {
                    const statusColor = getStatusColor(product.status);
                    return (
                      <tr key={product.id}>
                        <td>{product.id}</td>
                        {/* Category */}
                        <td>{product.customer}</td>

                        {/* Price */}
                        <td>
                          <div style={{ lineHeight: "1.2" }}>
                            {product.amount}
                          </div>
                        </td>
                        {/* Status */}
                        <td>
                          <span
                            style={{
                              padding: "4px 10px",
                              borderRadius: "20px",
                              fontSize: "12px",
                              fontWeight: "500",
                              background: statusColor.bg,
                              color: statusColor.text
                            }}
                          >
                            {product.status}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="x_card ">
          <div className="x_card-header">
            <h2>Top Products</h2>
          </div>
          <div className="x_card-body">
            <div className="x_table-wrapper">
              <table className="x_data-table">
                <thead>
                  <tr>
                    <th>image</th>
                    <th>name</th>
                    <th>category</th>
                    <th>sales</th>
                    <th>revenue</th>
                    <th>status</th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.map((product) => (
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
                            style={{
                              width: "45px",
                              height: "45px",
                              borderRadius: "6px",
                              objectFit: "cover",
                              border: "1px solid #eee",
                            }}
                          />
                        </div>
                      </td>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td>${product.salePrice}</td>
                      <td>{product.stock}</td>
                      <td>
                        <span
                          className={product.status === "Active" ? "text-success" : "text-danger"}>
                          {product.status}
                        </span>
                      </td>
                    </tr>
                  )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


export default Dashboard;
