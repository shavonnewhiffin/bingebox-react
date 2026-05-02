import axios from "axios";


// Fetches movies in search inputs on both Hero.jsx and Browse.jsx
export async function fetchMovies(searchTerm) {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=7a01efd1f352217d83f9b1c924dc0af6&query=${encodeURIComponent(searchTerm)}`
  );
  return data.results || [];
}

export async function fetchMovieById(id) {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=7a01efd1f352217d83f9b1c924dc0af6`
  );
  return data;
}

export async function fetchMovieCredits(id) {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=7a01efd1f352217d83f9b1c924dc0af6`
  );
  return data;
}
