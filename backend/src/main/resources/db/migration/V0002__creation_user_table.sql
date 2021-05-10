CREATE TABLE user(
    id BIGINT(19) PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    creation_date_time DATETIME NOT NULL,
    CONSTRAINT uq_user_email UNIQUE (email)
);

INSERT INTO user VALUES(DEFAULT, 'Administrator', 'administrator@agap2it.com', '$2a$10$SJeCp0XSedx44n7WbdnGZOWv9WSEP2Q5DWIZ0Y/hERR5xsDiKsyy.', CURRENT_TIMESTAMP);