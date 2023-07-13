
INSERT INTO department (id, name) VALUES
  (1, 'Sales'),
  (2, 'Marketing'),
  (3, 'Engineering');


INSERT INTO role (id, title, salary, department_id) VALUES
  (1, 'Sales Manager', 60000, 1),
  (2, 'Sales Representative', 40000, 1),
  (3, 'Marketing Manager', 55000, 2),
  (4, 'Marketing Coordinator', 35000, 2),
  (5, 'Software Engineer', 70000, 3),
  (6, 'Product Manager', 65000, 3);


INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES
  (1, 'John', 'Doe', 1, NULL),
  (2, 'Jane', 'Smith', 2, 1),
  (3, 'Mike', 'Johnson', 3, NULL),
  (4, 'Sarah', 'Williams', 4, 3),
  (5, 'David', 'Brown', 5, NULL),
  (6, 'Emily', 'Jones', 6, 5);




