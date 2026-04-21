package models;

public abstract class Entity {
    protected int id;

    public Entity(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    // Abstract method forcing subclasses to implement their own JSON representation
    public abstract String toJson();

    // Utility to format strings for JSON
    protected String escape(String value) {
        if (value == null) return "null";
        return "\"" + value.replace("\"", "\\\"") + "\"";
    }
}
