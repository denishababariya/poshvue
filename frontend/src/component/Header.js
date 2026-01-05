import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronDown,
  Video,
  Phone,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [selectedState, setSelectedState] = useState("India");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  /* ================= MENU ITEMS ================= */


  /* ================= COUNTRY ================= */
  const states = ["India", "USA", "UK", "Australia", "Canada", "UAE"];

  const stateFlags = {
    India: "https://flagcdn.com/w40/in.png",
    USA: "https://flagcdn.com/w40/us.png",
    UK: "https://flagcdn.com/w40/gb.png",
    Australia: "https://flagcdn.com/w40/au.png",
    Canada: "https://flagcdn.com/w40/ca.png",
    UAE: "https://flagcdn.com/w40/ae.png",
  };

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/ShopPage" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Sale", path: "/SalePage" },

  ];


  /* ================= Outside Click Close ================= */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowStateDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ================= Sticky Header ================= */
  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ================= Styles ================= */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

        body { font-family: 'Inter', sans-serif; margin: 0; }

        .d_top-bar {
          background: #000;
          color: #fff;
          padding: 8px 15px;
          font-size: 12px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          z-index: 1001;
        }

        .d_top-text { padding: 0 40px; }

        .d_state-selector-wrapper {
          position: absolute;
          right: 15px;
        }

        .d_state-selector {
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          padding: 4px 8px;
          border-radius: 4px;
        }

        .z_user_dropdown {
  position: relative;
  display: inline-block;
}

.z_user_dropdown_menu {
  position: absolute;
  top: 40px; /* below icon */
  right: 0;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.15);
  min-width: 140px;
  z-index: 1000;
  animation: z_dropdown_fade 0.3s ease-in-out;
}

.z_user_dropdown_menu ul {
  list-style: none;
  margin: 0;
  padding: 10px 0;
}

.z_user_dropdown_menu li {
  padding: 10px 20px;
  cursor: pointer;
  transition: 0.2s;
  font-size: 14px;
}

.z_user_dropdown_menu li:hover {
  background: #f5f5f5;
}

