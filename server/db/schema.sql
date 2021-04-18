DROP TABLE IF EXISTS books;

CREATE TABLE books(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    page_count INTEGER NOT NULL,
    description VARCHAR(255) NOT NULL,
    fiction BOOLEAN NOT NULL
);

CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    body VARCHAR(255) NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    book_id INTEGER REFERENCES books(id)
);


INSERT INTO books (title, author, page_count, description, fiction)
VALUES ('A', 'A', 10, 'AAA', TRUE),
        ('B', 'B', 100, 'BBB', FALSE),
        ('C', 'C', 1000, 'CCC', TRUE);


