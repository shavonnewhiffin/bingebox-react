import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { fetchMovies } from "../utils/api";

const Browse = () => {
  const [searchId, setSearchId] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  async function search(searchTerm) {
    try {
      setLoading(true);
      const results = await fetchMovies(searchTerm);
      setMovies(results);
    } catch {
      alert("Unable to fetch movies");
    } finally {
      setLoading(false);
    }
  }

//   When user types in search field in searchId, pass that argument into the search function above.
  function onSearch() {
    if (!searchId.trim()) return;
    search(searchId);
  }

  function filterMovies(event) {
    const filter = event.target.value;
    const sorted = [...movies];

    if (filter === "A_TO_Z") {
      sorted.sort((a, b) => a.Title.localeCompare(b.Title));
    } else if (filter === "Z_TO_A") {
      sorted.sort((a, b) => b.Title.localeCompare(a.Title));
    } else if (filter === "NEWEST_TO_OLDEST") {
      sorted.sort((a, b) => b.Year - a.Year);
    } else if (filter === "OLDEST_TO_NEWEST") {
      sorted.sort((a, b) => a.Year - b.Year);
    }
    setMovies(sorted);
  }

  useEffect(() => {
    search("fast");
  }, []);

  return (
    <>
      <div className="browse__bar">
        <div className="browse__bar--wrapper">
          <h1 className="h1__browse">Browse Movies & TV Shows</h1>
          <div className="input__wrapper">
            <input
              type="search"
              value={searchId}
              placeholder="Search for a movie or TV show..."
              className="browse__input"
              id="searchInput"
              onChange={(event) => setSearchId(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") onSearch();
              }}
            />
            <div
              className="search__wrapper"
              id="searchBtn"
              onClick={() => onSearch()}
            >
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="fa-solid fa-magnifying-glass search__icon"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="overlay"> </div>
      <div className="progress__bar">
        <div className="progress">
          <div className="indicator"></div>
        </div>
      </div>

      {/* Search results section */}
      <section id="search">
        <div className="filter__content--wrapper">
          <div className="search__label">
            <p className="search__info">Search results:</p>
          </div>
          {/* Filter button */}
          <div className="filter">
            <select id="filter" onChange={(event) => filterMovies(event)}>
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
            {loading ? (
              <div className="movies__skeleton">
                <div className="spinner__wrapper">
                  <FontAwesomeIcon
                    icon={faSpinner}
                    className="fa-solid fa-spinner movies__loading--spinner"
                  />
                </div>
                {new Array(10).fill(0).map((_, index) => (
                  <div className="movie__skeleton" key={index}></div>
                ))}
              </div>
            ) : (
              movies.map((movie) => (
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
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Browse;
