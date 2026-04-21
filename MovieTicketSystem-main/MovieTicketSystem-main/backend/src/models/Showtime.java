package models;

public class Showtime extends Entity {
    private String time;
    private String format;
    private double price;
    private int seatsAvailable;
    private int cinemaId;

    public Showtime(int id, String time, String format, double price, int seatsAvailable, int cinemaId) {
        super(id);
        this.time = time;
        this.format = format;
        this.price = price;
        this.seatsAvailable = seatsAvailable;
        this.cinemaId = cinemaId;
    }

    public int getCinemaId() { return cinemaId; }

    @Override
    public String toJson() {
        return "{" +
                "\"id\":" + id + "," +
                "\"time\":" + escape(time) + "," +
                "\"format\":" + escape(format) + "," +
                "\"price\":" + price + "," +
                "\"seatsAvailable\":" + seatsAvailable + "," +
                "\"cinemaId\":" + cinemaId +
                "}";
    }
}
