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
    "look" Boolean not null,
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
