const API_BASE = 'http://localhost:8080/api';

/**
 * Get available cinemas for a movie.
 */
export async function getCinemas(movieId) {
  const response = await fetch(`${API_BASE}/cinemas?movieId=${movieId}`);
  if (!response.ok) throw new Error('Failed to fetch cinemas');
  return response.json();
}

/**
 * Get showtimes for a specific cinema and movie.
 */
export async function getShowtimes(movieId, cinemaId) {
  const response = await fetch(`${API_BASE}/showtimes?movieId=${movieId}&cinemaId=${cinemaId}`);
  if (!response.ok) throw new Error('Failed to fetch showtimes');
  return response.json();
}

/**
 * Get seat layout for a showtime.
 */
export async function getSeatLayout(showtimeId) {
  const response = await fetch(`${API_BASE}/seats?showtimeId=${showtimeId}`);
  if (!response.ok) throw new Error('Failed to fetch seats');
  return response.json();
}

/**
 * Submit a booking.
 */
export async function createBooking(bookingData) {
  const response = await fetch(`${API_BASE}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookingData)
  });
  if (!response.ok) throw new Error('Failed to submit booking');
  return response.json();
}
