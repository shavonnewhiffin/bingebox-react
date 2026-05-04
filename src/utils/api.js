import axios from "axios";

const OMDB_KEY = "d051fbc2";

export async function fetchMovies(searchTerm) {
  const { data } = await axios.get(
    `https://www.omdbapi.com/?apikey=${OMDB_KEY}&s=${encodeURIComponent(searchTerm)}`
  );
  return data.Search || [];
}

export async function fetchMovieById(id) {
  const { data } = await axios.get(
    `https://www.omdbapi.com/?apikey=${OMDB_KEY}&i=${id}`
  );
  return data;
}

// Converts IMDB movies into TMDB movies, then fetches other recommendations based on that TMDB id
export async function fetchRecommendations(imdbID){
    const { data } = await axios.get(`https://api.themoviedb.org/3/find/${imdbID}?api_key=7a01efd1f352217d83f9b1c924dc0af6&external_source=imdb_id`);
    if (!data.movie_results?.length) return [];
    const tmdbID = data.movie_results[0].id;
   const response = await axios.get(`https://api.themoviedb.org/3/movie/${tmdbID}/recommendations?api_key=7a01efd1f352217d83f9b1c924dc0af6`);
   const recommendations = response.data.results;
   console.log(recommendations)
   return recommendations;
}

export async function fetchImdbId(tmdbId){
    const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${tmdbId}/external_ids?api_key=7a01efd1f352217d83f9b1c924dc0af6`);
    return data.imdb_id;
}