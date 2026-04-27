import React from "react";
import Home from "./components/Home";
import Browse from "./components/Browse";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
<Router>
  <Routes>
<Route path="/" element={<Home/>} />
<Route path="/browse" element={<Browse />} />
</Routes>
</Router>
  );
}

export default App;
