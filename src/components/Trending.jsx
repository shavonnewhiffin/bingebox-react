import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { fetchTrending, fetchNowPlaying, fetchTopMovies, fetchImdbId } from "../utils/api";
import stackedLogo from "../assets/bingeboxstackedlogo.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Trending = () => {
  const navigate = useNavigate();
  const [allTrending, setAllTrending] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [nowPlaying, setNowPlaying]= useState([])
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchTrending().then((data) => {
      setAllTrending(data);
      setLoading(false);
    });
    fetchNowPlaying().then((data) => {setNowPlaying(data)
    setLoading(false);
  })},
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
      {/* // Trending Movies & TV Carousel cards */}
      <h3 className="trends__carousel--header">Trending Movies & TV</h3>
      <Swiper
        className="trends__carousel--container"
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        loop={!loading}
        slidesPerView={6}
        spaceBetween={16}
      >
        {loading
          ? new Array(6).fill(0).map((_, index) => (
              <SwiperSlide key={index}>
                <div className="movie__skeleton">
                  <div className="movie__skeleton--img"></div>
                  <div className="movie__skeleton--title"></div>
                  <div className="movie__skeleton--year"></div>
                </div>
              </SwiperSlide>
            ))
          : allTrending.map((movie) => (
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
      {/* // Trending Movies & TV Carousel cards */}
      <h3 className="trends__carousel--header">Now Playing in Theatres</h3>
      <Swiper
        className="trends__carousel--container"
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        loop={!loading}
        slidesPerView={6}
        spaceBetween={16}
      >
        {loading
          ? new Array(6).fill(0).map((_, index) => (
              <SwiperSlide key={index}>
                <div className="movie__skeleton">
                  <div className="movie__skeleton--img"></div>
                  <div className="movie__skeleton--title"></div>
                  <div className="movie__skeleton--year"></div>
                </div>
              </SwiperSlide>
            ))
          : nowPlaying.map((movie) => (
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
      {/* </div> */}
    </section>
  );
};

export default Trending;
