import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPlus, faShare, faStar } from '@fortawesome/free-solid-svg-icons'
import { fetchMovieById, fetchMovieCredits } from '../utils/api'

const Movie = () => {
const { id } = useParams();
const navigate = useNavigate();

const [isVisible, setIsVisible] = useState(null);
const [movie, setMovie] = useState({});
const [credits, setCredits] = useState({ cast: [], crew: [] });

useEffect(() => {
    fetchMovieById(id).then(data => setMovie(data));
    fetchMovieCredits(id).then(data => setCredits(data));
}, [id])

useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));
}, [])

  return (
    <div className={`modal__container ${isVisible ? "modal__container--active" : ""}`}>
        <div className="modal">
        {/* Movie Left */}
            <div className="modal__left">
            <figure className="modal__img--wrapper">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="modal__img" alt="" />
            </figure>
            </div>
        {/* Movie Right */}
        <div className="modal__right">
        <div className="modal__close" onClick={() => navigate(-1)}><FontAwesomeIcon icon={faXmark}/>
        </div>
        <h2>{movie.title}</h2>
        <h3><FontAwesomeIcon icon={faStar}/>{movie.vote_average?.toFixed(1)}</h3>
        <button className="modal__button">{movie.genres?.map(g => g.name).join(', ')}</button>
        <div className="modal__details">
            <p className="modal__plot">{movie.overview}</p>
            <p className="modal__mentions">Starring: {credits.cast?.slice(0, 3).map(c => c.name).join(', ')}</p>
            <p className="modal__mentions">Directed by: {credits.crew?.find(c => c.job === 'Director')?.name}</p>
        </div>
        <hr className="modal__divider"/>
        <div className="modal__actions">
        <button>
        <FontAwesomeIcon icon={faPlus} />
        Add to Bingelist
        </button>
        <button>
        <FontAwesomeIcon icon={faShare} />
        Share the Popcorn
        </button>
        </div>
        </div>
        <div className="modal__bottom">
            <div className="modal__container--recommended">
                <div className="movie__selected-top">
                    <h2 className="movie__selected--title--top">
                      Recommended Movies
                    </h2>
                    <div className="movies">
                        {}
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Movie