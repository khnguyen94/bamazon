// Import any libraries needed as variables
var inquirer = require("inquirer"); // for obtaining user input
var connectDB = require("./database"); // for connection to database

// Create any global variables
var connection = connectDB();

// Create a function that executes the manager script
function runManager() {
    readDB_MNG(connection);
};

// Create a function that reads the database and prints to the terminal
function readDB_MNG(connection) {
    // SELECT
    query = "SELECT * FROM products";
  
    connection.query(query, function(err, res) {
      if (err) throw err;
  
      // Print everything to the terminal
      console.table(res);
  
      // Prompt the user to for their input
      promptUserOrder(connection);
    });
  };

  // Create a function add new items to the database
function addProduct(item_name, item_price, item_quantity) {
  console.log("Creating a new product...\n");
  var query = connection.query(
    "INSERT INTO products SET ?",
    {
      item_Name: itemName,
      price: itemPrice,
      quantity: itemQuant
    },
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " product inserted!\n");
      // Call updateProduct AFTER the INSERT completes
      //   updateProduct();
    }
  );
}

// 
module.exports = connectDB;