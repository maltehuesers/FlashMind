-- Backend: MySQL Datenbank-Schema

CREATE DATABASE IF NOT EXISTS flashcards_db;
USE flashcards_db;

CREATE TABLE sets (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    createdAt VARCHAR(50)
);

CREATE TABLE cards (
    id INT AUTO_INCREMENT PRIMARY KEY,  
    set_id VARCHAR(50),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    FOREIGN KEY (set_id) REFERENCES sets(id) ON DELETE CASCADE
);