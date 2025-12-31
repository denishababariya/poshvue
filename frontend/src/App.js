// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./container/Main";
import Header from "./component/Header";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/header" element={<Header />} />
    </Routes>
  );
}

export default App;
