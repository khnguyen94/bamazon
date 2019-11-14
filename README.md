# bamazon
Summary
At its essence, this is an application which replicate some extremely basic inquiry commands that the user may ask a personal assistant. The operations that this application can execute are to: retrieve concert data for an artist, information for a specific song, informationf or a specific movie, and take in pre-existing text commands from a linked text file all from the terminal command line. 


Importance
- One of the more revolutionary pieces of technology that has been released in the past few years are personal assistants speakers (the two popular ones are Google's Google Home device variations and Amazon's Alexa device variations). 
- This application mimics some of the functionality found in these devices software
- Rather than providing a better service than what these existing devices already offer, the main purpose of this application is to teach users what these technologies do on the most basic levels


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
        - Input the item id of the product you would like to buy, press enter
        - Input the quantity of that product you would like to buy, press enter
        - The program should run, update the stock based on the amount you buy as well as update some other fields of interest for the manager of the database, and you will be returned a receipt of your purchase

Manager
    1. Add a new product
        - Input the item department of the product you would like to add, press enter
        - Input the item name (capitalize first letter) of the product you would like to add, press enter
        - Input the initial stock quantity of the product you would like to add, press enter
        - Input the initial per/item price of the product you would like to add, press enter
        - The program will run and you will be returned an updated database with the new item added at the bottom
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
        - 


Contributors
- Khoa Nguyen (Github: khnguyen94) : Sole contributor who worked on Customer and Manager side functionalities of this application