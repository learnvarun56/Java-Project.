package models;
import java.util.List;

public class Booking {
    private String id;
    private int movieId;
    private int cinemaId;
    private int showtimeId;
    private List<String> seats;
    private double totalPrice;
    private String status;
    private String createdAt;

    public Booking(String id, int movieId, int cinemaId, int showtimeId, List<String> seats, double totalPrice, String status, String createdAt) {
        this.id = id;
        this.movieId = movieId;
        this.cinemaId = cinemaId;
        this.showtimeId = showtimeId;
        this.seats = seats;
        this.totalPrice = totalPrice;
        this.status = status;
        this.createdAt = createdAt;
    }

    public String toJson() {
        StringBuilder seatsJson = new StringBuilder("[");
        for (int i = 0; i < seats.size(); i++) {
            seatsJson.append("\"").append(seats.get(i)).append("\"");
            if (i < seats.size() - 1) seatsJson.append(",");
        }
        seatsJson.append("]");

        return "{" +
                "\"id\":\"" + id + "\"," +
                "\"movieId\":" + movieId + "," +
                "\"cinemaId\":" + cinemaId + "," +
                "\"showtimeId\":" + showtimeId + "," +
                "\"seats\":" + seatsJson.toString() + "," +
                "\"totalPrice\":" + totalPrice + "," +
                "\"status\":\"" + status + "\"," +
                "\"createdAt\":\"" + createdAt + "\"" +
                "}";
    }
}
