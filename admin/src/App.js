import React, { useState } from "react";
import "./styles/x_admin.css";
import "./styles/x_table.css";
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
import Reviews from "./pages/Reviews/Reviews";
import Feedback from "./pages/Feedback/Feedback";
import Complaints from "./pages/Complaints/Complaints";
import Contact from "./pages/Contact/Contact";
import Subscribe from "./pages/Subscribe/Subscribe";
import Wholesale from "./pages/Wholesale/Wholesale";
import Blog from "./pages/Blog/Blog";
import Story from "./pages/Story/Story";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Delete from "./components/Delete";

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

        <Route path="/layout" element={<Layout />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:orderId/track" element={<TrackOrder />} />
        <Route path="/coupons" element={<Coupons />} />
        <Route path="/users" element={<Users />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/complaints" element={<Complaints />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/wholesale" element={<Wholesale />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/story" element={<Story />} />
        <Route path="/delete" element={<Delete />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
