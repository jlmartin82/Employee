const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Sq-283.1",
  database: "employee_db",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: ", err);
  } else {
    console.log("Connected to the employee_db database.");
  }
});

function loadPrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "selection",
        message: "Make a selection",
        choices: [
          {
            name: "View all employees",
            value: "view_employees",
          },
          {
            name: "View all roles",
            value: "view_roles",
          },
          {
            name: "View all departments",
            value: "view_departments",
          },
          {
            name: "Retrieve all roles",
            value: "retrieve_roles",
          },
          {
            name: "Retrieve all employees",
            value: "retrieve_employees",
          },
          {
            name: "Add a department",
            value: "add_department",
          },
          {
            name: "Add a Role",
            value: "add_role",
          },
          {
            name: "Add a Employee",
            value: "add_employee",
          },
          {
            name: "Update an Employee's Role",
            value: "update_employee_Role",
          },
        ],
      },
    ])
    .then((answers) => {
      console.log(answers);
      switch (answers.selection) {
        case "view_employees":
          viewEmployees();
          break;
        case "view_roles":
          viewRoles();
          break;
        case "view_departments":
          viewDepartments();
          break;
        case "retrieve_roles":
          retrieveRoles();
          break;
        case "retrieve_employees":
          retrieveEmployees();
          break;
        case "add_department":
          addDepartment();
          break;
        case "add_role":
          addRole();
          break;
        case "add_employee":
          addEmployee();
          break;
        case "update_employee_role":
          updateEmployeeRole();
          break;
      }
    });
}

function viewEmployees() {
  const sql = "SELECT * FROM department";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error retrieving departments: ", err);
    } else {
      console.log(results);
    }
  });
}

function viewRoles() {
  const sql = "SELECT * FROM role";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error retrieving roles: ", err);
    } else {
      console.log(results);
    }
  });
}

function viewDepartments() {
  const sql = "SELECT * FROM department";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error retrieving departments: ", err);
    } else {
      console.log(results);
    }
  });
}

async function retrieveRoles() {
  try {
    const sql = "SELECT * FROM role";
    const [rows] = await db.query(sql);
    console.log(rows);
  } catch (err) {
    console.error("Error retrieving roles: ", err);
  }
}

async function retrieveEmployees() {
  try {
    const sql = "SELECT * FROM employee";
    const [rows] = await db.query(sql);
    console.log(rows);
  } catch (err) {
    console.error("Error retrieving employees: ", err);
  }
}

async function addDepartment() {
  try {
    const newDepartment = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the department name:",
        validate: (input) => input.trim() !== "",
      },
    ]);

    const sql = "INSERT INTO department (name) VALUES (?)";
    const values = [newDepartment.name];

    const [result] = await db.query(sql, values);
    const department = { id: result.insertId, name: newDepartment.name };
    console.log("New department added:", department);
  } catch (err) {
    console.error("Error adding department: ", err);
  }
}

async function addRole() {
  try {
    const newRole = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the role name:",
        validate: (input) => input.trim() !== "",
      },
    ]);

    const sql = "INSERT INTO role (name) VALUES (?)";
    const values = [newROle.name];

    const [result] = await db.query(sql, values);
    const role = { id: result.insertId, name: newRole.name };
    console.log("New role added:", role);
  } catch (err) {
    console.error("Error adding role: ", err);
  }
}
async function addEmployee() {
  try {
    const newEmployee = await inquirer.prompt([
      {
        type: "input",
        name: "firstName",
        message: "Enter the employee's first name:",
        validate: (input) => input.trim() !== "",
      },
      {
        type: "input",
        name: "lastName",
        message: "Enter the employee's last name:",
        validate: (input) => input.trim() !== "",
      },
      {
        type: "input",
        name: "roleId",
        message: "Enter the employee's role ID:",
        validate: (input) => !isNaN(input) && input.trim() !== "",
      },
      {
        type: "input",
        name: "managerId",
        message: "Enter the employee's manager ID (optional):",
        default: null,
        validate: (input) => input === "" || !isNaN(input),
      },
    ]);

    const sql =
      "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
    const values = [
      newEmployee.firstName,
      newEmployee.lastName,
      newEmployee.roleId,
      newEmployee.managerId,
    ];

    const [result] = await db.query(sql, values);
    const employee = {
      id: result.insertId,
      firstName: newEmployee.firstName,
      lastName: newEmployee.lastName,
      roleId: newEmployee.roleId,
      managerId: newEmployee.managerId,
    };
    console.log("New employee added:", employee);
  } catch (err) {
    console.error("Error adding employee: ", err);
  }
}
async function updateEmployeeRole() {
  try {
    const employees = await getEmployees();
    const roles = await getRoles();
    const employeeToUpdate = await inquirer.prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Select the employee to update:",
        choices: employees.map((employee) => ({
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id,
        })),
      },
      {
        type: "list",
        name: "newRoleId",
        message: "Select the new role for the employee:",
        choices: roles.map((role) => ({ name: role.title, value: role.id })),
      },
    ]);

    const sql = "UPDATE employee SET role_id = ? WHERE id = ?";
    const values = [employeeToUpdate.newRoleId, employeeToUpdate.employeeId];

    const [result] = await db.query(sql, values);

    if (result.affectedRows > 0) {
      console.log("Employee role updated successfully!");
    } else {
      console.log("Employee ID not found. Role update failed.");
    }
  } catch (err) {
    console.error("Error updating employee role: ", err);
  }
}

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Call the loadPrompt function once the server starts
loadPrompt();
