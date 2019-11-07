// Import any libraries needed as variables
var mysql = require("mysql");
// var inquirer = require("inquirer");

// Establish connection with local mysql database
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "frankocean",
    database: "bamazon_DB"
  });

// Establish all global variables

// Create a function for the user to add new items to the database
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

  // logs the actual query being run
  console.log(query.sql);
}

// Create a new itemInterest constructor function to be use in the grabItemPrice funciton
function newItemOfInterest(id, name, price, quantity) {
  this.id = id;
  this.name = name;
  this.price = price;
  this.quantity = quantity;

  return this;
}

function grabItem(itemID) {
  console.log("Selecting product...\n");

  connection.query("SELECT * FROM products WHERE ?", [{ id: itemID }], function(
    err,
    res
  ) {
    if (err) throw err;

    // console.log(res);

    // Obtain the id, name, price, and quantity of the item of interest
    var itemID = res[0].id;
    var itemPrice = res[0].price;
    var itemName = res[0].item_name;
    var itemQuant = res[0].quantity;

    // Create an new object that holds these name and price
    var itemInterest = new newItemOfInterest(
      itemID,
      itemName,
      itemPrice,
      itemQuant
    );

    // console.log(itemInterest);

    // Return itemInterest from this function
    return itemInterest;
  });
}

grabItem(1);

function buyItem(itemID, userPurchasePrice, userPurchaseAmount) {
  // Grab the item being bidded on
  var item = grabItem(itemID);

  console.log(item);

  //   console.log("Bidding on item: \n" + bidItem.price);
  //   console.log("Current Price: " + bidItem.price);

  // Log all results of the SELECT statement
  //   if (userBid > bidItem.price) {
  //     console.log("Sorry, your bid is too low.");
  //   } else {
  //     bidProduct(itemID, itemPrice);
  //   }

  //   var query = connection.query(
  //     "UPDATE products SET ? WHERE ?",
  //     [
  //       {
  //         price: userBid
  //       },
  //       {
  //         id: itemID
  //       }
  //     ],
  //     function(err, res) {
  //       if (err) throw err;
  //       console.log(res.affectedRows + " products updated!\n");
  //       connection.end();
  //     }
  //   );
}

buyItem(grabItem(1), 3);
