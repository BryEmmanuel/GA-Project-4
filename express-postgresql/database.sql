-- All the queries I wrote for this project

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

ALTER TABLE casts
ADD COLUMN k_drama_id INT,
ADD CONSTRAINT fk_k_drama
FOREIGN KEY (k_drama_id) REFERENCES k_dramas(id)

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
('COMEDY'),
('REVENGE');

ALTER TABLE k_dramas
ADD COLUMN genre_id INT,
ADD CONSTRAINT fk_genre
FOREIGN KEY (genre_id) REFERENCES genres(genre_id);

ALTER TABLE k_dramas
DROP COLUMN genre;

-- https://www.postgresqltutorial.com/postgresql-date-functions/postgresql-current_timestamp/ for created_at

CREATE TABLE discussion (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    number_of_likes INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    k_drama_id INTEGER,
    FOREIGN KEY (k_drama_id) REFERENCES k_dramas(id)
);

ALTER TABLE discussion
ADD COLUMN description TEXT;



CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    discussion_id INTEGER,
    user_id INTEGER,
    contents TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (discussion_id) REFERENCES discussion(id),
    FOREIGN KEY (user_id) REFERENCES useraccount(id)
);

ALTER TABLE comments
ADD COLUMN parent_id INTEGER REFERENCES comments(id);

ALTER TABLE discussion
ADD COLUMN user_id INTEGER,
ADD CONSTRAINT fk_discussion_useraccount
FOREIGN KEY (user_id) REFERENCES useraccount(id);

ALTER TABLE k_dramas
ADD COLUMN youtube_url VARCHAR(255);


UPDATE k_dramas
SET youtube_url = 'embedId'
WHERE id = $1;


ALTER TABLE k_dramas
ADD COLUMN is_deleted BOOLEAN DEFAULT FALSE;

ALTER TABLE discussion
ADD COLUMN is_deleted BOOLEAN DEFAULT FALSE;

ALTER TABLE comments
ADD COLUMN is_deleted BOOLEAN DEFAULT FALSE;


CREATE TABLE favorites(
    user_id INT NOT NULL,
    kdrama_id INT NOT NULL,
    PRIMARY KEY (user_id, kdrama_id),
    FOREIGN KEY (user_id) REFERENCES useraccount(id),
    FOREIGN KEY (kdrama_id) REFERENCES k_dramas(id) 
);

ALTER TABLE favorites 
ADD COLUMN is_deleted BOOLEAN DEFAULT FALSE;

ALTER TABLE favorites 
RENAME COLUMN is_deleted TO is_favorited;

