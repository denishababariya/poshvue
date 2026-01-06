import React, { useState } from "react";
import { FiMail, FiPhone } from "react-icons/fi";

function Users() {
  /* ===================== USERS DATA ===================== */
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

  /* ===================== FILTERS ===================== */
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "All" || user.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  /* ===================== PAGINATION ===================== */
  const USERS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);

  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const endIndex = startIndex + USERS_PER_PAGE;

  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const getPaginationPages = () => {
    const pages = [];

    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentPage > 2) pages.push("dots-left");

      if (currentPage !== 1 && currentPage !== totalPages)
        pages.push(currentPage);

      if (currentPage < totalPages - 1) pages.push("dots-right");

      pages.push(totalPages);
    }

    return pages;
  };

  /* ===================== UI ===================== */
  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700 }}>Users</h1>
        <p style={{ color: "#7f8c8d" }}>
          Manage registered users and view their activities
        </p>
      </div>

      {/* Filters */}
      <div className="x_card" style={{ marginBottom: 20 }}>
        <div className="x_card-body">
          <div className="x_grid x_grid-2">
            <div className="x_form-group">
              <label className="x_form-label">Search</label>
              <input
                type="text"
                className="x_form-control"
                placeholder="Name or Email"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            <div className="x_form-group">
              <label className="x_form-label">Status</label>
              <select
                className="x_form-select"
                value={filterStatus}
                onChange={(e) => {
                  setFilterStatus(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="All">All</option>
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
            <table className="x_data-table">
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
                {currentUsers.length > 0 ? (
                  currentUsers.map((user) => (
                    <tr key={user.id}>
                      <td style={{ fontWeight: 600 }}>{user.name}</td>
                      <td>
                        <FiMail size={14} /> {user.email}
                      </td>
                      <td>
                        <FiPhone size={14} /> {user.phone}
                      </td>
                      <td>{user.joinDate}</td>
                      <td>{user.orders}</td>
                      <td style={{ fontWeight: 600 }}>{user.totalSpent}</td>
                      <td>
                        <span
                          style={{
                            padding: "4px 8px",
                            borderRadius: 4,
                            fontSize: 12,
                            fontWeight: 600,
                            background:
                              user.status === "Active"
                                ? "#d4edda"
                                : "#e2e3e5",
                            color:
                              user.status === "Active"
                                ? "#155724"
                                : "#383d41",
                          }}
                        >
                          {user.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" style={{ textAlign: "center" }}>
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="x_pagination">
            {getPaginationPages().map((page, index) =>
              page === "dots-left" || page === "dots-right" ? (
                <span key={index} className="x_pagination-dots">
                  ...
                </span>
              ) : (
                <button
                  key={index}
                  className={`x_pagination-item ${
                    currentPage === page ? "x_active" : ""
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;
