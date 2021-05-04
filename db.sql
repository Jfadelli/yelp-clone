-- postgresqltutorial.com 

-- for help \/

-- list database \l

-- create database - CREATE DATABASE {databse_name} 

-- list all tables \d

-- list all fields in table \d {table_name}

-- Create Table EX
CREATE TABLE products(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50),
    price INT,
    on_sale BOOLEAN
);


INSERT INTO restaurants ( name, location, price_range) values('burger king', 'oceanside', 1);

CREATE TABLE reviews(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT check(rating >= 1 and rating <=5)
);

INSERT INTO reviews (restaurant_id, name, review, rating) values (9000, 'Carl', 'Restaurant was awesome', 4);