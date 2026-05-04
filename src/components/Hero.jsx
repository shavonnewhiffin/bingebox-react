import React, { useState, useEffect, useRef } from "react";
import { fetchMovies } from "../utils/api";
import { useNavigate } from "react-router-dom";
import heroImg from "../assets/6.png";
import streamingImg from "../assets/streamingplatforms.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import TrendingCarousel from "./TrendingCarousel";

const Hero = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(false);
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
//   Fade up text animation on page mount
  useEffect(() => {
    containerRef.current.classList.add("visible");

// Saving previously searched movies to reappear on modal exit
    const saved = sessionStorage.getItem('movies');
    if (saved) {
      setMovies(JSON.parse(saved));
      setSearchQuery(sessionStorage.getItem('searchQuery') || "");
      setActive(true);
    }
  }, []);


// Filter movies function
  function filterMovies(event) {
      const filter = event.target.value;
    //   Make a copy of the movies array to sort called sorted
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
    // Display the sorted array
    setMovies(sorted);

    }

  // Search movies using fetchMovies() function in utils
  async function searchAPI() {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setError("");
    try {
      const results = await fetchMovies(searchQuery);
      if (!results || results.length === 0) {
        setError("No results found.");
        return;
      }
      setActive(true);
      setMovies(results);
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section id="landing">
        <img src={heroImg} alt="Hero image" className="hero-image" />
        <div className="landing__container fadeUp" ref={containerRef}>
          <h1>Never wonder what to watch again.</h1>
          <div className="landing__container--bottom">
            <h2>Find the perfect show or movie in seconds. </h2>
            <div className="landing__input--wrapper">
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search for a movie or TV show..."
                className="landing__input"
                id="searchInput"
              />
              <button
                type="submit"
                className="landing__btn"
                onClick={searchAPI}
                id="searchBtn"
              >
                {loading ? (
                  <FontAwesomeIcon
                    icon={faSpinner}
                    className="fa-solid fa-spinner landing__btn--spinner" spin
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="fa-solid fa-magnifying-glass search"
                  ></FontAwesomeIcon>
                )}
              </button>
            </div>
          </div>
        </div>
        {/* <figure className="landing__img--wrapper">
          <img src="./assets/undraw_home-cinema_jdm1.svg" className="landing__img" alt=""/>
        </figure> */}
      </section>
      {/* Movies Filter (only visible when search results exist) */}
      <div
        className={`filter__landing ${
          active ? "filter__landing--visible" : ""
        }`}
        id="filter__box"
      >
        <select id="filter" onChange={filterMovies}>
          <option value="disabledselected">Sort</option>
          <option value="A_TO_Z">A to Z</option>
          <option value="Z_TO_A">Z to A</option>
          <option value="NEWEST_TO_OLDEST">Newest to Oldest</option>
          <option value="OLDEST_TO_NEWEST">Oldest to Newest</option>
        </select>
      </div>
      {/* Results Container Section (only visible when search results exist) */}
      <div
        className={`results__container ${active ? "active" : ""}`}
        id="resultsContainer"
      >
        {error && <p>{error}</p>}
        {movies.slice(0, 6).map((movie) => (
          <div className="movie" key={movie.imdbID}
          onClick={() => {
            sessionStorage.setItem('movies', JSON.stringify(movies));
            sessionStorage.setItem('searchQuery', searchQuery);
            navigate(`movie/${movie.imdbID}`);
          }}>
            <figure className="movie__img--wrapper">
              <img src={movie.Poster} alt="" className="movie__img" />
            </figure>
            <div className="movie__title">
              <span className="movie__details"> {movie.Title} </span>
            </div>
            <div className="movie__year">
              <span className="">{movie.Year}</span>
            </div>
          </div>
        ))}
      </div>
      {/* Red Streaming Logos Section */}
      <section id="streaming">
        <div className="row__narrow">
          <div className="streaming__wrapper">
            <h3>
              Browse our{" "}
              <a href="" className="link__hover-effect--white">
                top recommendations
              </a>{" "}
              across streaming platforms
            </h3>
          </div>
          <figure className="streaming__img--wrapper">
            <img src={streamingImg} alt="" className="streaming__img" />
          </figure>
        </div>
      </section>
      {/* Trending Section */}
<TrendingCarousel />
    </>
  );
};

export default Hero;
