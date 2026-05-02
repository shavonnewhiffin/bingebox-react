import React from "react";
import Home from "./components/Home";
import Browse from "./components/Browse";
import Layout from "./components/Layout";
import Movie from "./components/Movie";
import Trending from "./components/Trending";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/#" element={<Trending />} />
        </Route>
          <Route path="movie/:id" element={<Movie />} />
      </Routes>
    </Router>
  );
}

export default App;
