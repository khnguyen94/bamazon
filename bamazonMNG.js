// Import any libraries needed as variables
var inquirer = require("inquirer"); // for obtaining user input
var connectDB = require("./database"); // for connection to database

// Create any global variables
var connection = connectDB();

// Create a function that executes the manager script
function runManager(connection) {
  readDB_MNG(connection);
}

// Create a function that reads the database and prints to the terminal
function readDB_MNG(connection) {
  // SELECT
  query = "SELECT * FROM products";

  connection.query(query, function(err, res) {
    if (err) throw err;

    // Print everything to the terminal
    console.table(res);

    // Prompt the user to for their input
    promptMNGAction(connection);
  });
}

function promptMNGAction(connection) {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do? ",
      choices: [
        "Add a new product",
        "Delete an existing product",
        "Update an existing product",
        "View product sales",
        "Exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "Add a new product":
          // run addNewProduct script
          promptNewProduct(connection);
          break;

        case "Delete an existing product":
          // run deleteExistingProduct script
          promptDeleteProduct(connection);
          break;

        case "Update an existing product":
          // run UpdateExistingProduct script
          promptUpdateProduct(connection);
          break;

        case "View product sales":
          // run viewProductSales script
          viewProductSales(connection);
          break;

        case "Exit":
          console.log("Exiting Bamazon. Bye!");
          connection.end();
          break;
      }
    });
}

// Create a function add new items to the database
function promptNewProduct(department, item_name, initial_stock, item_price) {
  inquirer
    .prompt([
      {
        name: "department",
        type: "input",
        message:
          "Please enter the department of the new product you are inputing."
      },
      {
        name: "item_name",
        type: "input",
        message: "Please enter the name of the new product you are inputing."
      },
      {
        name: "initial_stock",
        type: "input",
        message:
          "Please enter the initial stock of the new product you are inputing."
      },
      {
        name: "item_price",
        type: "input",
        message: "Please enter the price of the new product you are inputing."
      }
    ])
    .then(function(answer) {
      // console.log(answer.department);
      // console.log(answer.item_name);
      // console.log(answer.initial_stock);
      // console.log(answer.item_price);

      // Run the stockNewProduct function
      stockNewProduct();
    });

  function stockNewProduct(connection) {
    var query = "INSERT INTO products SET ?";

    connection.query(
      query,
      {
        department: department,
        item_name: item_name,
        stock_quantity: initial_stock,
        item_price: itemPrice
      },
      function(err, res) {
        if (err) throw err; 

        console.log("New product added in stock!");

        // Prompt the manager for another action
        promptMNGAction(connection);
      }
    );
  }
}

//
module.exports = runManager;
