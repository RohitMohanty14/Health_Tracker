package com.healthtracker.jdbc;

import com.healthtracker.model.User;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Timestamp;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class UserDAO {
    private static final Logger logger = LoggerFactory.getLogger(UserDAO.class);

    public void insertUser(User user) {
        String sql = "INSERT INTO users (user_id, username, email, password_hash, created_at) VALUES (?, ?, ?, ?, ?)";

        try (Connection conn = OracleDBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, user.userId().hashCode()); // converting UUID to int
            stmt.setString(2, user.fullName());
            stmt.setString(3, user.email());
            stmt.setString(4, user.hashedPassword());
            stmt.setTimestamp(5, Timestamp.valueOf(user.registrationDate()));

            int rows = stmt.executeUpdate();
            logger.info(" Inserted {} user(s) into the database.", rows);
        } catch (SQLException e) {
            logger.error(" Error inserting user: {}", e.getMessage());
        }
    }
}
