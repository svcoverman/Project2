DROP DATABASE IF EXISTS mygaragedb;
CREATE DATABASE mygaragedb;
USE mygaragedb;

CREATE TABLE users
(
    id int not null auto_increment,
    name varchar(50) not null,
    primary key (id)
);

create table cars
(
    id int not null auto_increment,
    year int not null,
    make varchar (50) not null,
    model varchar (50) not null,
    trim varchar (50),
    mileage int,
    user_key int not null,
    is_owned boolean not null,
    primary key (id),
    foreign key (user_key) references users(id)
);