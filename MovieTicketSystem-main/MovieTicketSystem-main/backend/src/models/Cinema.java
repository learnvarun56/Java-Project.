package models;
import java.util.List;

public class Cinema extends Entity {
    private String name;
    private String location;
    private List<String> facilities;
    private double rating;

    public Cinema(int id, String name, String location, List<String> facilities, double rating) {
        super(id);
        this.name = name;
        this.location = location;
        this.facilities = facilities;
        this.rating = rating;
    }

    @Override
    public String toJson() {
        StringBuilder facJson = new StringBuilder("[");
        for (int i = 0; i < facilities.size(); i++) {
            facJson.append(escape(facilities.get(i)));
            if (i < facilities.size() - 1) facJson.append(",");
        }
        facJson.append("]");

        return "{" +
                "\"id\":" + id + "," +
                "\"name\":" + escape(name) + "," +
                "\"location\":" + escape(location) + "," +
                "\"facilities\":" + facJson.toString() + "," +
                "\"rating\":" + rating +
                "}";
    }
}
