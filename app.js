var express = require("express"); //call the express module
var app = express(); //this is declaring the app.
var fs = require('fs'); //allowing json file to be overwritten

// allows the body parser package to run.
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("views"));// this is to look into the views folder
app.use(express.static("scripts")); // look directly into the scripts folder for the css file
app.use(express.static("images")); //we'll now look in the images folder

app.use(express.static("model")); //we'll now look in the images folder


// this will allow access to the json file in the model folder
var item = require("./model/products.json");

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
  //  res.send(item)
  res.render("produce.jade", {item:item}); //this will render the new products page
     console.log("Produce page");
     console.log(item);
  });
  

app.get('/add', function(req, res){
    
     res.render("add.jade"); //this will render the new products page
     console.log("Add Inventory page");
  });
  
  
  
 // route to render contact info page 
app.post("/add", function(req, res){
    
    // function to find the max id
    
  	function getMax(produce , id) {
		var max
		for (var i=0; i<produce.length; i++) {
			if(!max || parseInt(item[i][id]) > parseInt(max[id]))
				max = produce[i];
			
		}
		return max;
	}
	
	
	var maxPpg = getMax(item, "id"); // This calls the function above and passes the result as a variable called maxPpg.
	newId = maxPpg.id + 1;  // this creates a nwe variable called newID which is the max Id + 1
	console.log(newId); // We console log the new id for show reasons only
    
	// create a new product based on what we have in our form on the add page 
	
	var itemsx = {
    name: req.body.name,
    id: newId,
    type: req.body.type,
    image: req.body.image,
    price: req.body.price
    
  };
    
     console.log(itemsx);
  var json = JSON.stringify(item); // Convert our json data to a string
  
  // The following function reads the new data and pushes it into our JSON file
  
  fs.readFile('./model/products.json', 'utf8', function readFileCallback(err, data){
    if(err){
     throw(err);
         
    } else {
      
      item.push(itemsx); // add the data to the json file based on the declared variable above
      json = JSON.stringify(item, null, 4); // converts the data to a json file and the null and 4 represent how it is structuere. 4 is indententation 
      fs.writeFile('./model/products.json', json, 'utf8')
    }
    
  })
  res.redirect("/");
    
    
});

// url to delete JSON

app.get("/deletecontact/:id", function(req, res){
    
  var json = JSON.stringify(item); // Convert our json data to a string
  
  var keyToFind = parseInt(req.params.id) // Getes the id from the URL
  var data = item; // Tell the application what the data is
  var index = data.map(function(d) {return d.id;}).indexOf(keyToFind)
  console.log("variable Index is : " + index)
  console.log("The Key you ar looking for is : " + keyToFind);
  
  item.splice(index, 1);
  json = JSON.stringify(item, null, 4); // converts the data to a json file and the null and 4 represent how it is structuere. 4 is indententation 
      fs.writeFile('./model/products.json', json, 'utf8')
  res.redirect("/produce");
    
});

  
  
  
app.get('/information', function(req, res){
    
     res.render("information.jade"); //this will render the new products page
     console.log("Info Page");
  });









































app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
    console.log("Yes I Got You");
});