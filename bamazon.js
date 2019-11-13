// Import any libraries needed as variables
var inquirer = require("inquirer"); // for obtaining user input
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
          runShopper(connection);
          break;

        case "Manager":
          // run manager script
          runManager(connection);
          break;

        case "Exit":
          console.log("Exiting the Bamazon. Bye!");
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
