package com.healthtracker.jdbc;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class OracleDBUtil {
    private static final String URL = "jdbc:oracle:thin:@localhost:1521/XEPDB1";
    private static final String USER = "healthuser";
    private static final String PASSWORD = "healthpass";

    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }

    // For testing
    public static void main(String[] args) {
        try (Connection conn = getConnection()) {
            System.out.println("Connected to Oracle DB!");
        } catch (SQLException e) {
            System.out.println("Connection failed: " + e.getMessage());
        }
    }
}
