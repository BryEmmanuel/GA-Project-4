CREATE DATABASE kdrama;

CREATE TABLE useraccount(
    id SERIAL PRIMARY KEY,
    username VARCHAR(16) NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    role text NOT NULL,
    profile_picture_url text
)

