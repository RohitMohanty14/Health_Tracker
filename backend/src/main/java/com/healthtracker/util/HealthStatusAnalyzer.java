package com.healthtracker.util;

// Define an enum for different health statuses
enum SleepHealthCategory {
    SEVERE_DEFICIT,
    MILD_DEFICIT,
    OPTIMAL,
    SLIGHT_EXCESS,
    EXCESSIVE_SLEEP,
    INVALID_HOURS; // Should ideally be caught by validation before this point
}

public class HealthStatusAnalyzer {

    /**
     * Categorizes sleep health based on hours of sleep using a Java 21 switch expression.
     * @param sleepHours The hours of sleep for a given entry.
     * @return A SleepHealthCategory indicating the sleep status.
     */
    public static SleepHealthCategory categorizeSleepHours(double sleepHours) {
        // Use if-else for precise range checking since switch on double is not allowed
        if (sleepHours >= 0 && sleepHours < 4) {
            return SleepHealthCategory.SEVERE_DEFICIT; // 0 to <4 hours
        } else if (sleepHours >= 4 && sleepHours < 7) {
            return SleepHealthCategory.MILD_DEFICIT;   // 4 to <7 hours
        } else if (sleepHours >= 7 && sleepHours <= 9) {
            return SleepHealthCategory.OPTIMAL;        // 7 to 9 hours (inclusive)
        } else if (sleepHours > 9 && sleepHours <= 12) {
            return SleepHealthCategory.SLIGHT_EXCESS;  // >9 to 12 hours
        } else if (sleepHours > 12 && sleepHours <= 24) {
            return SleepHealthCategory.EXCESSIVE_SLEEP; // >12 to 24 hours
        } else {
            return SleepHealthCategory.INVALID_HOURS; // Outside 0-24, should be prevented by DTO validation
        }
    }

    // Example of another switch expression for steps, perhaps for an achievement system
    public static String getStepsAchievement(int steps) {
        if (steps >= 10000) {
            return "Marathoner!";
        } else if (steps >= 7500) {
            return "Active Walker!";
        } else if (steps >= 5000) {
            return "Consistent Mover!";
        } else if (steps >= 1000) {
            return "Getting Started!";
        } else if (steps >= 0) {
            return "Needs More Movement!";
        } else {
            return "Invalid Steps Count"; // Should be caught by DTO validation
        }
    }

    // Main method for a quick local test (not part of your application flow)
    public static void main(String[] args) {
        System.out.println("Sleep for 6.5 hours: " + categorizeSleepHours(6.5)); // MILD_DEFICIT
        System.out.println("Sleep for 8.0 hours: " + categorizeSleepHours(8.0)); // OPTIMAL
        System.out.println("Sleep for 15.0 hours: " + categorizeSleepHours(15.0)); // EXCESSIVE_SLEEP
        System.out.println("Sleep for -1.0 hours: " + categorizeSleepHours(-1.0)); // INVALID_HOURS (if not caught by DTO first)

        System.out.println("Steps 12000: " + getStepsAchievement(12000)); // Marathoner!
        System.out.println("Steps 6000: " + getStepsAchievement(6000));   // Consistent Mover!
        System.out.println("Steps 300: " + getStepsAchievement(300));     // Needs More Movement!
    }
}
