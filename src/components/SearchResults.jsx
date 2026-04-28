import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchResults = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchMovies() {
    try {
      const { data } = await axios.get(
        "https://www.omdbapi.com/?&apikey=d051fbc2&s=fast"
      );
      console.log(data.Search);
      setMovies(data.Search);
      setLoading(false);
    } catch {
      alert("Unable to fetch movies");
    }
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div>
      <section id="search">
        <div className="filter__content--wrapper">
          <div className="search__label">
            <p className="search__info">Search results:</p>
          </div>
          <div className="filter">
            <select id="filter" onChange="filterMovies(event)">
              <option value="disabledselected">Sort</option>
              <option value="A_TO_Z">A to Z</option>
              <option value="Z_TO_A">Z to A</option>
              <option value="NEWEST_TO_OLDEST">Newest to Oldest</option>
              <option value="OLDEST_TO_NEWEST">Oldest to Newest</option>
            </select>
          </div>
        </div>
        <div className="content__wrapper">
          <div className="movies movies__loading" id="movie__img--wrapper">
            <i className="fa-solid fa-spinner movies__loading--spinner"></i>
            {loading
              ? new Array(10)
                  .fill(0)
                  .map((_, index) => (
                    <div className="movie__skeleton" key={index}></div>
                  ))
              : movies.map((movie) => (
                  <div className="movie" key={movie.imdbID}>
                    <figure className="movie__img--wrapper">
                      <img src={movie.Poster} alt="" className="movie__img" />
                    </figure>
                    <div className="movie__title">
                      <span className="movie__details">{movie.Title}</span>
                    </div>
                    <div className="movie__year">
                      <span>{movie.Year}</span>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SearchResults;
