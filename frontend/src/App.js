// src/App.js
import React from "react";
import "./styles/z_style.css"
import { Routes, Route } from "react-router-dom";
import Main from "./container/Main";
import Header from "./component/Header";
import HomeSlider from "./component/HomeSlider";
import HomePoster from "./component/HomePoster";
import Register from "./container/Register";
function App() {
  return (
    <Routes>
      <Route path="/Register" element={<Register />} />
      <Route path="/" element={<Main />} />
      <Route path="/header" element={<Header />} />
      <Route path="/HomeSlider" element={<HomeSlider />} />
      <Route path="/HomePoster" element={<HomePoster />} />

    </Routes>
  );
}

export default App;
