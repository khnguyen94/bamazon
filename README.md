# bamazon
Summary
This is an application which replicates some of the most basic interactions that both customers and managers may have for a e-commerce platform. A customer is able to make purchases from Bamazon's current stock. A manager is able to manipulate the data points from the backend including: adding, deleting, updating products as well as viewing a summary of sales data. 


Importance
- E-commerce is one of the most wide-reaching and highest-grossing retail industries. There is near limitless possibility for growth. 
- This application allows for users to understand internet/digital transactions and representations of physical products that will be passed from seller to buyer. 


Key Technologies
- node.js
- inquirer
- mysql 


Get Started
- As this is a node application, please first navigate to the following link: [Link]
- Perform a 'git clone' on the repository to your personal device at a location of your choosing
- If on macOS, open up a new Terminal instance
- If on Windows PC, open up a new Command Prompt instance
- Navigate to the root directory of this where you saved this Bamazon program
- Run the following command in your root directory in order to install all the necessary packages for this program: 
    "npm install"

- Open up your MySQL database interface of your choosing (in my development, I chose to use MySQL Workbench but any other one will suffice)
- Copy and paste lines 1-29 over into your SQL database interface and run the code in order to establish a fresh new database of products in stock 
- Copy and paste lines 32-34 and into your SQL database interface and run the code in order to view your database in its entirety

- Now, run this command to start the program: 
    "node bamazon.js"
- The following list are the possible commands you can perform

Customer
    1. Buy a product
        [https://imgur.com/XBjQv8Z]
        - Input the item id of the product you would like to buy, press enter
        - Input the quantity of that product you would like to buy, press enter
        - The program should run, update the stock based on the amount you buy as well as update some other fields of interest for the manager of the database, and you will be returned a receipt of your purchase
        [https://imgur.com/tM6HxLM]

Manager
    1. Add a new product
        [https://imgur.com/jZsNsov]
        - Input the item department of the product you would like to add, press enter
        - Input the item name (capitalize first letter) of the product you would like to add, press enter
        - Input the initial stock quantity of the product you would like to add, press enter
        - Input the initial per/item price of the product you would like to add, press enter
        - The program will run and you will be returned an updated database with the new item added at the bottom 
        [https://imgur.com/tjujVoC]
    2. Delete an existing product
        - Input the item id of the product you would like to delete, press enter
        - Input the quanitity you would like to delete of the product, press enter
        - The program will run and you will be returned an updated database that reflects the deletion of that item 
    3. Update an existing product
        - Input the item id of the product you would like to update, press enter
        - Select the specific data point of that product that you would like to update, press enter
        - Based on wwhat data point you want to modify, input the new value (make sure you enter as the correct data type), press enter
        - The program will run and you will be returned an updated database that reflects the changes you made to that item 
    4. View product sales 
        - Input the department for which you would like to view sales data for, press enter
        - The program will run and you will be summarized table with sales data for that department
        [https://imgur.com/z04qbVz]


Contributors
- Khoa Nguyen (Github: khnguyen94) : Sole contributor who worked on Customer and Manager side functionalities of this application