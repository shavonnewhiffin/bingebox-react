import React from "react";
import Home from "./components/Home";
import Browse from "./components/Browse";
import Layout from "./components/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/browse" element={<Browse />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
