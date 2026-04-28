import React from 'react'
import SearchResults from './SearchResults'

const Browse = () => {

    return (
        <>
            <div className="browse__bar">
                <div className="browse__bar--wrapper">
                    <h1 className="h1__browse">Browse Movies & TV Shows</h1>
                    <div className="input__wrapper">
                        <input type="search" placeholder="Search for a movie or TV show..." className="browse__input" id="searchInput" onChange="searchAPI()" />
                        <div className="search__wrapper" id="searchBtn">
                            <i className="fa-solid fa-magnifying-glass search__icon"></i>
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
            <SearchResults />
        </>
    )
}

export default Browse