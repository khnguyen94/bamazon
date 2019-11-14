// Import any libraries needed as variables
var inquirer = require("inquirer"); // for obtaining user input
var connectDB = require("./database.js"); // for connection to database
var connectMNG = require("./bamazonMNG.js"); // for connection to manager functions

// Create any global variables
var connection = connectDB();

// Create a runStore function takes an response from the user via use of inquirer
function runStore(connection) {
  console.log("Welcome to Bamazon! We are the premier e-commerce website.");

  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "Access the shop as a: ",
      choices: ["Shopper", "Manager", "Exit"]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "Shopper":
          // run shopper script
          runShopper(connection);
          break;

        case "Manager":
          // run manager script
          connectMNG(connection);
          break;

        case "Exit":
          console.log("Exiting Bamazon. Bye!");
          connection.end();
          break;
      }
    });
};

// Create a function that initiate the Shopper pathway
function runShopper(connection) {
  readDB(connection);
};

// Create a function that reads the database and prints to the terminal
function readDB(connection) {
  // SELECT
  query = "SELECT id, department, item_name, stock_quantity, item_price FROM products";

  connection.query(query, function(err, res) {
    if (err) throw err;

    console.log("Here are all the items we have in stock. Please make your order below.");

    // Print everything to the terminal
    console.table(res);

    // Prompt the user to for their input
    promptUserOrder(connection);
  });
}

// Create a function that prompts the user for their order
function promptUserOrder(connection) {
  inquirer
    .prompt([
      {
        name: "item_id",
        type: "input",
        message:
          "Please enter the item ID of the product you would like to buy."
      },
      {
        name: "buy_quantity",
        type: "input",
        message: "Please enter the quantity you would like to buy."
      }
    ])
    .then(function(answer) {

      // console.log(answer.item_id);
      // console.log(answer.buy_quantity);

      // Run the checkStock function, pass through: connection, res.item_ID, and res.quantity
      checkItemStock(connection, answer.item_id, parseInt(answer.buy_quantity));
    });
};

// Create a function that checks the stock of an item using its itemID
function checkItemStock(connection, item_id, buy_quantity) {
  query = "SELECT * FROM products WHERE ?";

  connection.query(query, { id: item_id }, function(err, res) {
    if (err) throw err;

    // console.log(res);
    // console.log(res[0]);

    if (res[0].stock_quantity < buy_quantity) {
      console.log("There isnt enough of this item in stock.");
      // Prompt the user for purchase input again
      promptUserOrder(connection);
    } else {

      // console.log(item_id);
      // console.log(buy_quantity);

      // Process their order and run the updateProduct function
      updateProductDB(connection, item_id, parseInt(buy_quantity));
    }
  });
}

// Create a function that processes any successful order and updates the database
function updateProductDB(connection, item_id, buy_quantity) {

  query = "UPDATE products SET stock_quantity = (stock_quantity - " + buy_quantity + ") WHERE ?";

  connection.query(query, {id: item_id}, function(err, res) {
    if (err) throw err;

    // console.log(res);

    // Run the updateCart function
    updateCart(connection, item_id, parseInt(buy_quantity));
  });
};

// Create a function that updates the user's cart with their order
function updateCart(connection, item_id, buy_quantity) {
  query =
    "SELECT item_name as 'Product', item_price as 'Price/Item', (item_price * " + buy_quantity + ") as 'Total' FROM products WHERE ?";

  connection.query(query, { id: item_id }, function(err, res) {
    if (err) throw err;

    console.log("Thank you for your purchase! \n");
    console.log("Your Receipt: \n");
    console.table(res);

    // Run the updateSales function
    updateSales(connection, item_id, parseInt(buy_quantity));
  });
}

// Create a function that updates the item sales in the database
function updateSales(connection, item_id, buy_quantity) {
  query = "UPDATE products SET sold_quantity= " + buy_quantity + " , sold_total= sold_quantity * item_price WHERE ?";

  connection.query(query, {id: item_id}, function(err, res) {
    if (err) throw err;

    readDB(connection);
  });
}

// Initiate the program by running readDB
runStore(connection);



