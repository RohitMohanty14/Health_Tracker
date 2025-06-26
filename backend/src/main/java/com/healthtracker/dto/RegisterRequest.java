package com.healthtracker.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
    @NotBlank(message = "Full name is required")
    @Size(min = 2, message = "Full name must be at least 2 characters long")
    @Pattern(regexp = "^[a-zA-Z\\s.-]+$", message = "Full name can only contain letters, spaces, hyphens, and periods.")
    String fullName,

    @NotBlank(message = "Email address is required")
    @Email(message = "Invalid email format")
    String email,

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters long")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+={}\\[\\]:;<>,.?~\\\\-]).{8,}$",
             message = "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.")
    String password
    // confirmPassword is not part of the DTO sent to the server, as it's a client-side comparison.
    // Terms & conditions agreement is implied by submission or handled as a separate boolean field if needed.
) {}