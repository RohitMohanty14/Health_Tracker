package com.healthtracker.model;

import java.time.LocalDate;
import java.util.UUID;

public record HealthEntry(
    UUID entryId,
    UUID userId, // Link to the User
    LocalDate entryDate,
    int steps,
    double sleepHours,
    int calories
) {
    // Custom constructor for basic validation
    public HealthEntry {
        if (entryId == null) {
            throw new IllegalArgumentException("Entry ID cannot be null.");
        }
        if (userId == null) {
            throw new IllegalArgumentException("User ID cannot be null.");
        }
        if (entryDate == null) {
            throw new IllegalArgumentException("Entry date cannot be null.");
        }
        if (steps < 0) {
            throw new IllegalArgumentException("Steps cannot be negative.");
        }
        if (sleepHours < 0 || sleepHours > 24) {
            throw new IllegalArgumentException("Sleep hours must be between 0 and 24.");
        }
        if (calories < 0) {
            throw new IllegalArgumentException("Calories cannot be negative.");
        }
    }
}
