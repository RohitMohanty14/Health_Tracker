package com.healthtracker.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

public record HealthEntryRequest(
    @Min(value = 0, message = "Steps cannot be negative.")
    @Max(value = 150000, message = "Daily steps count seems unusually high.")
    int steps,

    @DecimalMin(value = "0.0", message = "Sleep hours cannot be negative.")
    @DecimalMax(value = "24.0", message = "Sleep hours must be between 0 and 24.")
    // Note: Backend enforces the "unusual" range as an error for strictness.
    @DecimalMin(value = "4.0", message = "Unusual sleep hours. Most adults need 7-9 hours of sleep.")
    @DecimalMax(value = "12.0", message = "Unusual sleep hours. Most adults need 7-9 hours of sleep.")
    double sleepHours,

    @Min(value = 0, message = "Calories cannot be negative.")
    @Min(value = 500, message = "Please enter a realistic daily calorie count (e.g., 500-15000).")
    @Max(value = 15000, message = "Please enter a realistic daily calorie count (e.g., 500-15000).")
    int calories
) {}
