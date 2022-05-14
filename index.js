// Requiring the necessary modules for our application
const express = require("express");
const app = express(); // Calling the express function to create our application
const port = 4000; // Setting the port number
const bodyParser = require('body-parser');
const {check,validationResult} = require('express-validator'); 

// setting the view engine
app.set('view engine', 'ejs');

// using the bodyParser to parse the input received from the webpage
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.render('index'); // Rendering the HTML page
});

// Fetching the data entered by the user.
app.post("/", [
    // Checking whether the entered value by the user is in the correct type or not using express-validator 
    check('number','Enter a number').isNumeric(), 
], (req,res) => {

  // Checking and handling any error such as entering blank data etc.
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.send('Number cannnot be blank');
  }

  // This part will only execute if there are no errors till now.

  // Storing the number we received as user input
  let number = req.body.number;
  
  // Logic for Fibonacci Numbers
  let first = 0;
  let second = 1;
  let ans = "";
  for(i = 0; i<number; i++){
    ans = ans + " &emsp; " + first;
    let sum = first + second;
    first = second;
    second = sum;
  }
  
  // Sending the result back to our webpage
  res.send(`<h1>`+ 'The First ' + `<b>` + number + `</b>` + ' Fibonacci Numbers are :' + `</h1>` 
  + `<h3>` + ans + `</h3>`);
});

// Listening to check our connection to the webpage/application
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
