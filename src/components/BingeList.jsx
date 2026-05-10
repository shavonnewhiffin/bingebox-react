import React from 'react'
import { Link } from 'react-router-dom'

export default function BingeList({ list, removeItem }) {
  return (
    <section id="bingelist">
      <div className="list__selected--top">
        <div className="row">
          <h2>My Bingelist</h2>
          <div className="list__container">
            <div className="list__header">
              <div className="list__title">Title</div>
              <div className="list__title">Description</div>
              <div className="list__title">Where to Watch</div>
            </div>
            <div className="list__body">
              {list.map((movie) => (
                <div className="list__item" key={movie.imdbID || movie.id}>
                  <div className="list__left">
                    <img src={movie.Poster || `https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="list__movie--img" alt={movie.Title || movie.title || movie.name} />
                    <button className="list__movie--remove" onClick={() => removeItem(movie)}>
                     Remove
                    </button>
                  </div>
                  <div className="list__middle">
                    <div className="list__movie--title">{movie.Title || movie.title || movie.name}</div>
                    <p className="list__movie--description">{movie.Plot || movie.overview}</p>
                  </div>
                  <div className="list__right">
                    <p>—</p>
                  </div>
                </div>
              ))}
            </div>

            {list.length === 0 && (
              <div className="list__empty">
                <h2>Your Bingelist is empty!</h2>
                <Link to="/trending">
                  <button className="btn">Browse Movies</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
