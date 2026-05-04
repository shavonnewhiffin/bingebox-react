import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPlus, faShare, faStar } from '@fortawesome/free-solid-svg-icons'
import { fetchMovieById, fetchRecommendations, fetchImdbId } from '../utils/api'

const Movie = () => {
const { id } = useParams();
const navigate = useNavigate();

const [isVisible, setIsVisible] = useState(null);
const [movie, setMovie] = useState({});
const [recommended, setRecommended] = useState([]);

useEffect(() => {
    fetchMovieById(id).then(data => {
        setMovie(data);
        fetchRecommendations(data.imdbID).then(results => setRecommended(results));
    });
}, [id])


useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));
}, [])

  console.log("recommended state:", recommended);
  return (
    <div className={`modal__container ${isVisible ? "modal__container--active" : ""}`}>
        <div className="modal">
        {/* Movie Left */}
            <div className="modal__left">
            <figure className="modal__img--wrapper">
            <img src={movie.Poster} className="modal__img" alt="" />
            </figure>
            </div>
        {/* Movie Right */}
        <div className="modal__right">
        <div className="modal__close" onClick={() => navigate(-1)}><FontAwesomeIcon icon={faXmark}/>
        </div>
        <h2>{movie.Title}</h2>
        <h3><FontAwesomeIcon icon={faStar}/>{movie.imdbRating}</h3>
        <button className="modal__button">{movie.Genre}</button>
        <div className="modal__details">
            <p className="modal__plot">{movie.Plot}</p>
            <p className="modal__mentions">Starring: {movie.Actors}</p>
            <p className="modal__mentions">Directed by: {movie.Director}</p>
        </div>
        <hr className="modal__divider"/>
        <div className="modal__actions">
        <button className="modal__actions--button">
        <FontAwesomeIcon icon={faPlus} />
        Add to Bingelist
        </button>
        <button className="modal__actions--button">
        <FontAwesomeIcon icon={faShare} />
        Share the Popcorn
        </button>
        </div>
        </div>
        <div className="modal__bottom">
            <div className="modal__container--recommended">
                <div className="movie__selected-top">
                    <h2 className="movie__selected--title--top">
                      Recommended For You
                    </h2>
                    <div className="movies">
                        {recommended.filter(recco => recco.poster_path).slice(0, 3).map((recco) => (
                             <div className="movie" key={recco.id} onClick={() => fetchImdbId(recco.id).then(imdbId => navigate(`/movie/${imdbId}`, { replace: true }))}>
                               <figure className="movie__img--wrapper">
                                 <img src={`https://image.tmdb.org/t/p/w500${recco.poster_path}`} alt="" className="movie__img" />
                               </figure>
                               <div className="movie__title">
                                 <span className="movie__details"> {recco.title} </span>
                                 <div className="movie__subdetails"></div>
                                 <p className="movie__rating"><FontAwesomeIcon icon={faStar}/>{recco.vote_average.toFixed(1)}</p>
                               </div>
                               <div className="movie__year">
                                 <span className="">{recco.release_date?.slice(0, 4)}</span>
                               </div>
                             </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Movie
