// Import any libraries needed as variables
var mysql = require("mysql"); // for mysql database access and manipulation
var inquirer = require("inquirer"); // for obtaining user input
var fs = require("fs"); // for reading and writing to files

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
var nodePath = process.argv[0];
var filePath = process.argv[0];

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

function grabItem(item_ID) {
  console.log("Selecting product...\n");

  let itemInterest;
  connection.query("SELECT * FROM products WHERE ?", [{ id: item_ID }], function(
    err,
    res
  ) {
    if (err) throw err;

    // console.log(res);

    // Obtain the id, name, price, and quantity of the item of interest
    var id = res[0].id;
    var price = res[0].price;
    var name = res[0].item_name;
    var quant = res[0].quantity;

    // Create an new object that holds these name and price
    itemInterest = new newItemOfInterest(id, price, name, quant);

    // console.log(itemInterest);

    // Return itemInterest from this function
  });
};


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
};

buyItem(1);

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

// // Create event listener for when user makes a new purchase
// $("#new-purchase-button").on("click", function(event) {
//   // Prevent page refresh/reload
//   event.preventDefault();

//   // Run buyItem function on the item and quantity
//   buyItem();

//   //
// });
