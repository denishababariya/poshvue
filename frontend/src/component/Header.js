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
import client from "../api/client";
import { useCurrency } from "../context/CurrencyContext";

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("userToken"));
  const dropdownRef = useRef(null);
  const userDropdownRef = useRef(null);
  const navigate = useNavigate();
  const { selectedCountry, countries, selectCountry } = useCurrency();

  /* ================= MENU ITEMS ================= */

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/ShopPage" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/ContactUs" },
    { name: "Sale", path: "/SalePage" },

  ];


  /* ================= Outside Click Close ================= */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        console.log("🖱️ Clicked outside, closing dropdown");
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
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        console.log("🖱️ Clicked outside user dropdown");
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

  useEffect(() => {
    const syncAuth = () => setIsLoggedIn(!!localStorage.getItem("userToken"));
    window.addEventListener("storage", syncAuth);
    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  const handleLogout = async () => {
    try {
      await client.post("/auth/logout");
    } catch (err) {
      // ignore errors; proceed to clear client state
    }
    localStorage.removeItem("userToken");
    localStorage.removeItem("userInfo");
    setIsLoggedIn(false);
    setOpen(false);
    navigate("/Register");
  };

  return (
    <>
      {/* ================= Styles ================= */}
      <style>{`

        body {  margin: 0; }

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
          z-index: 1000;
        }

        .d_dropdown-menu.d_show { 
          display: block; 
          pointer-events: auto;
        }

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
          {selectedCountry ? (
            <>
              <div
                className="d_state-selector"
                onClick={() => {
                  console.log("🖱️ State selector clicked");
                  setShowStateDropdown(!showStateDropdown);
                }}
              >
                <img
                  src={selectedCountry.flagUrl}
                  width="16"
                  alt={selectedCountry.name}
                />
                <span>{selectedCountry.name}</span>
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
                style={{ display: showStateDropdown ? 'block' : 'none' }}
              >
                {countries
                  .filter((c) => c.active !== false)
                  .map((country) => (
                    <li
                      key={country._id || country.code}
                      className="d_dropdown-item"
                      onClick={async (e) => {
                        // User country selection - sets as default in backend and updates local state
                        e.preventDefault();
                        e.stopPropagation();
                        console.log("🖱️ Country clicked:", country);
                        console.log("🖱️ About to call selectCountry with country:", country);
                        try {
                          await selectCountry(country);
                          console.log("✅ selectCountry completed successfully");
                          setShowStateDropdown(false);
                        } catch (error) {
                          console.error("❌ Error in onClick handler:", error);
                          setShowStateDropdown(false);
                        }
                      }}
                    >
                      <img src={country.flagUrl} width="16" alt={country.name} />
                      {country.name} ({country.currencySymbol})
                    </li>
                  ))}
              </ul>
            </>
          ) : (
            <div>Loading countries...</div>
          )}
        </div>
      </div>

      {/* ================= HEADER ================= */}
      <header className={`d_main-header ${isSticky ? "d_sticky" : ""}`}>
        <div className="d_left-section">
          <button
            className="d_mobile-toggle border-0 bg-transparent"
            onClick={() => setShowMobileMenu(true)}
          >
            <Menu size={20} />
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
          <div className="z_user_dropdown" ref={userDropdownRef}>
            <button
              className="d_icon-btn"
              onClick={() => setOpen((prev) => !prev)}
            >
              <User size={20} />
            </button>

            {open && (
              <div className="z_user_dropdown_menu">
                <ul>
                  {!isLoggedIn && (
                    <li onClick={() => { navigate("/Register"); setOpen(false); }}>Register</li>
                  )}
                  {isLoggedIn && (
                    <>
                      <li onClick={() => { navigate("/Profile"); setOpen(false); }}>Profile</li>
                      <li onClick={handleLogout}>Logout</li>
                    </>
                  )}
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
