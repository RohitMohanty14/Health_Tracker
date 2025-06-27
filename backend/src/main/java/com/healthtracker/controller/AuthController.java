package com.healthtracker.controller;

import com.healthtracker.dto.LoginRequest;
import com.healthtracker.dto.RegisterRequest;
import com.healthtracker.model.User; 
import org.mindrot.jbcrypt.BCrypt; // For password hashing
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDateTime;
import java.util.UUID;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth") // Base path for auth related endpoints
@CrossOrigin(origins = "http://localhost:63342") // IMPORTANT for development: Allows requests from your local frontend server
// Adjust "http://localhost:63342" to your frontend's actual URL if using Live Server or another tool.
// For production, this should be your deployed frontend URL.
public class AuthController {

    //logger
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    // --- Mock User Storage (In a real app, this would be a database/service) ---
    private final Map<String, User> users = new HashMap<>(); // email -> User object

    // Placeholder for a user service
    private boolean userExists(String email) {
        return users.containsKey(email);
    }

    private User findUserByEmail(String email) {
        return users.get(email);
    }

    // --- Login Endpoint ---
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@Valid @RequestBody LoginRequest loginRequest) {
        Map<String, String> response = new HashMap<>();
        String email = loginRequest.email();
        logger.info("Login attempt for email: {}", email);

        User user = findUserByEmail(loginRequest.email());

        if (user == null) {
            logger.warn("Login failed - user not found: {}", email);
            response.put("message", "Invalid credentials: User not found.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        // Verify password using BCrypt
        if (BCrypt.checkpw(loginRequest.password(), user.hashedPassword())) {
            logger.info("Login successful for user: {}", email);
            response.put("message", "Login successful!");
            response.put("userId", user.userId().toString());
            return ResponseEntity.ok(response);
        } else {
            logger.warn("Login failed - incorrect password for user: {}", email);
            response.put("message", "Invalid credentials: Password incorrect.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    // --- Register Endpoint ---
    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@Valid @RequestBody RegisterRequest registerRequest) {
        Map<String, String> response = new HashMap<>();
        String email = registerRequest.email();

        logger.info("Register attempt for email: {}", email);


        if (userExists(email)) {
            logger.warn("Registration failed - email already exists: {}", email);
            response.put("message", "Email already registered.");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }

        // Hash the password before storing
        String hashedPassword = BCrypt.hashpw(registerRequest.password(), BCrypt.gensalt());

        // Create a new User object (in a real app, you'd save this to a database)
        User newUser = new User(
            UUID.randomUUID(),
            registerRequest.fullName(),
            registerRequest.email(),
            hashedPassword,
            LocalDateTime.now()
        );
        users.put(newUser.email(), newUser); // Store in mock map

        logger.info("Registration successful for email: {}", email);

        response.put("message", "Registration successful!");
        response.put("userId", newUser.userId().toString());
        return ResponseEntity.status(HttpStatus.CREATED).body(response); // 201 Created
    }

    // --- Global Exception Handler for Validation Errors ---
    // This is crucial to send detailed validation errors back to the frontend
    @ExceptionHandler(jakarta.validation.ConstraintViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<Map<String, String>> handleConstraintViolation(jakarta.validation.ConstraintViolationException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getConstraintViolations().forEach(violation -> {
            String fieldName = violation.getPropertyPath().toString();
            String errorMessage = violation.getMessage();
            errors.put(fieldName, errorMessage);
        });
        errors.put("globalMessage", "Validation failed. Please check your inputs.");
        return ResponseEntity.badRequest().body(errors);
    }
}