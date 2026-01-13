// src/App.js
import React, { useEffect } from "react";
import "./styles/z_style.css"
import { Routes, Route } from "react-router-dom";
import { CurrencyProvider } from "./context/CurrencyContext";
import Main from "./container/Main";
import Header from "./component/Header";
import HeroSlider from "./component/HeroSlider";
import ShopPage from "./component/ShopPage";
import HomeSlider from "./component/HomeSlider";
import HomePoster from "./component/HomePoster";
import Register from "./container/Register";
import Footer from "./component/Footer";
import TermAndConditions from "./component/TermAndConditions";
import Cart from "./container/Cart";
import Checkout from "./container/Checkout";
import AboutUs from "./component/AboutUs";
import ContactUs from "./component/ContactUs";
import OurStory from "./component/OurStory";
import StoreLocator from "./component/StoreLocator";
import PrivacyPolicy from "./component/PrivacyPolicy";
import ReturnPolicy from "./component/ReturnPolicy";
import Wishlist from "./container/Wishlist";
import Profile from "./container/Profile";
import SalePage from "./component/SalePage";
import ProductDetailPage from "./component/ProductDetailPage";
import SimiliarPro from "./component/SimiliarPro";
import Blog from "./component/Blog";
import BlogDetail from "./component/BlogDetail";
import Review from "./component/Review";
import GeneralFeedback from "./component/GeneralFeedback";
import ShippingPolicy from "./component/ShippingPolicy";
import TrackOrder from "./component/TrackOrder";
import Complain from "./container/Complain";
import Wholesale from "./container/Wholesale";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchPage from "./component/Searchpage";
import client from "./api/client";


function App() {
  // Check if logged-in user is admin and redirect
  useEffect(() => {
    const checkUserRole = async () => {
      const token = localStorage.getItem("userToken");
      if (!token) return;

      try {
        // Check user info from localStorage first
        const userInfo = localStorage.getItem("userInfo");
        if (userInfo) {
          const user = JSON.parse(userInfo);
          if (user.role === "admin") {
            // Admin trying to access frontend - redirect to admin panel
            const adminUrl = process.env.REACT_APP_ADMIN_URL || "http://localhost:3001/login";
            window.location.href = adminUrl;
            return;
          }
        }

        // Verify with backend
        const res = await client.get("/auth/me");
        const user = res?.data?.user;
        if (user && user.role === "admin") {
          localStorage.setItem("userInfo", JSON.stringify(user));
          const adminUrl = process.env.REACT_APP_ADMIN_URL || "http://localhost:3001/login";
          window.location.href = adminUrl;
        } else if (user) {
          // Update user info if role is user
          localStorage.setItem("userInfo", JSON.stringify(user));
        }
      } catch (err) {
        // If token is invalid, clear it
        if (err.response && err.response.status === 401) {
          localStorage.removeItem("userToken");
          localStorage.removeItem("userInfo");
        }
      }
    };

    checkUserRole();
  }, []);

  return (
    <CurrencyProvider>
      <div>
        <Header /> {/* Header now appears on every page */}
        <Routes>
        <Route path="/Register" element={<Register />} />
        <Route path="/" element={<Main />} />
        <Route path="/heroslider" element={<HeroSlider />} />
        <Route path="/ShopPage" element={<ShopPage />} />
        <Route path="/SalePage" element={<SalePage />} />
        <Route path="/HomeSlider" element={<HomeSlider />} />
        <Route path="/HomePoster" element={<HomePoster />} />
        <Route path="/TermAndConditions" element={<TermAndConditions />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/OurStory" element={<OurStory />} />
        <Route path="/StoreLocator" element={<StoreLocator />} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/ReturnPolicy" element={<ReturnPolicy />} />
        <Route path="/Wishlist" element={<Wishlist />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/SimiliarPro" element={<SimiliarPro />} />
        <Route path="/Blog" element={<Blog />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/Review" element={<Review />} />
        <Route path="/GeneralFeedback" element={<GeneralFeedback />} />
        <Route path="/ShippingPolicy" element={<ShippingPolicy />} />
        <Route path="/TrackOrder" element={<TrackOrder />} />
        <Route path="/Complain" element={<Complain />} />
        <Route path="/wholesale" element={<Wholesale />} />
        <Route path="/search" element={<SearchPage />} />

      </Routes>
      <Footer></Footer>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />
      </div>
    </CurrencyProvider>
  );
}

export default App;