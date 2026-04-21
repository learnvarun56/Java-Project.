const API_BASE = 'http://localhost:8080/api';

/**
 * Fetch all currently showing movies.
 */
export async function getMovies() {
  const response = await fetch(`${API_BASE}/movies`);
  if (!response.ok) throw new Error('Failed to fetch movies');
  return response.json();
}

/**
 * Fetch a single movie by ID.
 */
export async function getMovieById(id) {
  const response = await fetch(`${API_BASE}/movies/${id}`);
  if (!response.ok) throw new Error('Failed to fetch movie');
  return response.json();
}

/**
 * Search movies by title query.
 */
export async function searchMovies(query) {
  const response = await fetch(`${API_BASE}/movies/search?q=${encodeURIComponent(query)}`);
  if (!response.ok) throw new Error('Failed to search movies');
  return response.json();
}

/**
 * Fetch featured / hero movies for the landing page.
 */
export async function getFeaturedMovies() {
  const response = await fetch(`${API_BASE}/movies/featured`);
  if (!response.ok) throw new Error('Failed to fetch featured movies');
  return response.json();
}
