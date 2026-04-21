package models;

public class Seat {
    private String id;
    private int number;
    private String status;
    private double price;

    public Seat(String id, int number, String status, double price) {
        this.id = id;
        this.number = number;
        this.status = status;
        this.price = price;
    }

    public String toJson() {
        return "{" +
                "\"id\":\"" + id + "\"," +
                "\"number\":" + number + "," +
                "\"status\":\"" + status + "\"," +
                "\"price\":" + price +
                "}";
    }
}
