-- Scripts for all my tables

-- Table: public.useraccount

-- DROP TABLE IF EXISTS public.useraccount;

CREATE TABLE IF NOT EXISTS public.useraccount
(
    id integer NOT NULL DEFAULT nextval('useraccount_id_seq'::regclass),
    username character varying(16) COLLATE pg_catalog."default" NOT NULL,
    email text COLLATE pg_catalog."default" NOT NULL,
    hash text COLLATE pg_catalog."default" NOT NULL,
    role text COLLATE pg_catalog."default" NOT NULL,
    profile_picture_url text COLLATE pg_catalog."default",
    CONSTRAINT useraccount_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.useraccount
    OWNER to bryanlim;

GRANT ALL ON TABLE public.useraccount TO bryanlim;

GRANT ALL ON TABLE public.useraccount TO db_user;

-- Table: public.roles

-- DROP TABLE IF EXISTS public.roles;

CREATE TABLE IF NOT EXISTS public.roles
(
    role text COLLATE pg_catalog."default" NOT NULL
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.roles
    OWNER to db_user;

-- Table: public.k_dramas

-- DROP TABLE IF EXISTS public.k_dramas;

CREATE TABLE IF NOT EXISTS public.k_dramas
(
    id integer NOT NULL DEFAULT nextval('k_dramas_id_seq'::regclass),
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    number_of_episodes integer,
    year_released integer,
    plot text COLLATE pg_catalog."default",
    image_url character varying(255) COLLATE pg_catalog."default",
    genre_id integer,
    youtube_url character varying(255) COLLATE pg_catalog."default",
    is_deleted boolean DEFAULT false,
    CONSTRAINT k_dramas_pkey PRIMARY KEY (id),
    CONSTRAINT fk_genre FOREIGN KEY (genre_id)
        REFERENCES public.genres (genre_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.k_dramas
    OWNER to db_user;


-- Table: public.genres

-- DROP TABLE IF EXISTS public.genres;

CREATE TABLE IF NOT EXISTS public.genres
(
    genre_id integer NOT NULL DEFAULT nextval('genres_genre_id_seq'::regclass),
    genre_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT genres_pkey PRIMARY KEY (genre_id),
    CONSTRAINT genres_genre_name_key UNIQUE (genre_name)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.genres
    OWNER to db_user;

-- Table: public.comments

-- DROP TABLE IF EXISTS public.comments;

CREATE TABLE IF NOT EXISTS public.comments
(
    id integer NOT NULL DEFAULT nextval('comments_id_seq'::regclass),
    discussion_id integer,
    user_id integer,
    contents text COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    parent_id integer,
    is_deleted boolean DEFAULT false,
    CONSTRAINT comments_pkey PRIMARY KEY (id),
    CONSTRAINT comments_discussion_id_fkey FOREIGN KEY (discussion_id)
        REFERENCES public.discussion (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT comments_parent_id_fkey FOREIGN KEY (parent_id)
        REFERENCES public.comments (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.useraccount (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.comments
    OWNER to db_user;

-- Table: public.discussion

-- DROP TABLE IF EXISTS public.discussion;

CREATE TABLE IF NOT EXISTS public.discussion
(
    id integer NOT NULL DEFAULT nextval('discussion_id_seq'::regclass),
    title character varying(255) COLLATE pg_catalog."default" NOT NULL,
    number_of_likes integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    k_drama_id integer,
    description text COLLATE pg_catalog."default",
    user_id integer,
    is_deleted boolean DEFAULT false,
    CONSTRAINT discussion_pkey PRIMARY KEY (id),
    CONSTRAINT discussion_k_drama_id_fkey FOREIGN KEY (k_drama_id)
        REFERENCES public.k_dramas (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_discussion_useraccount FOREIGN KEY (user_id)
        REFERENCES public.useraccount (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.discussion
    OWNER to db_user;

-- Table: public.favorites

-- DROP TABLE IF EXISTS public.favorites;

CREATE TABLE IF NOT EXISTS public.favorites
(
    user_id integer NOT NULL,
    kdrama_id integer NOT NULL,
    is_favorited boolean DEFAULT false,
    CONSTRAINT favorites_pkey PRIMARY KEY (user_id, kdrama_id),
    CONSTRAINT favorites_kdrama_id_fkey FOREIGN KEY (kdrama_id)
        REFERENCES public.k_dramas (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT favorites_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.useraccount (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.favorites
    OWNER to db_user;