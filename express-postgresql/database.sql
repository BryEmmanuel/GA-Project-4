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
)

CREATE TABLE casts(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    year_of_birth INT,
    height NUMERIC (5,2),
)

CREATE TABLE genres (
    genre_id SERIAL PRIMARY KEY,
    genre_name VARCHAR(255) NOT NULL UNIQUE
);

INSERT INTO genres (genre_name) VALUES
('ACTION'),
('HORROR'),
('ROMANCE'),
('FANTASY'),
('THRILLER'),
('COMEDY');

ALTER TABLE k_dramas
ADD COLUMN genre_id INT,
ADD CONSTRAINT fk_genre
FOREIGN KEY (genre_id) REFERENCES genres(genre_id);

ALTER TABLE k_dramas
DROP COLUMN genre;

