// src/App.js
import React from "react";
import "./styles/z_style.css"
import { Routes, Route } from "react-router-dom";
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
import Wishlist from "./container/Wishlist";
import Profile from "./container/Profile";

function App() {
  return (
    <div>
      <Header /> {/* Header now appears on every page */}
      <Routes>
        <Route path="/Register" element={<Register />} />
        <Route path="/" element={<Main />} />
        <Route path="/heroslider" element={<HeroSlider />} />
        <Route path="/ShopPage" element={<ShopPage />} />
        <Route path="/HomeSlider" element={<HomeSlider />} />
        <Route path="/HomePoster" element={<HomePoster />} />
        <Route path="/TermAndConditions" element={<TermAndConditions />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/Wishlist" element={<Wishlist />} />
        <Route path="/Profile" element={<Profile />} />

      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
