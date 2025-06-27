package com.healthtracker.jdbc;

import com.healthtracker.model.HealthEntry;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Timestamp;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HealthEntryDAO {
    private static final Logger logger = LoggerFactory.getLogger(HealthEntryDAO.class);

    public void insertHealthEntry(HealthEntry entry) {
        String sql = "INSERT INTO health_logs (log_id, user_id, log_date, steps, calories, sleep_hours, created_at) " +
                     "VALUES (?, ?, ?, ?, ?, ?, ?)";

        try (Connection conn = OracleDBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, entry.entryId().hashCode()); // Map UUID to int
            stmt.setInt(2, entry.userId().hashCode());  // Same userId as in User table
            stmt.setDate(3, Date.valueOf(entry.entryDate()));
            stmt.setInt(4, entry.steps());
            stmt.setInt(5, entry.calories());
            stmt.setDouble(6, entry.sleepHours());
            stmt.setTimestamp(7, new Timestamp(System.currentTimeMillis()));

            int rows = stmt.executeUpdate();
            logger.info(" Inserted {} health entry(ies) into the database.", rows);
        } catch (SQLException e) {
            logger.error(" Error inserting health entry: {}", e.getMessage());
        }
    }
}
