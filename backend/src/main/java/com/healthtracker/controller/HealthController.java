package com.healthtracker.controller;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.healthtracker.dto.HealthEntryRequest;
import com.healthtracker.jdbc.HealthEntryDAO;
import com.healthtracker.model.HealthEntry;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/health") // Base path for health related endpoints
@CrossOrigin(origins = "http://localhost:63342") // IMPORTANT for development
public class HealthController {
    private static final Logger logger = LoggerFactory.getLogger(HealthController.class);

    // --- Mock Health Entry Storage (In a real app, this would be a database/service) ---
    private final List<HealthEntry> healthEntries = new ArrayList<>();
    // In a real app, you'd associate entries with a specific authenticated user.
    // For this simple example, we'll just add them globally.

    @PostMapping("/entry")
    public ResponseEntity<Map<String, String>> addHealthEntry(@Valid @RequestBody HealthEntryRequest healthEntryRequest) {
        Map<String, String> response = new HashMap<>();

        // In a real application, you would get the userId from the authenticated user's session/token
        UUID dummyUserId = UUID.fromString("123e4567-e89b-12d3-a456-426614174000"); // Example user ID

        HealthEntry newEntry = new HealthEntry(
            UUID.randomUUID(),
            dummyUserId,
            LocalDate.now(), // Current date for the entry
            healthEntryRequest.steps(),
            healthEntryRequest.sleepHours(),
            healthEntryRequest.calories()
        );

        healthEntries.add(newEntry);
        HealthEntryDAO dao = new HealthEntryDAO();
        dao.insertHealthEntry(newEntry);
        logger.info("New health entry added: {}", newEntry);// Log to console and logs folder

        response.put("message", "Health metrics submitted successfully!");
        response.put("entryId", newEntry.entryId().toString());
        return ResponseEntity.status(HttpStatus.CREATED).body(response); // 201 Created
    }

    // You can add more endpoints, e.g., to get all entries for a user:
    /*
    @GetMapping("/entries/{userId}")
    public ResponseEntity<List<HealthEntry>> getUserHealthEntries(@PathVariable UUID userId) {
        List<HealthEntry> userEntries = healthEntries.stream()
            .filter(entry -> entry.userId().equals(userId))
            .toList();
        return ResponseEntity.ok(userEntries);
    }
    */
}