@keyframes z_dropdown_fade {
  0% { opacity: 0; transform: translateY(-10px); }
  100% { opacity: 1; transform: translateY(0); }
}

        .d_state-selector:hover {
          background: rgba(255,255,255,0.1);
        }

        .d_dropdown-menu {
          position: absolute;
          top: 100%;
          right: 0;
          background: #fff;
          color: #000;
          min-width: 140px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          border-radius: 4px;
          margin-top: 6px;
          list-style: none;
          padding: 6px 0;
          display: none;
        }

        .d_dropdown-menu.d_show { display: block; }

        .d_dropdown-item {
          padding: 8px 14px;
          font-size: 13px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .d_dropdown-item:hover { background: #f5f5f5; }

        .d_main-header {
          background: #fff;
          padding: 10px 20px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          border-bottom: 1px solid #eee;
          transition: 0.3s;
          z-index: 1000;
        }

        .d_main-header.d_sticky {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
        }

        .d_left-section {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .d_nav {
          display: flex;
          gap: 35px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .d_nav-link {
          color: #333;
          text-decoration: none;
          font-size: 14px;
          cursor: pointer;
          letter-spacing: 2px;
        }

        .d_search-container {
          flex: 1;
          max-width: 300px;
          margin: 0 15px;
          position: relative;
        }

        .d_search-input {
          width: 100%;
          padding: 8px 10px 8px 34px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .d_search-icon {
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
        }

        .d_icon-group {
          display: flex;
          gap: 12px;
        }

        .d_icon-btn {
          background: none;
          border: none;
          cursor: pointer;
        }

        .d_mobile-toggle { display: none; }

        .d_mobile-sidebar {
          position: fixed;
          top: 0;
          left: -100%;
          width: 280px;
          height: 100%;
          background: #fff;
          padding: 20px;
          transition: 0.3s;
          z-index: 2000;
        }

        .d_mobile-sidebar.d_active { left: 0; }

        .d_overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          display: none;
          z-index: 1999;
        }

        .d_overlay.d_active { display: block; }

        @media (max-width: 1100px) {
          .d_nav { display: none; }
          .d_mobile-toggle { display: block; }
        }

        @media (max-width: 768px) {
          .d_search-container { display: none; }
        }
      `}</style>

      {/* ================= TOP BAR ================= */}
      <div className="d_top-bar">
        <div className="d_top-text">
          Register & Unlock EXTRA 10% Off on Your First Purchase
        </div>

        <div className="d_state-selector-wrapper" ref={dropdownRef}>
          <div
            className="d_state-selector"
            onClick={() => setShowStateDropdown(!showStateDropdown)}
          >
            <img
              src={stateFlags[selectedState]}
              width="16"
              alt={selectedState}
            />
            <span>{selectedState}</span>
            <ChevronDown
              size={12}
              style={{
                transform: showStateDropdown
                  ? "rotate(180deg)"
                  : "rotate(0deg)",
              }}
            />
          </div>

          <ul
            className={`d_dropdown-menu ${showStateDropdown ? "d_show" : ""
              }`}
          >
            {states.map((state) => (
              <li
                key={state}
                className="d_dropdown-item"
                onClick={() => {
                  setSelectedState(state);
                  setShowStateDropdown(false);
                }}
              >
                <img src={stateFlags[state]} width="16" alt={state} />
                {state}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ================= HEADER ================= */}
      <header className={`d_main-header ${isSticky ? "d_sticky" : ""}`}>
        <div className="d_left-section">
          <button
            className="d_mobile-toggle"
            onClick={() => setShowMobileMenu(true)}
          >
            <Menu size={24} />
          </button>
          <strong style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
            LOGO
          </strong>
        </div>

        {/* ===== Desktop Menu ===== */}
        <ul className="d_nav">
          {menuItems.map((item) => (
            <li key={item.name}>
              <span
                className="d_nav-link"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(item.path)}
              >
                {item.name}
              </span>
            </li>
          ))}
        </ul>

        <div className="d_search-container">
          <Search className="d_search-icon" size={16} />
          <input
            className="d_search-input"
            placeholder="What are you looking for?"
          />
        </div>

        <div className="d_icon-group">
          <button className="d_icon-btn">
            <Phone size={20} />
          </button>
          <button className="d_icon-btn">
            <Video size={20} />
          </button>
          <div className="z_user_dropdown" ref={dropdownRef}>
            <button
              className="d_icon-btn"
              onClick={() => setOpen((prev) => !prev)}
            >
              <User size={20} />
            </button>

            {open && (
              <div className="z_user_dropdown_menu">
                <ul>
                  <li onClick={() => { navigate("/Register"); setOpen(false); }}>Register</li>
                  <li onClick={() => { navigate("/Profile"); setOpen(false); }}>Profile</li>
                  <li onClick={() => { navigate("/Logout"); setOpen(false); }}>Logout</li>
                </ul>
              </div>
            )}
          </div>
          <button className="d_icon-btn" onClick={() => navigate("/wishlist")}>
            <Heart size={20} />
          </button>
          <button
            className="d_icon-btn"
            onClick={() => navigate("/cart")}
          >
            <ShoppingBag size={20} />
          </button>
        </div>
      </header>

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`d_overlay ${showMobileMenu ? "d_active" : ""}`}
        onClick={() => setShowMobileMenu(false)}
      />

      <div className={`d_mobile-sidebar ${showMobileMenu ? "d_active" : ""}`}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <strong>MENU</strong>
          <X size={24} onClick={() => setShowMobileMenu(false)} />
        </div>

        <ul style={{ listStyle: "none", padding: 0, marginTop: 20 }}>
          {menuItems.map((item) => (
            <li
              key={item.name}
              style={{
                padding: "12px 0",
                borderBottom: "1px solid #eee",
                cursor: "pointer",
              }}
              onClick={() => {
                navigate(item.path);
                setShowMobileMenu(false);
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>

      {isSticky && <div style={{ height: 70 }} />}
    </>
  );
};

export default Header;
