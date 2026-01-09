import React, { useState } from "react";
import { FiBox, FiDollarSign, FiDownloadCloud, FiShoppingCart, FiUsers } from "react-icons/fi";

function Reports() {
  const [reportData] = useState({
    daily: [
      { date: "2024-01-02", orders: 125, revenue: "$4,250", products: 340, users: 28 },
      { date: "2024-01-01", orders: 118, revenue: "$3,890", products: 338, users: 22 },
      { date: "2023-12-31", orders: 145, revenue: "$5,120", products: 335, users: 35 },
      { date: "2023-12-30", orders: 98, revenue: "$3,450", products: 332, users: 18 },
      { date: "2023-12-29", orders: 132, revenue: "$4,680", products: 330, users: 26 },
    ],
    categoryWise: [
      { category: "Electronics", sales: 450, revenue: "$18,900", percentage: 42 },
      { category: "Accessories", sales: 320, revenue: "$8,960", percentage: 20 },
      { category: "Clothing", sales: 280, revenue: "$7,840", percentage: 18 },
      { category: "Home & Garden", sales: 220, revenue: "$5,500", percentage: 12 },
      { category: "Books", sales: 100, revenue: "#2,800", percentage: 8 },
    ],
  });

  const [stats] = useState({
      totalOrders: 618,
      TotalSales: "$21,390",
      Category: "sarees",
      NewUsers: 11
    });

  const [selectedReport, setSelectedReport] = useState("daily");

  const downloadReport = (format) => {
    alert(`Downloading ${selectedReport} report in ${format} format...`);
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 700, margin: "0 0 10px 0" }}>Reports</h1>
        <p style={{ color: "#7f8c8d", margin: 0 }}>View and analyze sales and business metrics</p>
      </div>
      <div className="row g-4 mb-4">

        {/* Total Orders */}
        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
          <div className="x_stat-card h-100">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <div className="x_stat-label">Total Orders</div>
                <div className="x_stat-value">{stats.totalOrders}</div>               
              </div>
              <FiShoppingCart size={32} style={{ color: "#3b3f2f", opacity: 0.3 }} />
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
                  {stats.TotalSales}
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
                <div className="x_stat-label">New Users</div>
                <div className="x_stat-value" style={{ color: "#f39c12" }}>
                 {stats.NewUsers}
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
                <div className="x_stat-label">Top Category</div>
                <div className="x_stat-value" style={{ color: "#e74c3c" }}>
                  {stats.Category}
                </div>
              </div>
              <FiUsers size={32} style={{ color: "#e74c3c", opacity: 0.3 }} />
            </div>
          </div>
        </div>
      </div>

      {/* Report Selection */}
      <div className="x_card" style={{ marginBottom: "20px" }}>
        <div className="x_card-body" >
          <div style={{ display: "flex", gap: "15px", flexWrap: "wrap"}}>
            <button
              className={`x_btn ${selectedReport === "daily" ? "x_btn-primary" : "x_btn-secondary"}`}
              onClick={() => setSelectedReport("daily")}
            >
              Daily Sales
            </button>
            <button
              className={`x_btn ${selectedReport === "category" ? "x_btn-primary" : "x_btn-secondary"}`}
              onClick={() => setSelectedReport("category")}
            >
              Category Wise
            </button>
          </div>

        </div>
      </div>

      {/* Daily Sales Report */}
      {selectedReport === "daily" && (
        <div className="x_card">
          <div className="x_card-header">
            <h2>Daily Sales Report</h2>
          </div>
          <div className="x_card-body">
            <div className="x_table-wrapper">
              <table className="x_data-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Orders</th>
                    <th>Revenue</th>
                    <th>Products Sold</th>
                    <th>New Users</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.daily.map((item, index) => (
                    <tr key={index}>
                      <td style={{ fontWeight: 600 }}>{item.date}</td>
                      <td>{item.orders}</td>
                      <td style={{ fontWeight: 600, color: "#27ae60" }}>{item.revenue}</td>
                      <td>{item.products}</td>
                      <td>{item.users}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary */}
            {/* <div
              style={{
                marginTop: "20px",
                paddingTop: "20px",
                borderTop: "1px solid #ecf0f1",
              }}
            >
              <div className="x_grid x_grid-4">
                <div>
                  <p style={{ margin: "0 0 5px 0", fontSize: "12px", color: "#7f8c8d" }}>
                    Total Orders
                  </p>
                  <p style={{ margin: 0, fontSize: "18px", fontWeight: 700 }}>618</p>
                </div>
                <div>
                  <p style={{ margin: "0 0 5px 0", fontSize: "12px", color: "#7f8c8d" }}>
                    Total Revenue
                  </p>
                  <p style={{ margin: 0, fontSize: "18px", fontWeight: 700, color: "#27ae60" }}>
                    $21,390
                  </p>
                </div>
                <div>
                  <p style={{ margin: "0 0 5px 0", fontSize: "12px", color: "#7f8c8d" }}>
                    Avg Revenue / Order
                  </p>
                  <p style={{ margin: 0, fontSize: "18px", fontWeight: 700 }}>$34.60</p>
                </div>
                <div>
                  <p style={{ margin: "0 0 5px 0", fontSize: "12px", color: "#7f8c8d" }}>
                    New Users
                  </p>
                  <p style={{ margin: 0, fontSize: "18px", fontWeight: 700 }}>129</p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      )}

      {/* Category Wise Report */}
      {selectedReport === "category" && (
        <div className="x_card">
          <div className="x_card-header">
            <h2>Category Wise Sales Report</h2>
          </div>
          <div className="x_card-body">
            <div className="x_table-wrapper">
              <table className="x_data-table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Sales</th>
                    <th>Revenue</th>
                    <th>% of Total</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.categoryWise.map((item, index) => (
                    <tr key={index}>
                      <td style={{ fontWeight: 600 }}>{item.category}</td>
                      <td>{item.sales}</td>
                      <td style={{ fontWeight: 600, color: "#27ae60" }}>{item.revenue}</td>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <div
                            style={{
                              flex: 1,
                              height: "6px",
                              backgroundColor: "#ecf0f1",
                              borderRadius: "3px",
                              overflow: "hidden",
                            }}
                          >
                            <div
                              style={{
                                height: "100%",
                                width: `${item.percentage}%`,
                                backgroundColor: "#3b3f2f",
                              }}
                            />
                          </div>
                          <span style={{ minWidth: "30px", fontSize: "12px", fontWeight: 600 }}>
                            {item.percentage}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary */}
            {/* <div
              style={{
                marginTop: "20px",
                paddingTop: "20px",
                borderTop: "1px solid #ecf0f1",
              }}
            >
              <div className="x_grid x_grid-3">
                <div>
                  <p style={{ margin: "0 0 5px 0", fontSize: "12px", color: "#7f8c8d" }}>
                    Total Sales
                  </p>
                  <p style={{ margin: 0, fontSize: "18px", fontWeight: 700 }}>1,370</p>
                </div>
                <div>
                  <p style={{ margin: "0 0 5px 0", fontSize: "12px", color: "#7f8c8d" }}>
                    Total Revenue
                  </p>
                  <p style={{ margin: 0, fontSize: "18px", fontWeight: 700, color: "#27ae60" }}>
                    $44,000
                  </p>
                </div>
                <div>
                  <p style={{ margin: "0 0 5px 0", fontSize: "12px", color: "#7f8c8d" }}>
                    Top Category
                  </p>
                  <p style={{ margin: 0, fontSize: "18px", fontWeight: 700 }}>Electronics</p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default Reports;
