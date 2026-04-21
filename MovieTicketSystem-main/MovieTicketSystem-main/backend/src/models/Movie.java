package models;
import java.util.List;

public class Movie extends Entity {
    private String title;
    private String genre;
    private String duration;
    private double rating;
    private String releaseDate;
    private String posterUrl;
    private String backdropUrl;
    private String synopsis;
    private String director;
    private List<String> cast;
    private String language;
    private String certification;

    public Movie(int id, String title, String genre, String duration, double rating, String releaseDate,
                 String posterUrl, String backdropUrl, String synopsis, String director,
                 List<String> cast, String language, String certification) {
        super(id);
        this.title = title;
        this.genre = genre;
        this.duration = duration;
        this.rating = rating;
        this.releaseDate = releaseDate;
        this.posterUrl = posterUrl;
        this.backdropUrl = backdropUrl;
        this.synopsis = synopsis;
        this.director = director;
        this.cast = cast;
        this.language = language;
        this.certification = certification;
    }

    // Encapsulation - Getters
    public String getTitle() { return title; }

    @Override
    public String toJson() {
        StringBuilder castJson = new StringBuilder("[");
        for (int i = 0; i < cast.size(); i++) {
            castJson.append(escape(cast.get(i)));
            if (i < cast.size() - 1) castJson.append(",");
        }
        castJson.append("]");

        return "{" +
                "\"id\":" + id + "," +
                "\"title\":" + escape(title) + "," +
                "\"genre\":" + escape(genre) + "," +
                "\"duration\":" + escape(duration) + "," +
                "\"rating\":" + rating + "," +
                "\"releaseDate\":" + escape(releaseDate) + "," +
                "\"posterUrl\":" + escape(posterUrl) + "," +
                "\"backdropUrl\":" + escape(backdropUrl) + "," +
                "\"synopsis\":" + escape(synopsis) + "," +
                "\"director\":" + escape(director) + "," +
                "\"cast\":" + castJson.toString() + "," +
                "\"language\":" + escape(language) + "," +
                "\"certification\":" + escape(certification) +
                "}";
    }
}
