import React, { useState, useEffect } from "react";
import Home from "./components/Home";
import Browse from "./components/Browse";
import Layout from "./components/Layout";
import Movie from "./components/Movie";
import Trending from "./components/Trending";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BingeList from "./components/BingeList";

function App() {

  const [list, setList] = useState([]);

  function addToList(movie) {
    setList([...list, {...movie}])
  }

  function removeItem(movie){
    setList(list.filter(item => (item.imdbID || item.id) !== (movie.imdbID || movie.id)))
  }

  useEffect(() => {
    console.log(list);
  }, [list])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/trending" element={<Trending /> } />
          <Route path="/bingelist" element={<BingeList list={list} removeItem={removeItem}/>} />
        </Route>
          <Route path="/movie/:id" element={<Movie addToList={addToList}/>} />
      </Routes>
    </Router>
  );
}

export default App;
