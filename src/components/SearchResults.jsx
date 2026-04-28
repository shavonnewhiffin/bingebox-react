import React from 'react'

const SearchResults = () => {
  return (
    <div><section id="search">
    <div className="filter__content--wrapper">
        <div className="search__label">
        <p className="search__info">Search results:</p>
        </div>
        <div className="filter">
            <select id = "filter" onChange="filterMovies(event)">
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
    {/* <!-- <div className="movie">
        <figure className="movie__img--wrapper">
            <img src="" alt="" className="movie__img">
        </figure>
        <div className="movie__title">
            Title
        </div>
        <div className="movie__year">
            Year
        </div>
        <div className="movie__rating">
            <i className="fas fa-star"></i> 
            <i className="fas fa-star"></i> 
            <i className="fas fa-star"></i> 
            <i className="fas fa-star"></i> 
            <i className="fas fa-star-half-alt"></i> 
        </div>
    </div> --> */}
</div>
</div>
</section>
</div>
  )
}

export default SearchResults