INSERT INTO department(name)
VALUES ("Sales"),
       ("Legal"),
       ("Finance"),
       ("HR");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales person", 50000, 1),
       ("Sales Manager", 75000, 1),
       ("Lawyer", 80000, 2),
       ("Legal Assistant", 70000, 2),
       ("Chief Finance", 75000, 3),
       ("Accountant", 60000, 3),
       ("HR Manager", 75000, 4),
       ("HR Rep", 60000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bruce", "Wayne", 1, null),
       ("Wade", "Wilson", 2, 1),
       ("Peter", "Parker", 3, null),
       ("Clark", "Kent", 4, 3),
       ("Mary", "Jane", 5, 4),
       ("Selena", "Kyle", 6, null),
       ("Lois", "Lane", 7, 6),
       ("Harley", "Quinn", 8, null);