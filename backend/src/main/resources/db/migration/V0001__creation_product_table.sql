CREATE TABLE product(
    id BIGINT(19) PRIMARY KEY AUTO_INCREMENT,
    sku VARCHAR(12) NOT NULL,
    name VARCHAR(200) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    creation_date_time DATETIME NOT NULL,
    deleted BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT uk_product_sku UNIQUE (sku)
);