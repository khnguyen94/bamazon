DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

SELECT * FROM products;

CREATE TABLE products(
    id INTEGER NOT NULL AUTO_INCREMENT, 
    item_name VARCHAR(30) NOT NULL, 
    price DECIMAL(10, 2), 
    quantity INTEGER(10), 
    PRIMARY KEY (id)
);

INSERT INTO products (item_name, price, quantity)
VALUES ("Shoes", 20.30, 2);

INSERT INTO products (item_name, price, quantity)
VALUES ("Shirt", 5.50, 4);

INSERT INTO products (item_name, price, quantity)
VALUES ("Pants", 31.80, 1);

INSERT INTO products (item_name, price, quantity)
VALUES ("Thong", 1, 1000);