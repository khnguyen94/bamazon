// Import any libraries needed as variables
var inquirer = require("inquirer"); // for obtaining user input
var consoleTable = require("console.table");
var connectDB = require("./database"); // for connection to database

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
          readDB(connection);
          break;

        case "Manager":
          // run manager script
          runManager(connection);
          break;

        case "Exit":
          connection.end();
          break;
      }
    });
}

// Create a function that reads the database and prints to the terminal
function readDB(connection) {
  // SELECT
  query = "SELECT * FROM products";

  connection.query(query, function(err, res) {
    if (err) throw err;

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
        name: "quantity",
        type: "input",
        message: "Please enter the quantity you would like to buy."
      }
    ])
    .then(function(res) {
      // Run the checkStock function, pass through: connection, res.item_ID, and res.quantity
      checkItemStock(connection, res.item_id, parseInt(res.quantity));
    });
}

// Create a function that checks the stock of an item using its itemID
function checkItemStock(connection, item_id, buy_quantity) {
  query = "SELECT * FROM products WHERE ?";

  connection.query(query, { id: item_id }, function(err, res) {
    if (err) throw err;

    // console.log(res);
    // console.log(res[0]);

    if (parseInt(res[0].quantity) < buy_quantity) {
      console.log("There isnt enough of this item in stock.");
      // Prompt the user for purchase input again
    } else {
      // Process their order and run the updateProduct function
      updateProduct(connection, item_id, buy_quantity);
    }
  });
}

// Create a function that processes any successful order and updates the database
function updateProduct(connection, item_id, buy_quantity) {
  query = "UPDATE products SET ? WHERE ?";

  params = [{ stock_quantity: (stock_quantity - parseInt(buy_quantity)) }, { id: item_id }];

  connection.query(query, params, function(err, res) {
    if (err) throw err;

    // Run the updateCart function
    updateCart(connection, item_ID, buy_quantity);
  });
}

// Create a function that updates the user's cart with their order
function updateCart(connection, item_id, buy_quantity) {
  query =
    "SELECT item_name as 'Product', price as 'Price/Item', price * buy_quantity as 'Total' FROM products WHERE ?";

  params = [{ item_id: item_ID }];

  connection.query(query, params, function() {
    if (err) throw err;

    console.log("Your Cart: \n");
    console.log(res);

    // Run the updateSales function
    updateSales(connection, item_id, buy_quantity);
  });
}

// Create a function that updates the item sales in the database
function updateSales(connection, item_id, buy_quantity) {
  query = "UPDATE products SET ";

  params = [];

  connection.query(query, params, function(err, res) {
    if (err) throw err;

    return;
  });
}

// Initiate the program by running readDB
runStore(connection);

// Based on what action user selects then run that function
function buyClothing() {
  inquirer
    .prompt(
      {
        name: "item",
        type: "input",
        message: "What item of clothing would you like to buy?"
      },
      {
        name: "quantity",
        type: "input",
        message: "How many would you like to buy?"
      }
    )
    .then(function(answer) {
      var query = "UPDATE products SET ? WHERE ?";

      connection.query(
        query,
        [{ quantity: answer.quantity }, { item_name: answer.item_name }],
        function(err, res) {
          // If there is enough stock (quantity) then update the table
          if (res.quantity < answer.quantity) {
            console.log("There is not enough of this item in stock!");
          } else {
          }
        }
      );
    });
}

// Create a function to update items in the database
function updateItem() {}

// Create a function add new items to the database
function addProduct(itemName, itemPrice, itemQuant) {
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

// Create a new itemInterest constructor function to be use in the grabItemPrice funciton
function newItemOfInterest(id, name, price, quantity) {
  this.id = id;
  this.name = name;
  this.price = price;
  this.quantity = quantity;

  return this;
}

function buyItem(itemID, userPurchaseQuantity) {
  console.log("Selecting product...\n");

  connection.query("SELECT * FROM products WHERE ?", [{ id: itemID }], function(
    err,
    res
  ) {
    if (err) throw err;

    // Obtain the id, name, price, and quantity of the item of interest
    var id = res[0].id;
    var price = res[0].price;
    var name = res[0].item_name;
    var quant = res[0].quantity;

    // Create an new object that holds these name and price
    var itemInterest = new newItemOfInterest(id, price, name, quant);

    console.log(itemInterest);

    // Call the buyItem function
    updateItem(itemID, itemInterest);
  });
}

function updateItem(itemID, userPurchaseQuantity) {
  console.log("Bidding on item: \n");
  console.log("Current Price: ");

  // Log all results of the SELECT statement
  // if (userBid > bidItem.price) {
  //   // console.log("Sorry, your bid is too low.");
  // } else {
  //   bidProduct(itemID, itemPrice);
  // }
  // var query = connection.query(
  //   "UPDATE products SET ? WHERE ?",
  //   [
  //     {
  //       price: userBid
  //     },
  //     {
  //       id: itemID
  //     }
  //   ],
  //   function(err, res) {
  //     console.log("res buy item");
  //     if (err) throw err;
  //     console.log(res.affectedRows + " products updated!\n");
  //     connection.end();
  //   }
  // );
}

// Create a banking application for the User's account
function bank() {
  // Create a deposit function
  // Create a withdraw function
  // Create a print total function
  function total() {
    fs.readFile("bank.txt", "utf8", function(err, data) {
      if (err) {
        return console.log(err);
      }

      // Break down all the numbers inside the file
      data = data.split(", ");
      var result = 0;
    });
  }

  // Create a  switch-case will direct which function gets run.
  switch (action) {
    case "total":
      total();
      break;

    case "deposit":
      deposit();
      break;

    case "withdraw":
      withdraw();
      break;

    case "lotto":
      lotto();
      break;
  }
}

// Create an on-click event that will capture and store the user's input for a new purchase
// $("#new-purchase-button").on("click", function(event) {
//   // Prevent page refresh/reload
//   event.preventDefault();

//   // Run buyItem function on the item and quantity
//   buyItem();

//   //
// });
