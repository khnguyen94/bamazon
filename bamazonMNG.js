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
          promptProductDeletion(connection);
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
          connection.end();
          break;
      }
    });
}

// Create a function add new items to the database
function promptNewProduct(connection) {
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
      stockNewProduct(
        connection,
        answer.department,
        answer.item_name,
        answer.initial_stock,
        answer.item_price
      );
    });
}

function stockNewProduct(
  connection,
  department,
  item_name,
  initial_stock,
  item_price
) {
  var query = "INSERT INTO products SET ?";

  connection.query(
    query,
    {
      department: department,
      item_name: item_name,
      stock_quantity: initial_stock,
      item_price: item_price
    },
    function(err, res) {
      if (err) throw err;

      console.log("New product added in stock!");

      // Run the readDB function again to prompt the manager for another action
      readDB_MNG(connection);
    }
  );
}

function promptProductDeletion(connection) {
  inquirer
    .prompt(
      {
        name: "item_id",
        type: "input",
        message: "Please enter the id of the product you want to remove."
      },
      {
        name: "remove_quantity",
        type: "input",
        message: "Please enter the amount of the product you want to remove."
      }
    )
    .then(function(answer) {
      console.log(answer.item_id);
      console.log(answer.remove_quantity);

      // Check amount of item in stock for removal
      checkStockDeletion(connection, answer.item_id, answer.remove_quantity);
    });
}

function checkStockDeletion(connection, item_id, remove_quantity) {
  query = "SELECT * FROM products WHERE ?";

  connection.query(query, { id: item_id }, function(err, res) {
    if (err) throw err;

    if (remove_quantity > res[0].stock_quantity) {
      console.log(
        "There is less stock of this item than the amount you want to remove."
      );

      // Reprompt the manager for another action
      promptMNGAction(connection);
    } else {
      // console.log(item_id);
      // console.log(remove_quantity);

      // Process the deletion by running the deleteProduct function
      deleteProduct(connection, item_id, remove_quantity);
    }
  });
}

function deleteProduct(connection, item_id, remove_quantity) {
  query =
    "UPDATE products SET stock_quantity = stock_quantity - " +
    remove_quantity +
    " WHERE ?";

  connection.query(query, { id: item_id }, function(err, res) {
    if (err) throw err;

    // console.log(res);
    console.log("Successfully deleted product from stock.");

    // Prompt the manager for another action
    promptMNGAction(connection);
  });
}

function promptUpdateProduct(connection) {
  inquirer.prompt(
    {
      name: "item_id",
      type: "input",
      message: "Please enter the id of the product you want to update."
    }
  ).then(function(answer) {

    // console.log(answer.item_id);

    // Run the promptUpdateProductAction function to see what they want to do with that item
    promptUpdateProductAction(connection, answer.item_id);
  });
}; 

function promptUpdateProductAction(connection, item_id) {
  inquirer.prompt(
    {
      name: "action",
      type: "list",
      message: "What would you like to update for this item?",
      choices: ["Update Department", "Update Name", "Update Stock Quantity", "Update Item Price", "Update Sold Quantity"]
    }
  ).then(function(answer) {
    switch (answer.action) {
      case "Update Department": 
      // run updateDepartment function
      promptUpdateItemDepartment(connection, item_id);
      break;

      case "Update Name": 
      // run updateDepartment function
      promptUpdateItemName(connection, item_id);
      break;

      case "Update Stock Quantity": 
      // run updateDepartment function
      promptUpdateItemStockQuantity(connection, item_id);
      break;

      case "Update Item Price": 
      // run updateDepartment function
      promptUpdateItemPrice(connection, item_id);
      break;

      case "Update Sold Quantity": 
      // run updateDepartment function
      promptUpdateItemSoldQuantity(connection, item_id);
      break;
    } 
  });
};

