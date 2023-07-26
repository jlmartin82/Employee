INSERT INTO department (name)
VALUES ('Sales'),
  ('Marketing'),
  ('Engineering');

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Manager', 60000, 1),
  ('Sales Representative', 40000, 1),
  ('Marketing Manager', 55000, 2),
  ('Marketing Coordinator', 35000, 2),
  ('Software Engineer', 70000, 3),
  ('Product Manager', 65000, 3);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, NULL),
  ('Jane', 'Smith', 2, 1),
  ('Mike', 'Johnson', 3, NULL),
  ('Sarah', 'Williams', 4, 3),
  ('David', 'Brown', 5, NULL),
  ('Emily', 'Jones', 6, 5);