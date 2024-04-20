CREATE DATABASE kdrama;

CREATE TABLE useraccount(
    id SERIAL PRIMARY KEY,
    username VARCHAR(16) NOT NULL,
    email text NOT NULL,
    hash text NOT NULL,
    role text NOT NULL,
    profile_picture_url text
)

CREATE TABLE roles(
    role text NOT NULL
)

INSERT INTO roles(role) VALUES ('Admin')
INSERT INTO roles(role) VALUES ('User')

INSERT INTO useraccount(username, email, password, role, profile_picture_url) VALUES ('test', 'test@test.com', 'password', 'user', 'https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U')


CREATE TABLE k_dramas(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    number_of_episodes INT,
    year_released INT,
    plot TEXT,
    image_url VARCHAR(255),
    genre JSONB 
)