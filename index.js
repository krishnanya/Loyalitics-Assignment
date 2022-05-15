// Requiring the necessary modules for our application
const express = require("express");
const app = express(); // Calling the express function to create our application
const port = 4000; // Setting the port number
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const {check,validationResult} = require('express-validator'); 

// setting the view engine
app.set('view engine', 'ejs');

//Using the required middlewares for our application. 

// using the bodyParser to parse the input received from the webpage
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session is required to use flash
app.use(session({
  secret:'secret', // a random unique string key used to authenticate a session.
  saveUninitialized: true, //this allows any uninitialized session to be sent to the store.
  resave: false // It takes a Boolean value. It enables the session to be stored back to the session store, even if the session was never modified during the request.
}));
app.use(flash());


app.get("/", (req, res) => {
  const error = req.flash('error');
  res.render('index', { error }); // Rendering the HTML page and using the error variable to link with the html element in which we want to use flash message. 
});

// Fetching the data entered by the user.
app.post("/", [
    // Checking whether the entered value by the user is in the correct type or not using express-validator 
    check('number','Enter a number').isNumeric(), 
], (req,res) => {

  // Checking and handling any error such as entering blank data etc.
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    req.flash('error',`Field cannot be empty!!! Please enter a number between 1 to 100.`) // Flash the message if an error is found.
    res.redirect('/'); // Redirecting to the same page.
  }else{
  // Else part will only execute if there are no errors till now.

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
  res.send(`<h1 style = "color :MediumSeaGreen;"> Result : </h1> <h2 style = "color : Blue">`+ 'The First ' + `<b>` + number + `</b>` + ' Fibonacci Numbers are :' + `</h2>` 
  + `<h3>` + ans + `</h3>`);
  }
  }
);

// Listening to check our connection to the webpage/application
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
