const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer')

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Sq-283.1', 
  database: 'employee_db',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ', err);
  } else {
    console.log('Connected to the employee_db database.');
  }
});

function loadPrompt() {
  inquirer.prompt([
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
      ]
    }
  ]).then((answers) => {
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
    }
  });
}


function viewEmployees() {
  const sql = 'SELECT * FROM department';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error retrieving departments: ', err);
      
    } else {
      console.log(results);
    }
  });
}

function viewRoles() {
  const sql = 'SELECT * FROM role';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error retrieving roles: ', err);
      
    } else {
      console.log(results);
    }
  });
}

function viewDepartments() {
  const sql = 'SELECT * FROM department';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error retrieving departments: ', err);
    } else {
      console.log(results);
    }
  });
}

async function retrieveRoles() {
  try {
    const sql = 'SELECT * FROM role';
    const [rows] = await db.query(sql);
    console.log(rows);
  } catch (err) {
    console.error('Error retrieving roles: ', err);
  }
}


// Retrieve all roles
app.get('/api/roles', (req, res) => {
  const sql = 'SELECT * FROM role';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error retrieving roles: ', err);
      res.status(500).json({ error: 'Failed to retrieve roles.' });
    } else {
      res.json(results);
    }
  });
});

// Retrieve all employees
app.get('/api/employees', (req, res) => {
  const sql = 'SELECT * FROM employee';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error retrieving employees: ', err);
      res.status(500).json({ error: 'Failed to retrieve employees.' });
    } else {
      res.json(results);
    }
  });
});

// Add a department
app.post('/api/add-department', (req, res) => {
  const { name } = req.body;

  const sql = 'INSERT INTO department (name) VALUES (?)';
  const values = [name];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error adding department: ', err);
      res.status(500).json({ error: 'Failed to add department.' });
    } else {
      const department = { id: result.insertId, name };
      res.status(201).json(department);
    }
  });
});

// Add a role
app.post('/api/add-role', (req, res) => {
  const { title, salary, departmentId } = req.body;

  const sql = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
  const values = [title, salary, departmentId];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error adding role: ', err);
      res.status(500).json({ error: 'Failed to add role.' });
    } else {
      const role = { id: result.insertId, title, salary, departmentId };
      res.status(201).json(role);
    }
  });
});

// Add an employee
app.post('/api/add-employee', (req, res) => {
  const { firstName, lastName, roleId, managerId } = req.body;

  const sql = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
  const values = [firstName, lastName, roleId, managerId];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error adding employee: ', err);
      res.status(500).json({ error: 'Failed to add employee.' });
    } else {
      const employee = { id: result.insertId, firstName, lastName, roleId, managerId };
      res.status(201).json(employee);
    }
  });
});

// Update an employee's role
app.put('/api/update-employee-role/:id', (req, res) => {
  const { id } = req.params;
  const { roleId } = req.body;

  const sql = 'UPDATE employee SET role_id = ? WHERE id = ?';
  const values = [roleId, id];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating employee role: ', err);
      res.status(500).json({ error: 'Failed to update employee role.' });
    } else {
      res.sendStatus(204);
    }
  });
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

loadPrompt()