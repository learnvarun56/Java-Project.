import com.sun.net.httpserver.HttpServer;
import handlers.BookingAPIHandler;
import handlers.MovieAPIHandler;
import repository.DataRepository;
import repository.InMemoryRepository;

import java.io.IOException;
import java.net.InetSocketAddress;

public class Application {
    public static void main(String[] args) {
        try {
            // Setup Dependency Injection manually
            DataRepository repository = new InMemoryRepository();

            // Create HttpServer on port 8080
            HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);

            // Register handlers
            server.createContext("/api/movies", new MovieAPIHandler(repository));
            server.createContext("/api/cinemas", new BookingAPIHandler(repository));
            server.createContext("/api/showtimes", new BookingAPIHandler(repository));
            server.createContext("/api/seats", new BookingAPIHandler(repository));
            server.createContext("/api/bookings", new BookingAPIHandler(repository));

            server.setExecutor(null); // creates a default executor
            server.start();

            System.out.println("Object-Oriented Java Backend running on http://localhost:8080...");

        } catch (IOException e) {
            System.err.println("Failed to start server: " + e.getMessage());
        }
    }
}
