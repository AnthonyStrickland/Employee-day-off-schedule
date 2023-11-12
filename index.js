const mysql = require('mysql2');
const inquirer = require('inquirer'); 
require("dotenv").config();

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPw = process.env.DB_PW;
// connection to database
const db = mysql.createConnection({
  host: 'localhost',
  user: dbUser,
  password: dbPw,
  database: dbName
},
console.log("connected to the employees_db database,")
);

start();
function start() {
  inquirer.prompt({
    type: "list",
    choices: [
      "view departments", 
      "view roles",
      "view employees",
      "add department", 
      "add role", 
      "add employee", 
      "update employee role",
      "delete department",
      "delete employee",
      "delete role",
      "quit"
    ],
    message: "select an option",
    name: "option"
  })
  .then(function(result){
    console.log("you selected: " + result.option);

    switch (result.option) {
      case "view departments":
        viewDepartments();
        break;
      case "view roles":
        viewRoles();
        break;
      case "view employees":
        viewEmployees();
        break;
      case "add department":
        addDepartment();
        break;
      case "add role":
        addRole();
        break;
      case "add employee":
        addEmployee();
        break;
      case "update employee role":
        updateEmployee();
        break;
      case "delete department":
        deleteDepartment();
        break;
        case "delete role":
        deleteRole();
        break;
        case "delete employee":
        deleteEmployee();
        break;
      default:
        quit();



          
    }
  })
}
  function viewDepartments() {
    db.query("SELECT * FROM department ORDER BY name;", 
    function (err, results) {
          if (err) throw err;
          console.table(results);
          start();
  });
}

function viewRoles() {
  db.query("SELECT * FROM role JOIN department ON role.department_id = department.id;", 
  function (err, results) {
        if (err) throw err;
        console.table(results);
        start();
  });
}

function viewEmployees() {
  db.query("SELECT * FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ;", 
  function (err, results) {
        if (err) throw err;
        console.table(results);
        start();
  });
}

function addRole (){
  inquirer.prompt([{
    type: "input",
    message: "What role you would like to add",
    name: "roleName"
   },
  {
    type: "input",
    message: "What is the salary",
    name: "salary"
  },
  {
    type: "input",
    message: "What is the department id number",
    name: "deptID"
  }
])
  .then(function(answer){
    db.query("INSERT INTO role (title, salary, department_id) VALUES (?,?,?)", 
    [answer.roleName, answer.salary, answer.deptID],
    function(err, res) {
    if (err) throw err;
    viewRoles();
    start();
  });
});
}

 function addDepartment (){

  inquirer.prompt({
    type: "input",
    message: "What is the name of the department you would like to add",
    name: "deptName"
  })
  .then(function(answer){
    db.query("INSERT INTO department (name) VALUES (?)", [answer.deptName],
    function(err, res) {
    viewDepartments();
  });
  });
}

function addEmployee (){
inquirer.prompt([{
  type: "input",
  message: "what is the first name of the employee",
  name: "firstName"
},
{
  type: "input",
  message: "what is the last name of the employee",
  name: "lastName"
},
{
  type: "input",
  message: "what is the role ID",
  name: "roleID"
},
{
  type: "input",
  message: "what is the manager ID",
  name: "managerID"
}
])
.then(function(answer){
  db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)", 
  [answer.firstName, answer.lastName, answer.roleID, answer.managerID],
  function(err, res) {
  if (err) throw err;
  viewEmployees();
  start();
});
});
}

function deleteRole (){
  inquirer.prompt({
    type: "input",
    message: "What is the title of the role you would like to delete",
    name: "role"
  })
  .then(function(answer){
    db.query("DELETE FROM role WHERE title = ?", [answer.role],
    function(err, res) {
    if (err) throw err;
    viewRoles();
    start();
  });
  });
}
function deleteDepartment (){
  inquirer.prompt({
    type: "input",
    message: "What is the name of the department you would like to delete",
    name: "deptName"
  })
  .then(function(answer){
    db.query("DELETE FROM department WHERE name = ?", [answer.deptName],
    function(err, res) {
      if (err) throw err;
    viewDepartments();
    start();
  });
  });
}
function deleteEmployee (){
  inquirer.prompt({
    type: "input",
    message: "What is the id number of the employee you would like to delete",
    name: "ID"
  })
  .then(function(answer){
    db.query("DELETE FROM employee WHERE id = ?", [answer.ID],
    function(err, res) {
      if (err) throw err;
    viewEmployees();
    start();
  });
  });
}

// function updateEmployee (){
//   inquirer.prompt({
//     type: "input",
//     message: "which employee would you like to update",
//     name: "Employee"
//   },
//   {
//     type: "input",
//     message: "What would you like to update",
//     name: "updateRole"
//   })
//   .then(function(answer){
//     db.query("UPDATE employee SET = first_name, last_name, role_id, manager_id id = ?,?,?,?", 
//     [answer.fName, answer.lName, answer.roleID, answer.manID],
//     function(err, res) {
//       if (err) throw err;
//     viewEmployees();
//     start();
//   });
//   });
// }
function quit(){
    process.exit();
}

