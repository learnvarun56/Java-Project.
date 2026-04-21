package repository;

import models.Booking;
import models.Cinema;
import models.Movie;
import models.SeatLayout;
import models.Showtime;

import java.util.List;

public interface DataRepository {
    List<Movie> getAllMovies();
    Movie getMovieById(int id);
    List<Movie> searchMovies(String query);
    List<Movie> getFeaturedMovies();

    List<Cinema> getCinemas();
    List<Showtime> getShowtimesByCinema(int cinemaId);
    List<SeatLayout> getSeatLayout(int showtimeId);

    Booking saveBooking(Booking booking);
}
