// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./container/Main";
import Header from "./component/Header";
import HeroSlider from "./component/HeroSlider";
import ShopPage from "./component/ShopPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/header" element={<Header />} />
      <Route path="/heroslider" element={<HeroSlider />} />
      <Route path="/ShopPage" element={<ShopPage />} />
    </Routes>
  );
}

export default App;