// Create a function that prompts update for item's department
function promptUpdateItemDepartment(connection, item_id) {
  inquirer.prompt(
    {
      name: "new_department",
      type: "input",
      message: "What would you like to update this item's department to?"
    }
  ).then(function(answer) {
    // console.log(answer.new_department);

    // Run the function to update the item's department
    updateItemDepartment(connection, item_id, answer.new_department);
  });
};

// Create a function that updates the item's department
function updateItemDepartment(connection, item_id, new_department) {
  query = "UPDATE products SET department = " + new_department + "WHERE ?";

  connection.query(query, {id: item_id}, function(err, res) {
    if (err) throw err; 

    console.log("Successfully updated item's department");

    // Run the script to prompt manager for another action
    promptMNGAction(connection);
  })
};

// Create a function that prompts update for item's name
function promptUpdateItemName(connection, item_id) {
  inquirer.prompt(
    {
      name: "new_name",
      type: "input",
      message: "What would you like to update this item's name to?"
    }
  ).then(function(answer) {
    // console.log(answer.new_name);

    // Run the function to update the item's name
    updateItemName(connection, item_id, answer.new_name);
  });
};

// Create a function that updates the item's name
function updateItemName(connection, item_id, new_name) {
  query = "UPDATE products SET item_name = " + new_name + "WHERE ?";

  connection.query(query, {id: item_id}, function(err, res) {
    if (err) throw err; 

    console.log("Successfully updated item's name");

    // Run the script to prompt manager for another action
    promptMNGAction(connection);
  })
};

// Create a function that prompts update for item's stock quantity
function promptUpdateItemStockQuantity(connection, item_id) {
  inquirer.prompt(
    {
      name: "new_stock_quantity",
      type: "input",
      message: "What would you like to update this item's stock to?"
    }
  ).then(function(answer) {
    // console.log(answer.new_stock_quantity);

    // Run the function to update the item's stock quantity
    updateItemStockQuantity(connection, item_id, answer.new_stock_quantity);
  });
};

// Create a function that updates the item's stock quantity
function updateItemStockQuantity(connection, item_id, new_stock_quantity) {
  query = "UPDATE products SET stock_quantity = " + new_stock_quantity + "WHERE ?";

  connection.query(query, {id: item_id}, function(err, res) {
    if (err) throw err; 

    console.log("Successfully updated item's stock quantity");

    // Run the script to prompt manager for another action
    promptMNGAction(connection);
  })
};

// Create a function that prompts update for item's price
function promptUpdateItemPrice(connection, item_id) {
  inquirer.prompt(
    {
      name: "new_price",
      type: "input",
      message: "What would you like to update this item's price to?"
    }
  ).then(function(answer) {
    // console.log(answer.new_price);

    // Run the function to update the item's stock price
    updateItemPrice(connection, item_id, answer.new_price);
  });
};

// Create a function that updates the item's price
function updateItemPrice(connection, item_id, new_price) {
  query = "UPDATE products SET stock_quantity = " + new_price + "WHERE ?";

  connection.query(query, {id: item_id}, function(err, res) {
    if (err) throw err; 

    console.log("Successfully updated item's stock price");

    // Run the script to prompt manager for another action
    promptMNGAction(connection);
  })
};

// Create a function that returns just the Product Sales information depending on department
function promptViewProductSales(connection) {
  inquirer.prompt(
    {
      name: "view_department",
      type: "list",
      message: "Which department would you like to view sales data for?",
      choices: ["Clothing", "Electonics", "Produce", "Furniture"]
    }
  ).then(function(answer) {
    console.log(answer.view_department);

    // Run retrieveSalesDate on that department
    retrieveSalesDate(connection, answer.view_department);
  });
};

// Create a function that retrieves sales data for a specfic department
function retrieveSalesDate(connection, view_department) {
  query = "SELECT item_name, sold_quantity, sold_total FROM products WHERE ?";

  connection.query(query, {department: view_department}, function(err, res) {
    if (err) throw err; 

    console.table(res);

    // Prompt the manager for a new action
    promptMNGAction(connection);
  })
};

// Export manager functions
module.exports = runManager;
