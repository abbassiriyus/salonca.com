create table filyal(
       "id" serial primary key,
       "image" text,
       "address" varchar(1000),
       "location" text not null,
       "longuage" text not null,
       "name" varchar(255) not null,
       "description" text not null,
       "phone" varchar(50) not null,
       "creator" integer not null,
       "min_time"  varchar(50) not null,
       "time_create" timestamp default current_timestamp not null,
       "time_update" timestamp default current_timestamp not null
);

create table users(
       "id" serial primary key,
       "phone" varchar(50),
       "password" text not null,
       "username" varchar(64) not null,
       "superadmin" Boolean default false not null, 
       "last_login" timestamp default current_timestamp not null, 
       "email" varchar(255) not null,
       "category" integer default 0 not null,
        unique(email),
       "time_create" timestamp default current_timestamp not null,
       "time_update" timestamp default current_timestamp not null
);
create table verify(
       "id" serial primary key,
       "email" varchar(255) not null,
       "username" varchar(64) not null,
       "password" text not null,
       "code" varchar(6) not null,
        "time_create" timestamp default current_timestamp not null,
       "time_update" timestamp default current_timestamp not null
);
create table filyal_mark(
    "id" serial primary key,
    "mark" text not null,
    "text" varchar(1000) not null,
    "look" Boolean default false not null,
    "creator" varchar(200) not null,
    "filyal_id" integer not null,
    "time_create" timestamp default current_timestamp not null,
    "time_update" timestamp default current_timestamp not null
);
create table zakaz(
    "id" serial primary key,
    "time_end" time not null,
    "time_start" time not null,
    "day_zakaz" date not null,
    "mutahasis_id" integer not null,
    "message" text not null,
    "user_id" integer not null,
    "time_create" timestamp default current_timestamp not null,
    "time_update" timestamp default current_timestamp not null
);
create table category(
    "id" serial primary key,
    "category" varchar(255) not null,
    "time_create" timestamp default current_timestamp not null,
    "time_update" timestamp default current_timestamp not null 
);
create table mutahasis(
    "id" serial primary key,
    "category" integer not null,
    "tavsif" text,
    "description" text not null,
    "filial_id" integer not null,
    "price" integer not null,
    "time_create" timestamp default current_timestamp not null,
    "time_update" timestamp default current_timestamp not null
);
create table mutahasis_time(
    "id" serial primary key,
    "time" text not null,
    "mutahasis_id" integer not null,
    "time_create" timestamp default current_timestamp not null,
    "time_update" timestamp default current_timestamp not null
);
create table mutahasis_image(
    "id" serial primary key,
    "image" text not null,
    "mutahasis_id" integer not null,
    "time_create" timestamp default current_timestamp not null,
    "time_update" timestamp default current_timestamp not null
);
create table filyal_image(
    "id" serial primary key,
    "image" text not null,
    "filyal_id" integer not null,
    "time_create" timestamp default current_timestamp not null,
    "time_update" timestamp default current_timestamp not null
);
create table xususiyat(
       "id" serial primary key,
       "title" varchar(200) not null,
       "time_create" timestamp default current_timestamp not null,
       "time_update" timestamp default current_timestamp not null
);
create table xususiyat_mutahasis(
       "id" serial primary key,
       "xususiyat_id" integer not null,
       "mutahasis_id" integer not null,
       "time_create" timestamp default current_timestamp not null,
       "time_update" timestamp default current_timestamp not null

);
create table xususiyat_filyal(
       "id" serial primary key,
       "xususiyat_id" integer not null,
       "filyal_id" integer not null,
       "time_create" timestamp default current_timestamp not null,
       "time_update" timestamp default current_timestamp not null
);
create table rayon(
       "id" serial primary key,
       "title" varchar(200) not null,
       "time_create" timestamp default current_timestamp not null,
       "time_update" timestamp default current_timestamp not null

);
create table metro(
       "id" serial primary key,
       "title" varchar(200) not null,
       "time_create" timestamp default current_timestamp not null,
       "time_update" timestamp default current_timestamp not null
);


