CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER
);

INSERT INTO users (name, age) VALUES ('John Doe', 30);
