package com.healthtracker;

import com.healthtracker.model.User;
import com.healthtracker.model.HealthEntry;
import com.healthtracker.jdbc.UserDAO;
import com.healthtracker.jdbc.HealthEntryDAO;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

public class Main {
    public static void main(String[] args) {
        UUID userId = UUID.randomUUID();

        User user = new User(
            userId,
            "User1",
            "user1@example.com",
            "hashedPass123",
            LocalDateTime.now()
        );

        HealthEntry entry = new HealthEntry(
            UUID.randomUUID(),
            userId,
            LocalDate.now(),
            9000,
            7.2,
            2000
        );

        new UserDAO().insertUser(user);
        new HealthEntryDAO().insertHealthEntry(entry);
    }
}
