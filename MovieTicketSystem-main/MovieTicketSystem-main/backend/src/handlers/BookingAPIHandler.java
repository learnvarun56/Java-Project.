package handlers;

import models.Booking;
import models.Cinema;
import models.SeatLayout;
import models.Showtime;
import repository.DataRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

// OOP Polymorphism: Extends BaseHttpHandler
public class BookingAPIHandler extends BaseHttpHandler {
    private final DataRepository repository; // OOP Dependency Injection

    public BookingAPIHandler(DataRepository repository) {
        this.repository = repository;
    }

    @Override
    protected String handleRequest(String method, String path, String query, String body) throws Exception {
        Map<String, String> params = parseQueryParams(query);
        
        // /api/cinemas
        if (path.startsWith("/api/cinemas") && method.equalsIgnoreCase("GET")) {
            List<Cinema> cinemas = repository.getCinemas();
            StringBuilder sb = new StringBuilder("[");
            for (int i = 0; i < cinemas.size(); i++) {
                sb.append(cinemas.get(i).toJson());
                if (i < cinemas.size() - 1) sb.append(",");
            }
            sb.append("]");
            return sb.toString();
        }

        // /api/showtimes
        if (path.startsWith("/api/showtimes") && method.equalsIgnoreCase("GET")) {
            int cinemaId = -1;
            if (params.containsKey("cinemaId") && !params.get("cinemaId").equals("undefined")) {
                try { cinemaId = Integer.parseInt(params.get("cinemaId")); } catch(Exception e) {}
            }
            List<Showtime> showtimes = repository.getShowtimesByCinema(cinemaId);
            StringBuilder sb = new StringBuilder("[");
            for (int i = 0; i < showtimes.size(); i++) {
                sb.append(showtimes.get(i).toJson());
                if (i < showtimes.size() - 1) sb.append(",");
            }
            sb.append("]");
            return sb.toString();
        }

        // /api/seats
        if (path.startsWith("/api/seats") && method.equalsIgnoreCase("GET")) {
            int showtimeId = -1;
            if (params.containsKey("showtimeId")) {
                try { showtimeId = Integer.parseInt(params.get("showtimeId")); } catch(Exception e) {}
            }
            List<SeatLayout> layout = repository.getSeatLayout(showtimeId);
            StringBuilder sb = new StringBuilder("[");
            for (int i = 0; i < layout.size(); i++) {
                sb.append(layout.get(i).toJson());
                if (i < layout.size() - 1) sb.append(",");
            }
            sb.append("]");
            return sb.toString();
        }

        // /api/bookings POST
        if (path.startsWith("/api/bookings") && method.equalsIgnoreCase("POST")) {
            // Core Java: manual basic JSON extraction
            int movieId = extractInt(body, "movieId");
            int cinemaId = extractInt(body, "cinemaId");
            int showtimeId = extractInt(body, "showtimeId");
            double totalPrice = extractDouble(body, "totalPrice");
            List<String> seats = extractListChars(body, "seats");

            String bookingId = "BK-" + System.currentTimeMillis();
            Booking b = new Booking(bookingId, movieId, cinemaId, showtimeId, seats, totalPrice, "CONFIRMED", java.time.Instant.now().toString());
            
            repository.saveBooking(b);
            return b.toJson();
        }

        throw new Exception("Endpoint not found or method not supported");
    }

    private int extractInt(String json, String key) {
        String pattern = "\"" + key + "\":\\s*(\\d+)";
        java.util.regex.Matcher m = java.util.regex.Pattern.compile(pattern).matcher(json);
        if (m.find()) {
            return Integer.parseInt(m.group(1));
        }
        return 0;
    }

    private double extractDouble(String json, String key) {
        String pattern = "\"" + key + "\":\\s*([\\d.]+)";
        java.util.regex.Matcher m = java.util.regex.Pattern.compile(pattern).matcher(json);
        if (m.find()) {
            return Double.parseDouble(m.group(1));
        }
        return 0.0;
    }

    private List<String> extractListChars(String json, String key) {
        List<String> list = new ArrayList<>();
        String pattern = "\"" + key + "\":\\s*\\[(.*?)\\]";
        java.util.regex.Matcher m = java.util.regex.Pattern.compile(pattern).matcher(json);
        if (m.find()) {
            String arrInner = m.group(1);
            String[] items = arrInner.split(",");
            for (String item : items) {
                list.add(item.replace("\"", "").trim());
            }
        }
        return list;
    }
}
