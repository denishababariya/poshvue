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
import ContactUs from "./pages/Contact/ContactUs";
import Subscribe from "./pages/Subscribe/Subscribe";
import Wholesale from "./pages/Wholesale/Wholesale";
import Blog from "./pages/Blog/Blog";
import Story from "./pages/Story/Story";
import StoreLocator from "./pages/StoreLocator/StoreLocator";
import Home from "./pages/Home/Home";
import AboutUs from "./pages/AboutUs/AboutUs";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Delete from "./components/Delete";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import ReturnPolicy from "./pages/ReturnPolicy/ReturnPolicy";
import ShippingPolicy from "./pages/ShippingPolicy/ShippingPolicy";
import TermAndConditions from "./pages/TermAndConditions/TermAndConditions";

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
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/wholesale" element={<Wholesale />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/story" element={<Story />} />
        <Route path="/store-locator" element={<StoreLocator />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/delete" element={<Delete />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/return" element={<ReturnPolicy />} />
        <Route path="/shipping" element={<ShippingPolicy />} />
        <Route path="/terms" element={<TermAndConditions />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
