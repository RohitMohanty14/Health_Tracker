INSERT INTO users (username, email, password_hash, date_of_birth)
VALUES 
('john_doe', 'john@example.com', 'hashed123', TO_DATE('1990-01-01','YYYY-MM-DD')),
('jane_smith', 'jane@example.com', 'hashed456', TO_DATE('1992-03-15','YYYY-MM-DD'));
