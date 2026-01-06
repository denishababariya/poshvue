import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  FiHome,
  FiTag,
  FiPackage,
  FiShoppingCart,
  FiPercent,
  FiUsers,
  FiBarChart2,
  FiMenu,
  FiX,
  FiLogOut,
} from "react-icons/fi";

function Layout({ onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "auto";
  }, [sidebarOpen]);


  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const menuItems = [
    { path: "/", label: "Dashboard", icon: FiHome },
    { path: "/categories", label: "Categories", icon: FiTag },
    { path: "/products", label: "Products", icon: FiPackage },
    { path: "/orders", label: "Orders", icon: FiShoppingCart },
    { path: "/coupons", label: "Coupons", icon: FiPercent },
    { path: "/users", label: "Users", icon: FiUsers },
    { path: "/reports", label: "Reports", icon: FiBarChart2 },
  ];

  return (
    <div className="x_admin-container">
      {/* Header */}
      <header className="x_header">
        <div className="x_header-left">
          <button
            className="x_sidebar-toggle bg-transparent border-0"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <FiMenu size={24} />
          </button>
          <h1 className="x_header-title">PoshVue Admin</h1>
        </div>
        <div className="x_header-right">
          <div className="x_user-info">
            <div className="x_user-avatar">A</div>
            <span className="x_user-name">Admin</span>
          </div>
          <button
            className="x_btn x_btn-secondary x_btn-sm"
            onClick={handleLogout}
            title="Logout"
          >
            <FiLogOut size={16} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="x_admin-wrapper">
        {/* Sidebar */}
        <aside className={`x_sidebar ${sidebarOpen ? "x_active" : ""}`}>
          <div className="x_sidebar-header d-flex justify-content-between align-items-center">
            <h2>Menu</h2>
            {/* Close Button (ONLY in sidebar) */}
            <button
              className="x_sidebar-close border-0 bg-transparent text-white"
              onClick={() => setSidebarOpen(false)}
            >
              <FiX size={22} />
            </button>
          </div>
          <nav>
            <ul className="x_nav-menu">
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <li
                    key={item.path}
                    className={`x_nav-item ${isActive(item.path) ? "x_active" : ""}`}
                  >
                    <a
                      href={item.path}
                      className="x_nav-link"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(item.path);
                        setSidebarOpen(false);
                      }}
                    >
                      <IconComponent size={18} />
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="x_main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
