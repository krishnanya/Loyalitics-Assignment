const express = require("express");
const app = express();
const port = 4000;
const bodyParser = require('body-parser');
const {check,validationResult} = require('express-validator');

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.render('index');
});


app.post("/", [
  check('number','Enter a number').isNumeric(),
], (req,res) => {

  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.send('Number cannnot be blank');
  }

  let number = req.body.number;
  
  let a = 0;
  let b = 1;
  let ans = "";
  for(i = 0; i<number; i++){
    ans = ans + " &emsp; " + a;
    let sum = a + b;
    a = b;
    b = sum;
  }
  res.send(`<h1>`+ 'The First ' + `<b>` + number + `</b>` + ' Fibonacci Numbers are :' + `</h1>` 
  + `<h3>` + ans + `</h3>`);
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
