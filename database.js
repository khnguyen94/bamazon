// Import any libraries needed as variables
var mysql = require("mysql"); // for mysql database access and manipulation

// Establish connection with local mysql database
function connectDB() {
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

  // Connect to the server and then create a runStore function
  connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected to Bamazon Database!");
  });

  return connection;
};

module.exports = connectDB;