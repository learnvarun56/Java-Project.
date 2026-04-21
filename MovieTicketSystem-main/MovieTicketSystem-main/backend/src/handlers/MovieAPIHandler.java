package handlers;

import models.Movie;
import repository.DataRepository;

import java.util.List;
import java.util.Map;

// OOP Polymorphism: Extends BaseHttpHandler
public class MovieAPIHandler extends BaseHttpHandler {
    private final DataRepository repository; // OOP Composition

    public MovieAPIHandler(DataRepository repository) {
        this.repository = repository;
    }

    @Override
    protected String handleRequest(String method, String path, String query, String body) throws Exception {
        if (!method.equalsIgnoreCase("GET")) {
            throw new Exception("Method " + method + " not supported for movies");
        }

        // Parse path variables
        String[] segments = path.split("/");
        
        // /api/movies/featured
        if (segments.length == 4 && segments[3].equals("featured")) {
            List<Movie> movies = repository.getFeaturedMovies();
            return buildMoviesJsonArray(movies);
        }
        
        // /api/movies/search?q=
        if (segments.length == 4 && segments[3].equals("search")) {
            Map<String, String> params = parseQueryParams(query);
            List<Movie> movies = repository.searchMovies(params.getOrDefault("q", ""));
            return buildMoviesJsonArray(movies);
        }

        // /api/movies/:id
        if (segments.length == 4) {
            try {
                int id = Integer.parseInt(segments[3]);
                Movie m = repository.getMovieById(id);
                if (m != null) return m.toJson();
                else return "{}";
            } catch (NumberFormatException e) {
                // Ignore, continue down
            }
        }

        // /api/movies
        List<Movie> allMovies = repository.getAllMovies();
        return buildMoviesJsonArray(allMovies);
    }

    private String buildMoviesJsonArray(List<Movie> movies) {
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < movies.size(); i++) {
            sb.append(movies.get(i).toJson());
            if (i < movies.size() - 1) sb.append(",");
        }
        sb.append("]");
        return sb.toString();
    }
}
