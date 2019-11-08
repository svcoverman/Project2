DROP DATABASE IF EXISTS mygaragedb;
CREATE DATABASE mygaragedb;

CREATE TABLE users
(
    id int not null auto_increment,
    users_name varchar(50) not null,
    primary key (id)
);

create table carsWant
(
    car_year int not null,
    car_make varchar (50) not null,
    car_model varchar (50) not null,
    car_trim varchar (50) not null,
    primary key (id),
    foreign key (users_name) references users(id)
);

create table warsHave
(
    car_year int not null,
    car_make varchar (50) not null,
    car_model varchar (50) not null,
    car_trim varchar (50) not null,
    primary key (id),
    foreign key (users_name) references users(id)
);