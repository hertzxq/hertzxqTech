CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    product VARCHAR(255),
    price DECIMAL,
    date TIMESTAMP DEFAULT NOW()
);