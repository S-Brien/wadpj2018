var express = require("express"); //call the express module

var app = express(); //this is declaring the app.

app.use(express.static("views"));// this is to look into the views folder
app.use(express.static("scripts")); // look directly into the scripts folder for the css file
app.use(express.static("images")); //we'll now look in the images folder

//app.get('/',function(req,res){
   // res.render("index");
    //res.send("Hello World");
   // console. log("Hello World");
//});

app.get('/', function(req, res) {
res.render("index.jade"); // we use the res.render command to on the response object to display the jade page as html
console.log("Home Page Done"); // used to output activity in the console
});

app.get('/produce', function(req, res){
    
     res.render("produce.jade"); //this will render the new products page
  });
  

app.get('/add', function(req, res){
    
     res.render("add.jade"); //this will render the new products page
  });









































app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
    console.log("Yes I Got You");
});