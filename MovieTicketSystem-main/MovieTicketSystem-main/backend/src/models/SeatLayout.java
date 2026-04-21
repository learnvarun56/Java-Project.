package models;
import java.util.List;

public class SeatLayout {
    private String row;
    private List<Seat> seats;

    public SeatLayout(String row, List<Seat> seats) {
        this.row = row;
        this.seats = seats;
    }

    public String toJson() {
        StringBuilder seatsJson = new StringBuilder("[");
        for (int i = 0; i < seats.size(); i++) {
            seatsJson.append(seats.get(i).toJson());
            if (i < seats.size() - 1) seatsJson.append(",");
        }
        seatsJson.append("]");

        return "{" +
                "\"row\":\"" + row + "\"," +
                "\"seats\":" + seatsJson.toString() +
                "}";
    }
}
