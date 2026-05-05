import axios from "axios";

const OMDB_KEY = "d051fbc2";

// Function to fetchMovies in search inputs with OMDB/IMDB id
export async function fetchMovies(searchTerm) {
  const { data } = await axios.get(
    `https://www.omdbapi.com/?apikey=${OMDB_KEY}&s=${encodeURIComponent(
      searchTerm
    )}`
  );
  return data.Search || [];
}

// Function to fetch movies using OMDB/IMDB id
export async function fetchMovieById(id) {
  const { data } = await axios.get(
    `https://www.omdbapi.com/?apikey=${OMDB_KEY}&i=${id}`
  );
  return data;
}

// Converts IMDB movies into TMDB movies, then fetches other recommendations based on that TMDB id
export async function fetchRecommendations(imdbID) {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/find/${imdbID}?api_key=7a01efd1f352217d83f9b1c924dc0af6&external_source=imdb_id`
  );
//   If movie results exist and has at least item in it, access the first object's id and fetch reccos using that id
  if (data.movie_results?.length) {
    const tmdbID = data.movie_results[0].id;
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${tmdbID}/recommendations?api_key=7a01efd1f352217d83f9b1c924dc0af6`
    );
    const recommendations = response.data.results;
    return recommendations;
    //   If tv results exist and has at least item in it, access the first object's id and fetch reccos using that id and store it in recommendations
  }
  if (data.tv_results?.length) {
    const tmdbID = data.tv_results[0].id;
    const recommendations = await fetchTvReccomendations(tmdbID);
    return recommendations;
  }
  return [];
}

// Function to fetch TV Reccomendations
export async function fetchTvReccomendations(tmdbID) {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/tv/${tmdbID}/recommendations?api_key=7a01efd1f352217d83f9b1c924dc0af6`
  );
  return data.results;
}

// Function to convert tmdbId to imdbId. Movie is a default value as a safety net for OMDB movies.
export async function fetchImdbId(tmdbId, mediaType = "movie") {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/${mediaType}/${tmdbId}/external_ids?api_key=7a01efd1f352217d83f9b1c924dc0af6`
  );
  return data.imdb_id;
}

// Function to fetch trending movies
export async function fetchTrending(){
    const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=7a01efd1f352217d83f9b1c924dc0af6`);
    const filteredTrending = data.results.filter(item => item.media_type !== 'person')
    return filteredTrending;
}