create table metro_filyal(
         "id" serial primary key,
       "metro_id" integer not null,
       "filyal_id" integer not null,
       "time_create" timestamp default current_timestamp not null,
       "time_update" timestamp default current_timestamp not null
);
create table rayon_filyal(
         "id" serial primary key,
       "rayon_id" integer not null,
       "filyal_id" integer not null,
       "time_create" timestamp default current_timestamp not null,
       "time_update" timestamp default current_timestamp not null
);
create table contact(
   "id" serial primary key,
       "nomer" integer not null,
       "ism" varchar(20) not null,
       "creator" integer not null,
       "mutahasis_id" integer not null,
       "time_create" timestamp default current_timestamp not null,
       "time_update" timestamp default current_timestamp not null
)


ALTER SEQUENCE category_id_seq OWNED BY category.id;
GRANT USAGE, SELECT ON SEQUENCE category_id_seq TO abbasuz1_abbas;
ALTER SEQUENCE filyal_id_seq OWNED BY filyal.id;
GRANT USAGE, SELECT ON SEQUENCE filyal_id_seq TO abbasuz1_abbas;
ALTER SEQUENCE users_id_seq OWNED BY users.id;
GRANT USAGE, SELECT ON SEQUENCE users_id_seq TO abbasuz1_abbas;
ALTER SEQUENCE verify_id_seq OWNED BY verify.id;
GRANT USAGE, SELECT ON SEQUENCE verify_id_seq TO abbasuz1_abbas;
ALTER SEQUENCE filyal_mark_id_seq OWNED BY filyal_mark.id;
GRANT USAGE, SELECT ON SEQUENCE filyal_mark_id_seq TO abbasuz1_abbas;
ALTER SEQUENCE zakaz_id_seq OWNED BY zakaz.id;
GRANT USAGE, SELECT ON SEQUENCE zakaz_id_seq TO abbasuz1_abbas;
ALTER SEQUENCE category_id_seq OWNED BY category.id;
GRANT USAGE, SELECT ON SEQUENCE category_id_seq TO abbasuz1_abbas;
ALTER SEQUENCE mutahasis_id_seq OWNED BY mutahasis.id;
GRANT USAGE, SELECT ON SEQUENCE mutahasis_id_seq TO abbasuz1_abbas;
ALTER SEQUENCE mutahasis_time_id_seq OWNED BY mutahasis_time.id;
GRANT USAGE, SELECT ON SEQUENCE mutahasis_time_id_seq TO abbasuz1_abbas;
ALTER SEQUENCE mutahasis_image_id_seq OWNED BY mutahasis_image.id;
GRANT USAGE, SELECT ON SEQUENCE mutahasis_image_id_seq TO abbasuz1_abbas;
ALTER SEQUENCE filyal_image_id_seq OWNED BY filyal_image.id;
GRANT USAGE, SELECT ON SEQUENCE filyal_image_id_seq TO abbasuz1_abbas;
ALTER SEQUENCE xususiyat_id_seq OWNED BY xususiyat.id;
GRANT USAGE, SELECT ON SEQUENCE xususiyat_id_seq TO abbasuz1_abbas;
ALTER SEQUENCE xususiyat_mutahasis_id_seq OWNED BY xususiyat_mutahasis.id;
GRANT USAGE, SELECT ON SEQUENCE xususiyat_mutahasis_id_seq TO abbasuz1_abbas;
ALTER SEQUENCE xususiyat_filyal_id_seq OWNED BY xususiyat_filyal.id;
GRANT USAGE, SELECT ON SEQUENCE xususiyat_filyal_id_seq TO abbasuz1_abbas;
ALTER SEQUENCE rayon_id_seq OWNED BY rayon.id;
GRANT USAGE, SELECT ON SEQUENCE rayon_id_seq TO abbasuz1_abbas;
ALTER SEQUENCE metro_id_seq OWNED BY metro.id;
GRANT USAGE, SELECT ON SEQUENCE metro_id_seq TO abbasuz1_abbas;
ALTER SEQUENCE metro_filyal_id_seq OWNED BY metro_filyal.id;
GRANT USAGE, SELECT ON SEQUENCE metro_filyal_id_seq TO abbasuz1_abbas;
ALTER SEQUENCE rayon_filyal_id_seq OWNED BY rayon_filyal.id;
GRANT USAGE, SELECT ON SEQUENCE rayon_filyal_id_seq TO abbasuz1_abbas;
ALTER SEQUENCE contact_id_seq OWNED BY contact.id;
GRANT USAGE, SELECT ON SEQUENCE contact_id_seq TO abbasuz1_abbas;

GRANT SELECT, INSERT, UPDATE, DELETE ON users TO abbasuz1_abbas;
GRANT CREATE, ALTER, DROP ON users TO abbasuz1_abbas;