import axios from "axios";

export async function fetchMovies(searchTerm) {
  const { data } = await axios.get(
    `https://www.omdbapi.com/?&apikey=d051fbc2&s=${encodeURIComponent(searchTerm)}`
  );
  return data.Search || [];
}
