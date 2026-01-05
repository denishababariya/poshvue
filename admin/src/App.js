import React, { useState } from "react";
import "./styles/x_admin.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories/Categories";
import Products from "./pages/Products/Products";
import Orders from "./pages/Orders/Orders";
import TrackOrder from "./pages/Orders/TrackOrder";
import Coupons from "./pages/Coupons/Coupons";
import Users from "./pages/Users/Users";
import Reports from "./pages/Reports/Reports";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("adminToken") ? true : false
  );

  const handleLogin = (token) => {
    localStorage.setItem("adminToken", token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsAuthenticated(false);
  };

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={handleLogin} />} />

      <Route
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Layout onLogout={handleLogout} />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:orderId/track" element={<TrackOrder />} />
        <Route path="/coupons" element={<Coupons />} />
        <Route path="/users" element={<Users />} />
        <Route path="/reports" element={<Reports />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
