import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons'

const Browse = () => {

    const [searchId, setSearchId] = useState(null)
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)

    async function fetchMovies() {
        try {
            const { data } = await axios.get(
                `https://www.omdbapi.com/?&apikey=d051fbc2&s=fast`
            )
            console.log(data.Search)
            setMovies(data.Search)
            setLoading(false)
        } catch {
            alert("Unable to fetch movies")
        }
    }

    async function searchMovies(searchId) {
        const { data } = await axios.get(`https://www.omdbapi.com/?&apikey=d051fbc2&s=${searchId}`)
    }

    function onSearch() {
        fetchMovies(searchId);
    }

    useEffect(() => {
        fetchMovies()
    }, [])

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
                            onKeyDown={(event) => {if(event.key === 'Enter') onSearch()}}
                        />
                        <div className="search__wrapper" id="searchBtn" onClick={() => onSearch()}>
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
                        {loading ? (
                            <div className="movies__skeleton">
                                <div className="spinner__wrapper">
                                    <FontAwesomeIcon icon={faSpinner} className="fa-solid fa-spinner movies__loading--spinner" />
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
    )
}

export default Browse
