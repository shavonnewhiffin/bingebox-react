import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { fetchTrending, fetchPopularTv, fetchPopularMovies, fetchNowPlaying, fetchLoveIsland, fetchTopMovies, fetchImdbId, fetchTopTv } from "../utils/api";
import stackedLogo from "../assets/bingeboxstackedlogo.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Jay from "../assets/Jay.png"
import Liz from '../assets/Liz.png'

const Trending = () => {
  const navigate = useNavigate();
  const [allTrending, setAllTrending] = useState([]);
  const [nowPlaying, setNowPlaying]= useState([])
  const [popularTv, setPopularTv] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topTv, setTopTV] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [loveIsland, setLoveIsland] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchTrending().then((data) => {
      setAllTrending(data);
      setLoading(false);
    });
    fetchNowPlaying().then((data) => {setNowPlaying(data)
    setLoading(false);
  })
  fetchTopTv().then((data) => {
    setTopTV(data);
    setLoading(false);
  })
  fetchTopTv().then((data) => {
    setTopTV(data);
    setLoading(false);
  })
  fetchTopMovies().then((data) => {
    setTopMovies(data);
    setLoading(false);
  })
  fetchLoveIsland().then((data) => {
    setLoveIsland(data);
    setLoading(false);
  })
  fetchPopularTv().then((data) => {
    setPopularTv(data);
    setLoading(false);
  })
  fetchPopularMovies().then((data) => {
    setPopularMovies(data);
    setLoading(false);
  })
},
   []);

  return (
    <section id="trends">
      <div
        className="trends__banner"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${allTrending[0]?.backdrop_path})`,
        }}
      >
        <div className="trends__content active">
          <img src="" alt="" />
          <h4>
            <span>2023</span> <span>12+</span> <span>2hr</span>{" "}
            <span>Romance</span>
          </h4>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe est
            nulla cupiditate rerum temporibus quaerat ratione odit, repudiandae
            ea ad.
          </p>
          <div className="trends__button">
            <span>Watch Now</span>
          </div>
          <div className="trends__button">
            <span>My List</span>
          </div>
        </div>
      </div>
{/* Top 10 Rankings */}
<div className="trends__container--top">
    <div className="trends__row">
        <div className="trends__top10--wrapper">
        <div className="trends__section--title">What's Hot & Trending</div>
        <div className="trends__section-tag">
            Top 10 Trending Movie & Tv
        </div>
        <div className="trends__list">
        {allTrending.slice(0, 10).map(((movie, index) => <div className="trends__list--item" key={movie.id}>
            <div className="trends__number">{String(index + 1).padStart(2,'0')}</div>
        <div className="trends__title" onClick={() => fetchImdbId(movie.id, movie.media_type).then(imdbId => navigate(`/movie/${imdbId}`, { replace: true }))}>{movie.title || movie.name}</div>
        </div> ))}
        </div>
        </div>
    </div>
</div>


{/* // Trending Movies & TV Carousel cards */}
<div className="trends__section-carousel--tag">
            Browse all trending titles
        </div>
      {allTrending.length > 0 && (
      <Swiper
        className="trends__carousel--container"
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        slidesPerView={6}
        spaceBetween={16}
      >
          {allTrending.map((movie) => (
              <SwiperSlide
                key={movie.id}
                className="movie"
                onClick={() =>
                  fetchImdbId(movie.id, movie.media_type).then((imdbId) =>
                    navigate(`/movie/${imdbId}`)
                  )
                }
              >
                <figure className="movie__img--wrapper">
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : stackedLogo
                    }
                    alt=""
                    className="movie__img"
                  />
                </figure>
                <div className="movie__title">
                  <span className="movie__details">
                    {movie.title || movie.name}
                  </span>
                </div>
                <div className="movie__year">
                  <span>
                    {movie.release_date?.slice(0, 4) ||
                      movie.first_air_date?.slice(0, 4)}
                  </span>
                </div>
              </SwiperSlide>
            ))}
      </Swiper>
      )}

      {/* // In Theatres Movies Carousel */}
      <div className="trends__section-carousel--tag">
            Now Playing in Theatres
        </div>
      {nowPlaying.length > 0 && (
      <Swiper
        className="trends__carousel--container"
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        slidesPerView={6}
        spaceBetween={16}
      >
          {nowPlaying.map((movie) => (
              <SwiperSlide
                key={movie.id}
                className="movie"
                onClick={() =>
                  fetchImdbId(movie.id, movie.media_type).then((imdbId) =>
                    navigate(`/movie/${imdbId}`)
                  )
                }
              >
                <figure className="movie__img--wrapper">
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : stackedLogo
                    }
                    alt=""
                    className="movie__img"
                  />
                </figure>
                <div className="movie__title">
                  <span className="movie__details">
                    {movie.title || movie.name}
                  </span>
                </div>
                <div className="movie__year">
                  <span>
                    {movie.release_date?.slice(0, 4) ||
                      movie.first_air_date?.slice(0, 4)}
                  </span>
                </div>
              </SwiperSlide>
            ))}
      </Swiper>
      )}

      {/* 50/50 Staff Picks - Jay */}
<div className="trends__container--featured">
    <div className="trends__container--left">
        <div className="trends__container--left-side">
          <div>
            <div className="trends__section--title">Jay's Picks</div>
            <div className="trends__section-staff--tag">They're called "classics" for a reason</div>
          </div>
          <div className="staff__profile">
            <img src={Jay} alt="" className="staff__img" />
            <div className="staff__name">Jay T.</div>
            <div className="staff__role">Marketing</div>
          </div>
        </div>
        <div className="movies--small">
        {topMovies.slice(0,3).map((movie) => <div className="movie--small">
        <figure className="movie__img--wrapper">
                    <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : stackedLogo}  onClick={() =>
                  fetchImdbId(movie.id, movie.media_type).then((imdbId) =>
                    navigate(`/movie/${imdbId}`)
                  )
                } alt="" className="movie__img" />
                  </figure>
                  <div className="movie__title">
                    <span className="movie__details">{movie.title}</span>
                  </div>
        <button><FontAwesomeIcon icon={faPlus}/></button>
        </div>)}
        </div>
    </div>
    {/* 50/50 Staff Picks Liz */}
    <div className="trends__container--right">
        <div className="trends__container--right-side">
          <div>
            <div className="trends__section--title">Liz's Picks</div>
            <div className="trends__section-staff--tag">
              One man's trash tv is another man's treasure
            </div>
          </div>
          <div className="staff__profile">
            <img src={Liz} alt="" className="staff__img" />
            <div className="staff__name">Liz F.</div>
            <div className="staff__role">Finance</div>
          </div>
        </div>
          <div className="movies--small">
        {loveIsland.slice(0,3).map((movie) => <div className="movie--small">
        <figure className="movie__img--wrapper">
                    <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : stackedLogo} alt="" className="movie__img" />
                  </figure>
                  <div className="movie__title">
                    <span className="movie__details">{movie.title || movie.name}</span>
                  </div>
        <button><FontAwesomeIcon icon={faPlus}/></button>
        </div>)}
        </div>
    </div>
</div>

{/* Top Rated TV Carousel */}
<div className="trends__section-carousel--tag">
            Top rated Tv
        </div>
{!loading && (
      <Swiper
        className="trends__carousel--container"
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        slidesPerView={6}
        spaceBetween={16}
      >
          {topTv.map((movie) => (
              <SwiperSlide
                key={movie.id}
                className="movie"
                onClick={() =>
                  fetchImdbId(movie.id, movie.media_type).then((imdbId) =>
                    navigate(`/movie/${imdbId}`)
                  )
                }
              >
                <figure className="movie__img--wrapper">
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : stackedLogo
                    }
                    alt=""
                    className="movie__img"
                  />
                </figure>
                <div className="movie__title">
                  <span className="movie__details">
                    {movie.title || movie.name}
                  </span>
                </div>
                <div className="movie__year">
                  <span>
                    {movie.release_date?.slice(0, 4) ||
                      movie.first_air_date?.slice(0, 4)}
                  </span>
                </div>
              </SwiperSlide>
            ))}
      </Swiper>
      )}

{/* <div className="trends__container">
<div className="trends__row">
<div className="trends__section--title">Top TV</div>
        <div className="trends__section-tag">
            Top 10 Trending Movies & Tv
        </div>
        <div className="content__wrapper">
          <div className={`movies ${loading ? 'movies__loading' : ''}`} id="movie__img--wrapper">
            {loading ? (
              <div className="movies__skeleton">
                {new Array(10).fill(0).map((_, index) => (
                  <div className="movie__skeleton" key={index}>
                    <div className="movie__skeleton--img"></div>
                    <div className="movie__skeleton--title"></div>
                    <div className="movie__skeleton--year"></div>
                  </div>
                ))}
              </div>
            ) : (
              topTv.slice(0,6).map((movie) => (
                <div className="movie" key={movie.id} onClick={() => fetchImdbId(movie.id, 'movie').then(imdbId => navigate(`/movie/${imdbId}`))}>
                  <figure className="movie__img--wrapper">
                    <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : stackedLogo} alt="" className="movie__img" />
                  </figure>
                  <div className="movie__title">
                    <span className="movie__details">{movie.title}</span>
                  </div>
                  <div className="movie__year">
                    <span>{movie.release_date?.slice(0, 4)}</span>
                  </div>
                </div>
              ))
            )}
</div>
</div>
</div>
</div> */}


      {/* // Top Movies Carousel */}
      <div className="trends__section-carousel--tag">
            Top Rated Movies
        </div>
      {topMovies.length > 0 && (
      <Swiper
        className="trends__carousel--container"
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        slidesPerView={6}
        spaceBetween={16}
      >
          {topMovies.map((movie) => (
              <SwiperSlide
                key={movie.id}
                className="movie"
                onClick={() =>
                  fetchImdbId(movie.id, movie.media_type).then((imdbId) =>
                    navigate(`/movie/${imdbId}`)
                  )
                }
              >
                <figure className="movie__img--wrapper">
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : stackedLogo
                    }
                    alt=""
                    className="movie__img"
                  />
                </figure>
                <div className="movie__title">
                  <span className="movie__details">
                    {movie.title || movie.name}
                  </span>
                </div>
                <div className="movie__year">
                  <span>
                    {movie.release_date?.slice(0, 4) ||
                      movie.first_air_date?.slice(0, 4)}
                  </span>
                </div>
              </SwiperSlide>
            ))}
      </Swiper>
      )}
      {/* // Popular TV Carousel cards */}
      <div className="trends__section-carousel--tag">
            Popular Tv Series
        </div>
      {popularTv.length > 0 && (
      <Swiper
        className="trends__carousel--container"
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        slidesPerView={6}
        spaceBetween={16}
      >
          {popularTv.map((movie) => (
              <SwiperSlide
                key={movie.id}
                className="movie"
                onClick={() =>
                  fetchImdbId(movie.id, movie.media_type).then((imdbId) =>
                    navigate(`/movie/${imdbId}`)
                  )
                }
              >
                <figure className="movie__img--wrapper">
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : stackedLogo
                    }
                    alt=""
                    className="movie__img"
                  />
                </figure>
                <div className="movie__title">
                  <span className="movie__details">
                    {movie.title || movie.name}
                  </span>
                </div>
                <div className="movie__year">
                  <span>
                    {movie.release_date?.slice(0, 4) ||
                      movie.first_air_date?.slice(0, 4)}
                  </span>
                </div>
              </SwiperSlide>
            ))}
      </Swiper>
      )}
      {/* // Popular Movies Carousel cards */}
      <div className="trends__section-carousel--tag">
            Popular Movies
        </div>
      {popularMovies.length > 0 && (
      <Swiper
        className="trends__carousel--container"
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        slidesPerView={6}
        spaceBetween={16}
      >
          {popularMovies.map((movie) => (
              <SwiperSlide
                key={movie.id}
                className="movie"
                onClick={() =>
                  fetchImdbId(movie.id, movie.media_type).then((imdbId) =>
                    navigate(`/movie/${imdbId}`)
                  )
                }
              >
                <figure className="movie__img--wrapper">
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : stackedLogo
                    }
                    alt=""
                    className="movie__img"
                  />
                </figure>
                <div className="movie__title">
                  <span className="movie__details">
                    {movie.title || movie.name}
                  </span>
                </div>
                <div className="movie__year">
                  <span>
                    {movie.release_date?.slice(0, 4) ||
                      movie.first_air_date?.slice(0, 4)}
                  </span>
                </div>
              </SwiperSlide>
            ))}
      </Swiper>
      )}
      {/* </div> */}
    </section>
  );
};

export default Trending;
