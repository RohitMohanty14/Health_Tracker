package com.healthtracker.model;

import java.time.LocalDateTime;
import java.util.UUID;

public record User(
    UUID userId,
    String fullName,
    String email,
    String hashedPassword, // Stores the hashed password (e.g., from BCrypt)
    LocalDateTime registrationDate
) {
    // Custom constructor for basic validation or initialization logic
    public User {
        if (userId == null) {
            throw new IllegalArgumentException("User ID cannot be null.");
        }
        if (fullName == null || fullName.trim().isEmpty()) {
            throw new IllegalArgumentException("Full name cannot be empty.");
        }
        if (email == null || email.trim().isEmpty()) {
            throw new IllegalArgumentException("Email cannot be empty.");
        }
        if (hashedPassword == null || hashedPassword.trim().isEmpty()) {
            throw new IllegalArgumentException("Hashed password cannot be empty.");
        }
        if (registrationDate == null) {
            throw new IllegalArgumentException("Registration date cannot be null.");
        }
    }
}