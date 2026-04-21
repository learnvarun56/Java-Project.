package repository;

import models.Booking;
import models.Cinema;
import models.Movie;
import models.Seat;
import models.SeatLayout;
import models.Showtime;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class InMemoryRepository implements DataRepository {
    private List<Movie> movies;
    private List<Cinema> cinemas;
    private List<Showtime> showtimes;
    private List<Booking> bookings;

    public InMemoryRepository() {
        movies = new ArrayList<>();
        cinemas = new ArrayList<>();
        showtimes = new ArrayList<>();
        bookings = new ArrayList<>();
        seedData();
    }

    private void seedData() {
        // Movies
        movies.add(new Movie(1, "Dune: Part Three", "Sci-Fi / Adventure", "2h 45m", 8.9, "2026-03-28", "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=400&h=600&fit=crop", "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=1920&h=1080&fit=crop", "Paul Atreides unites with the Fremen to lead a revolution across the desert planet of Arrakis.", "Denis Villeneuve", Arrays.asList("Timothée Chalamet", "Zendaya", "Rebecca Ferguson"), "English", "PG-13"));
        movies.add(new Movie(2, "The Batman: Year Two", "Action / Thriller", "2h 56m", 9.1, "2026-04-10", "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop", "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=1920&h=1080&fit=crop", "Gotham's vigilante faces a new threat.", "Matt Reeves", Arrays.asList("Robert Pattinson", "Zoë Kravitz", "Jeffrey Wright"), "English", "PG-13"));
        movies.add(new Movie(3, "Midnight in Tokyo", "Drama / Romance", "2h 12m", 8.4, "2026-04-05", "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=400&h=600&fit=crop", "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=1920&h=1080&fit=crop", "Two strangers meet during a single night in Tokyo.", "Sofia Coppola", Arrays.asList("Dev Patel", "Rinko Kikuchi"), "English / Japanese", "R"));
        movies.add(new Movie(4, "Echoes of the Void", "Horror / Sci-Fi", "1h 58m", 7.8, "2026-03-15", "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=600&fit=crop", "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1920&h=1080&fit=crop", "A deep-space research team discovers an ancient signal.", "Jordan Peele", Arrays.asList("Lupita Nyong'o", "Oscar Isaac"), "English", "R"));
        movies.add(new Movie(5, "The Grand Illusion", "Mystery / Thriller", "2h 20m", 8.6, "2026-04-18", "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop", "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&h=1080&fit=crop", "A legendary magician is found dead on stage.", "Christopher Nolan", Arrays.asList("Cillian Murphy", "Florence Pugh"), "English", "PG-13"));
        movies.add(new Movie(6, "Celestial Wars", "Fantasy / Action", "2h 35m", 8.2, "2026-04-22", "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&h=600&fit=crop", "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1920&h=1080&fit=crop", "Warring factions of celestial beings descend to Earth.", "Chloé Zhao", Arrays.asList("Keanu Reeves", "Gemma Chan", "Idris Elba"), "English", "PG-13"));

        // Cinemas
        cinemas.add(new Cinema(1, "CineMax Premiere IMAX", "123 Broadway Avenue", Arrays.asList("IMAX", "Dolby Atmos", "VIP Lounge", "Parking"), 4.8));
        cinemas.add(new Cinema(2, "Starlight Multiplex", "456 Park Street", Arrays.asList("4DX", "Dolby Atmos", "Food Court"), 4.5));
        cinemas.add(new Cinema(3, "Velvet Screen Cinema", "789 Art District", Arrays.asList("Luxury Recliners", "Bar", "Parking"), 4.9));

        // Showtimes
        showtimes.add(new Showtime(1, "10:30 AM", "IMAX 3D", 18.00, 42, 1));
        showtimes.add(new Showtime(2, "1:15 PM", "Standard", 12.50, 85, 1));
        showtimes.add(new Showtime(3, "4:00 PM", "Dolby Atmos", 15.00, 63, 2));
        showtimes.add(new Showtime(4, "7:30 PM", "IMAX 3D", 20.00, 28, 3));
        showtimes.add(new Showtime(5, "10:15 PM", "Standard", 12.50, 110, 3));
    }

    @Override
    public List<Movie> getAllMovies() { return movies; }

    @Override
    public Movie getMovieById(int id) {
        return movies.stream().filter(m -> m.getId() == id).findFirst().orElse(null);
    }

    @Override
    public List<Movie> searchMovies(String query) {
        if (query == null || query.isEmpty()) return movies;
        String q = query.toLowerCase();
        return movies.stream().filter(m -> m.getTitle().toLowerCase().contains(q)).collect(Collectors.toList());
    }

    @Override
    public List<Movie> getFeaturedMovies() {
        return movies.stream().limit(3).collect(Collectors.toList());
    }

    @Override
    public List<Cinema> getCinemas() {
        return cinemas;
    }

    @Override
    public List<Showtime> getShowtimesByCinema(int cinemaId) {
        if (cinemaId <= 0) return showtimes;
        return showtimes.stream().filter(s -> s.getCinemaId() == cinemaId).collect(Collectors.toList());
    }

    @Override
    public List<SeatLayout> getSeatLayout(int showtimeId) {
        List<SeatLayout> layout = new ArrayList<>();
        String[] rows = {"A", "B", "C", "D", "E", "F", "G", "H"};
        for (String row : rows) {
            List<Seat> seats = new ArrayList<>();
            for (int i = 1; i <= 12; i++) {
                String id = row + i;
                String status = Math.random() > 0.75 ? "booked" : (Math.random() > 0.85 ? "vip" : "available");
                double price = (row.compareTo("B") <= 0) ? 25.0 : (row.compareTo("E") <= 0) ? 18.0 : 12.50;
                seats.add(new Seat(id, i, status, price));
            }
            layout.add(new SeatLayout(row, seats));
        }
        return layout;
    }

    @Override
    public Booking saveBooking(Booking booking) {
        bookings.add(booking);
        return booking;
    }
}
