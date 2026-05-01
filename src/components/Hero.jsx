import React, { useState, useEffect, useRef } from 'react'
import { fetchMovies } from '../utils/api'
import heroImg from '../assets/8.png'
import streamingImg from '../assets/streamingplatforms.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const Hero = () => {
    const containerRef = useRef(null);
    const searchRef = useRef("");

    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(()=>{
        containerRef.current.classList.add("visible");
    },[])



    // const searchBtn = document.getElementById("searchBtn");
    // const searchInput = document.getElementById("searchInput");
    // const resultsContainer = document.getElementById("resultsContainer");
    // const searchIcon = document.querySelector(".search");
    // const filterBox = document.getElementById("filter__box");
    let movies = [];
    

// Function to filter movies

// function filterMovies(event) {
//     const filter = event.target.value;
  
//     if (filter === "A_TO_Z") {
//       movies.sort((a, b) => a.Title.localeCompare(b.Title));
//     } else if (filter === "Z_TO_A") {
//       movies.sort((a, b) => b.Title.localeCompare(a.Title));
//     } else if (filter === "NEWEST_TO_OLDEST") {
//       movies.sort((a, b) => b.Year - a.Year);
//     } else if (filter === "OLDEST_TO_NEWEST") {
//       movies.sort((a, b) => a.Year - b.Year);
//     }
  
//   }


// Display results of fetch
function displayResults(movieList) {
    if (!movieList || movieList.length === 0) {
      filterBox.classList.remove("filter__landing--visible");
      resultsContainer.classList.remove("active");
      resultsContainer.innerHTML = "<p>No results found</p>";
      return;
    }
  
    filterBox.classList.add("filter__landing--visible");
    resultsContainer.classList.add("active");
  
    resultsContainer.innerHTML = movieList.slice(0, 6).map(movieHTML).join("");
  }

  // Converting each movie object into HTML
function movieHTML(movie) {
    return `<div class="movie">
  <figure class="movie__img--wrapper">
      <img src="${movie.Poster}" alt="" class="movie__img">
  </figure>
  <div class="movie__title">
   <span class = "movie__details"> ${movie.Title} </span>
  </div>
  <div class="movie__year">
     <span class="">${movie.Year}</span> 
  </div>
  </div>`;
  }

  // Search movies

async function searchAPI() {
    if (!searchQuery.trim()) return;
    setLoading(true);
    try {
      const results = await fetchMovies(searchQuery);
      movies = results;
      displayResults(movies);
    } catch (err) {
      console.error(err);
      resultsContainer.innerHTML = "<p>Something went wrong.</p>";
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
              <input type="search" 
              value={searchQuery}
              onChange= {(event) => setSearchQuery(event.target.value)}
              placeholder="Search for a movie or TV show..." className="landing__input" id="searchInput" ref={searchRef}/>
              <button type="submit" className="landing__btn" onClick={searchAPI} id="searchBtn">
                {loading ? <FontAwesomeIcon icon={faSpinner} className="fa-solid fa-spinner landing__btn--spinner"/> :
                <FontAwesomeIcon icon={faMagnifyingGlass}className="fa-solid fa-magnifying-glass search"></FontAwesomeIcon>
                }
              </button>
            </div>
          </div>
        </div>
        {/* <figure className="landing__img--wrapper">
          <img src="./assets/undraw_home-cinema_jdm1.svg" className="landing__img" alt=""/>
        </figure> */}
      </section>
      <div className="filter__landing" id="filter__box">
        <select id="filter" onChange={filterMovies}>
          <option value="disabledselected">Sort</option>
          <option value="A_TO_Z">A to Z</option>
          <option value="Z_TO_A">Z to A</option>
          <option value="NEWEST_TO_OLDEST">Newest to Oldest</option>
          <option value="OLDEST_TO_NEWEST">Oldest to Newest</option>
        </select>
      </div>
      <div className="results__container" id="resultsContainer"></div>
      <section id="streaming">
        <div className="row__narrow">
          <div className="streaming__wrapper">
            <h3>Browse our <a href="" className="link__hover-effect--white">top recommendations</a> across streaming platforms</h3>
          </div>
          <figure className="streaming__img--wrapper">
            <img src={streamingImg} alt="" className="streaming__img" />
          </figure>
        </div>
      </section>
    </>
  )
}

export default Hero
