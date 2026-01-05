import React, { useState } from "react";
import { FiMail, FiPhone } from "react-icons/fi";

function Users() {
  const [users] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+1-234-567-8900",
      joinDate: "2023-10-15",
      orders: 5,
      totalSpent: "$450.00",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1-234-567-8901",
      joinDate: "2023-09-20",
      orders: 12,
      totalSpent: "$1,250.50",
      status: "Active",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "+1-234-567-8902",
      joinDate: "2023-08-10",
      orders: 3,
      totalSpent: "$285.00",
      status: "Active",
    },
    {
      id: 4,
      name: "Sarah Williams",
      email: "sarah@example.com",
      phone: "+1-234-567-8903",
      joinDate: "2023-07-05",
      orders: 8,
      totalSpent: "$890.75",
      status: "Inactive",
    },
    {
      id: 5,
      name: "Tom Brown",
      email: "tom@example.com",
      phone: "+1-234-567-8904",
      joinDate: "2023-06-12",
      orders: 15,
      totalSpent: "$2,150.00",
      status: "Active",
    },
    {
      id: 6,
      name: "Emma Davis",
      email: "emma@example.com",
      phone: "+1-234-567-8905",
      joinDate: "2023-05-20",
      orders: 7,
      totalSpent: "$650.25",
      status: "Active",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All" || user.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 700, margin: "0 0 10px 0" }}>Users</h1>
        <p style={{ color: "#7f8c8d", margin: 0 }}>Manage registered users and view their activities</p>
      </div>

      {/* Filters */}
      <div className="x_card" style={{ marginBottom: "20px" }}>
        <div className="x_card-body">
          <div className="x_grid x_grid-2">
            <div className="x_form-group">
              <label className="x_form-label">Search by Name or Email</label>
              <input
                type="text"
                className="x_form-control"
                placeholder="Enter name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="x_form-group">
              <label className="x_form-label">Filter by Status</label>
              <select
                className="x_form-select"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="All">All Users</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="x_card">
        <div className="x_card-body">
          <div className="x_table-wrapper">
            <table className="x_table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Join Date</th>
                  <th>Orders</th>
                  <th>Total Spent</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td style={{ fontWeight: 600 }}>{user.name}</td>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <FiMail size={14} style={{ color: "#7f8c8d" }} />
                          {user.email}
                        </div>
                      </td>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <FiPhone size={14} style={{ color: "#7f8c8d" }} />
                          {user.phone}
                        </div>
                      </td>
                      <td>{user.joinDate}</td>
                      <td>{user.orders}</td>
                      <td style={{ fontWeight: 600 }}>{user.totalSpent}</td>
                      <td>
                        <span
                          style={{
                            padding: "4px 8px",
                            borderRadius: "4px",
                            fontSize: "12px",
                            fontWeight: 600,
                            backgroundColor: user.status === "Active" ? "#d4edda" : "#e2e3e5",
                            color: user.status === "Active" ? "#155724" : "#383d41",
                          }}
                        >
                          {user.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" style={{ textAlign: "center", padding: "20px", color: "#7f8c8d" }}>
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* User Statistics */}
      <div className="x_grid x_grid-3" style={{ marginTop: "20px" }}>
        <div className="x_stat-card">
          <div className="x_stat-label">Total Users</div>
          <div className="x_stat-value">{users.length}</div>
          <div className="x_stat-change">Registered users</div>
        </div>
        <div className="x_stat-card" style={{ borderLeftColor: "#27ae60" }}>
          <div className="x_stat-label">Active Users</div>
          <div className="x_stat-value" style={{ color: "#27ae60" }}>
            {users.filter((u) => u.status === "Active").length}
          </div>
          <div className="x_stat-change">Currently active</div>
        </div>
        <div className="x_stat-card" style={{ borderLeftColor: "#f39c12" }}>
          <div className="x_stat-label">Total Revenue</div>
          <div className="x_stat-value" style={{ color: "#f39c12" }}>
            ${users
              .reduce((sum, u) => sum + parseFloat(u.totalSpent.replace(/[$,]/g, "")), 0)
              .toFixed(2)}
          </div>
          <div className="x_stat-change">From all users</div>
        </div>
      </div>
    </div>
  );
}

export default Users;
