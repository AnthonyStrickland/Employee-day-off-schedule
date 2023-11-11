DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCRAMENT PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCRAMENT PRIMARY KEY,
    title VARCHAR(30),
    slary DECIMAL,
    department_id INT
    FOREIGN KEY (department_id)
    REFRENCES (department_id)
    ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCRAMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT
    FOREIGN KEY (role_id)
    REFRENCES (role_id)
);

