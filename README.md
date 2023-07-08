# SQL Challenge: Employee Tracker

This is a command-line application built using Node.js, Inquirer, and MySQL that allows you to manage a company's employee database. With this application, you can view and manage departments, roles, and employees in your company, helping you organize and plan your business efficiently.

## Walkthrough Video

Please check out the [walkthrough video](<link-to-video>) that demonstrates the functionality of the application and showcases all the acceptance criteria being met.

## User Story

As a business owner, I want to be able to view and manage the departments, roles, and employees in my company so that I can organize and plan my business effectively.

## Acceptance Criteria

- The command-line application accepts user input.
- Upon starting the application, the following options are presented:
  - View all departments
  - View all roles
  - View all employees
  - Add a department
  - Add a role
  - Add an employee
  - Update an employee role
- When choosing to view all departments, a formatted table is displayed, showing department names and department IDs.
- When choosing to view all roles, a formatted table is displayed, showing job titles, role IDs, the corresponding departments, and salaries for each role.
- When choosing to view all employees, a formatted table is displayed, showing employee IDs, first names, last names, job titles, departments, salaries, and the managers they report to.
- When choosing to add a department, the user is prompted to enter the name of the department, which is then added to the database.
- When choosing to add a role, the user is prompted to enter the name, salary, and department for the role, which is then added to the database.
- When choosing to add an employee, the user is prompted to enter the employee's first name, last name, role, and manager. The employee is then added to the database.
- When choosing to update an employee role, the user is prompted to select an employee to update and their new role. The information is then updated in the database.

## Getting Started

To run the application, you'll need to perform the following steps:

1. Install the required dependencies by running the command `npm install`.
2. Make sure you have MySQL installed and running.
3. Create the database schema by executing the SQL queries in the `schema.sql` file. This will set up the necessary tables.
4. (Optional) If you want to pre-populate the database with sample data, you can execute the SQL queries in the `seeds.sql` file.
5. Open the `connection.js` file and update the database credentials with your own. Note: Take care to keep your password secure.
6. Run the application by executing the command `node index.js` or `npm start` in the terminal.

Ensure you have npm package 'inquirer@8.2.4' installed by running the command `npm i inquirer@8.2.4` before running the application.

## Database Schema

The database schema consists of three tables: `department`, `role`, and `employee`. Here is the structure of each table:

### department

- id: INT PRIMARY KEY
- name: VARCHAR(30) (to hold department name)

### role

- id: INT PRIMARY KEY
- title: VARCHAR(30) (to hold role title)
- salary: DECIMAL (to hold role salary)
- department_id: INT (to hold reference to department the role belongs to)

### employee

- id: INT PRIMARY KEY
- first_name: VARCHAR(30) (to hold employee first name)
- last_name: VARCHAR(30) (to hold employee last name)
- role_id: INT (to hold reference to employee role)
- manager_id: INT (to hold reference to another employee that is the manager of the current employee, null if no manager)



