import React, { useState, useEffect, useRef } from 'react'
import { fetchTrending, fetchImdbId } from '../utils/api'
import { useNavigate } from 'react-router-dom'
import stackedLogo from '../assets/bingeboxstackedlogo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const TrendingCarousel = () => {
const navigate = useNavigate();

    const [filteredTrending, setFilteredTrending] = useState([]);

    // groupRef points to the first group of cards in the carousel
    const groupRef = useRef(null);

    useEffect(() => {
        fetchTrending().then(data => setFilteredTrending(data))
    }, [])

    useEffect(() => {
        if (!groupRef.current) return;

        // ResizeObserver is like a security camera watching the group element.
        // Every time it notices the group has changed size (like when images finish loading),
        // it runs this function and tells CSS the new exact width.
        const observer = new ResizeObserver(() => {
            // Guard against the callback firing after the component unmounts
            if (groupRef.current) {
                document.documentElement.style.setProperty('--group-width', `${groupRef.current.offsetWidth}px`);
            }
        });

        // Start watching the first group
        observer.observe(groupRef.current);

        // Stop watching when the component is removed from the page (cleanup)
        return () => observer.disconnect();
    }, [filteredTrending])


  return (
    <section id="trending">
            <Link to ="/trending"><div className="section__tag">Don't Miss What's Trending <FontAwesomeIcon icon={faFire}/></div></Link>
            <h3>#trendingthisweek</h3>
<div className="carousel">
  <div className="carousel__track">
    <div className="group" ref={groupRef}>
      {filteredTrending.map((movie) => (<div className="movie" key={movie.id} onClick={() => fetchImdbId(movie.id, movie.media_type).then(imdbId => navigate(`/movie/${imdbId}`, { replace: true }))}>
<figure className="movie__img--wrapper">
<img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : stackedLogo} alt="" className="movie__img" />
</figure>
<div className="movie__title">
 <span className = "movie__details"> {movie.title || movie.name} </span>
</div>
<div className="movie__year">
   <span className="">{movie.release_date?.slice(0, 4) || movie.first_air_date?.slice(0, 4)}</span> 
</div>
</div>))}
    </div>
    <div aria-hidden className="group">
    {filteredTrending.map((movie) => (<div className="movie" key={`${movie.id}-clone`} onClick={() => fetchImdbId(movie.id, movie.media_type).then(imdbId => navigate(`/movie/${imdbId}`, { replace: true }))}>
<figure className="movie__img--wrapper">
<img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : stackedLogo} alt="" className="movie__img" />
</figure>
<div className="movie__title">
 <span className = "movie__details"> {movie.title || movie.name} </span>
</div>
<div className="movie__year">
   <span className="">{movie.release_date?.slice(0, 4) || movie.first_air_date?.slice(0, 4)}</span> 
</div>
</div>))}
    </div>
  </div>
</div>
  </section>
  )
}

export default TrendingCarousel