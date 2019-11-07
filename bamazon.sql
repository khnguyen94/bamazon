DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

SELECT * FROM products;

CREATE TABLE products(
    id INTEGER NOT NULL AUTO_INCREMENT, 
    department VARCHAR(30) NOT NULL, 
    item_name VARCHAR(30) NOT NULL, 
    price DECIMAL(10, 2), 
    quantity INTEGER(10), 
    PRIMARY KEY (id)
);

-- Add some items as stock 
-- Clothing
INSERT INTO products (item_name, department, price, quantity)
VALUES ("Shoes", "Clothing", 120.00, 30), ("Shirt", "Clothing", 10.50, 40), ("Pants", "Clothing", 35.50, 25), ("Thong", "Clothing", 1.00, 1000);


-- Electronics
INSERT INTO products (item_name, department, price, quantity)
VALUES ("TV", "Electronics", 520.00, 10), ("PS4", "Electronics", 300.00, 5), ("XBOX", "Electronics", 300.00, 5), ("Macbook Pro", "Electronics", 1800.00, 3);


-- Produce
INSERT INTO products (item_name, department, price, quantity)
VALUES ("Apples", "Produce", 0.50, 65), ("Bananas", "Produce", 0.70, 90), ("Oranges", "Produce", 0.60, 45), ("Watermelon", "Produce", 5.50, 30);
