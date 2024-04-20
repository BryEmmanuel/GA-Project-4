CREATE DATABASE kdrama;

CREATE TABLE useraccount(
    id SERIAL PRIMARY KEY,
    username VARCHAR(16) NOT NULL,
    email text NOT NULL,
    hash text NOT NULL,
    role text NOT NULL,
    profile_picture_url text
)

INSERT INTO useraccount(username, email, password, role, profile_picture_url) VALUES ('test', 'test@test.com', 'password', 'user', 'https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U')