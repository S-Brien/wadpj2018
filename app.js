// A lot of the code has been taken and manipulated from Liam's code we used during this Module.


var express = require("express"); //call the express module
var app = express(); //this is declaring the app.
var fs = require('fs'); //allowing json file to be overwritten



// allows the body parser package to run.
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("views"));// this is to look into the views folder
app.use(express.static("scripts")); // look directly into the scripts folder for the css file
app.use(express.static("images")); //we'll now look in the images folder for the images

app.use(express.static("model")); //This is so we can get to the json files in the model folder


// this will allow access to the json file in the model folder
var item = require("./model/products.json");

var emp = require("./model/employees.json");

var sup = require("./model/suppliers.json");


app.get('/', function(req, res) {
res.render("index.jade"); // we use the res.render command to on the response object to display the jade page as html
console.log("Home Page Done"); // used to output activity in the console
});

app.get('/produce', function(req, res){
  //  res.send(item)
  res.render("produce.jade", {item:item}); //this will render the new products page
     console.log("Produce page");
  });
  

app.get('/add', function(req, res){
    
     res.render("add.jade"); //this will render the new products page
     console.log("Add Inventory page");
  });
  
  
  
 // route to render product info page 
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
  res.redirect("/produce");
    
    
});

// url to delete JSON

app.get("/deleteproduct/:id", function(req, res){
    
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

  
  

app.get('/editproducts', function(req, res){
    
     res.render("editproducts.jade"); //this will render the new products page
     console.log("Edit Page");
  });





app.get("/editproducts/:id", function(req, res){
    
   function chooseContact(indOne){
   return indOne.id === parseInt(req.params.id)
  
     }
 
  var indOne = item.filter(chooseContact);
  
  //res.send(indOne)
  res.render("editproducts.jade", {indOne});

    
});


// Create post request to edit the individual product
app.post('/editproducts/:id', function(req, res){
 var json = JSON.stringify(item);
 var keyToFind = parseInt(req.params.id); // Id passed through the url
 //var data = contact; // declare data as the reviews json file
  var index = item.map(function(item) {return item.id;}).indexOf(keyToFind)
 

 item.splice(index, 1, {name: req.body.name, type: req.body.type, id: parseInt(req.params.id), price: req.body.price});
 json = JSON.stringify(item, null, 4);
 fs.writeFile('./model/products.json', json, 'utf8'); // Write the file back
 res.redirect("/produce");
});



app.get('/employees', function(req, res){
    
     res.render("employees.jade",{emp:emp}); //this will render the  page
     console.log(emp);
  });

//Adding Empployee


app.get('/addemp', function(req, res){
    
     res.render("addemp.jade"); //this will render the new products page
     console.log("Add Employee page");
  });



app.post("/addemp", function(req, res){
    
    // function to find the max id
    
  	function getMax1(employees , id) {
		var max1
		for (var i=0; i<employees.length; i++) {
			if(!max1 || parseInt(emp[i][id]) > parseInt(max1[id]))
				max1 = employees[i];
			
		}
		return max1;
	}
	
	
	var maxPg = getMax1(emp, "id"); // This calls the function above and passes the result as a variable called maxPpg.
	newId = maxPg.id + 1;  // this creates a nwe variable called newID which is the max Id + 1
	console.log(newId); // We console log the new id for show reasons only
    
	// create a new product based on what we have in our form on the add page 
	
	var empsx = {
    name: req.body.name,
    email: req.body.email,
    id: newId,
    role: req.body.role,
    mobile: req.body.mobile
    
  };
    
     console.log(empsx);
  var json = JSON.stringify(emp); // Convert our json data to a string
  
  // The following function reads the new data and pushes it into our JSON file
  
  fs.readFile('./model/employees.json', 'utf8', function readFileCallback(err, data){
    if(err){
     throw(err);
         
    } else {
      
      emp.push(empsx); // add the data to the json file based on the declared variable above
      json = JSON.stringify(emp, null, 4); // converts the data to a json file and the null and 4 represent how it is structuere. 4 is indententation 
      fs.writeFile('./model/employees.json', json, 'utf8')
    }
    
  })
  res.redirect("/employees");
    
    
});



app.get("/deleteemployee/:id", function(req, res){
    
  var json = JSON.stringify(emp); // Convert our json data to a string
  
  var keyToFind = parseInt(req.params.id) // Getes the id from the URL
  var data = emp; // Tell the application what the data is
  var index = data.map(function(d) {return d.id;}).indexOf(keyToFind)
  console.log("variable Index is : " + index)
  console.log("The Key you ar looking for is : " + keyToFind);
  
  emp.splice(index, 1);
  json = JSON.stringify(emp, null, 4); // converts the data to a json file and the null and 4 represent how it is structuere. 4 is indententation 
      fs.writeFile('./model/employees.json', json, 'utf8')
  res.redirect("/employees");
    
});



//app.get('/editemployee', function(req, res){
    
     //res.render("editemployee.jade"); //this will render the new products page
    // console.log("Edit Page");
  //});



app.get("/editemployee/:id", function(req, res){
    
    console.log("Edit Employee Page");
    
   function chooseEmployee(indTwo){
   return indTwo.id === parseInt(req.params.id)
  
     }
 
  var indTwo= emp.filter(chooseEmployee);
  
  //res.send(indOne)
  res.render("editemployee.jade", {indTwo});
  
  console.log(indTwo);

    
});




// Create post request to edit the individual employee
app.post('/editemployee/:id', function(req, res){
     var json = JSON.stringify(emp);
     var keyToFind = parseInt(req.params.id); // Id passed through the url
     //var data = contact; // declare data as the reviews json file
     var index = emp.map(function(emp) {return emp.id;}).indexOf(keyToFind)
 

 emp.splice(index, 1, {name: req.body.name, email: req.body.email, id: parseInt(req.params.id), role: req.body.role, mobile: req.body.mobile});
 json = JSON.stringify(emp, null, 4);
 fs.writeFile('./model/employees.json', json, 'utf8'); // Write the file back
 res.redirect("/employees");
});






// this will be the suppliers page rendered
app.get('/suppliers', function(req, res){
    
     res.render("suppliers.jade", {sup:sup}); //this will render the new products page
     console.log("Suppliers page");
  });



// this will be the page to add a fresh new supplier.
app.get('/addsupplier', function(req, res){
    
     res.render("addsupplier.jade"); //this will render the new products page
     console.log("Add New Supplier page");
  });



app.post("/addsupplier", function(req, res){
    
    // function to find the max id
    
  	function getMax2(suppliers , id) {
		var max2
		for (var i=0; i<suppliers.length; i++) {
			if(!max2 || parseInt(sup[i][id]) > parseInt(max2[id]))
				max2 = suppliers[i];
			
		}
		return max2;
	}
	
	
	var maxPgg = getMax2(sup, "id"); // This calls the function above and passes the result as a variable called maxPpg.
	newId = maxPgg.id + 1;  // this creates a nwe variable called newID which is the max Id + 1
	console.log(newId); // We console log the new id for show reasons only
    
	// create a new product based on what we have in our form on the add page 
	
	var supsx = {
    name: req.body.name,
    ingredient: req.body.ingredient,
    id: newId,
    phone: req.body.phone,
    email: req.body.email,
    
  };
    
     console.log(supsx);
  var json = JSON.stringify(sup); // Convert our json data to a string
  
  // The following function reads the new data and pushes it into our JSON file
  
  fs.readFile('./model/suppliers.json', 'utf8', function readFileCallback(err, data){
    if(err){
     throw(err);
         
    } else {
      
      sup.push(supsx); // add the data to the json file based on the declared variable above
      json = JSON.stringify(sup, null, 4); // converts the data to a json file and the null and 4 represent how it is structuere. 4 is indententation 
      fs.writeFile('./model/suppliers.json', json, 'utf8')
    }
    
  })
  res.redirect("/suppliers");
    
    
});




//this will be to delete a supplier
app.get("/deletesupplier/:id", function(req, res){
    
  var json = JSON.stringify(sup); // Convert our json data to a string
  
  var keyToFind = parseInt(req.params.id) // Getes the id from the URL
  var data = sup; // Tell the application what the data is
  var index = data.map(function(d) {return d.id;}).indexOf(keyToFind)
  console.log("variable Index is : " + index)
  console.log("The Key you ar looking for is : " + keyToFind);
  
  sup.splice(index, 1);
  json = JSON.stringify(sup, null, 4); // converts the data to a json file and the null and 4 represent how it is structuere. 4 is indententation 
      fs.writeFile('./model/suppliers.json', json, 'utf8')
  
  res.redirect("/suppliers");
    
});



//edit rendered
//app.get('/editsupplier', function(req, res){
    
     //res.render("editsupplier.jade"); //this will render the new products page
     //
  //});






// edit suppliers page
app.get("/editsupplier/:id", function(req, res){
    
    console.log("Edit Supplier Page");
   
   function chooseSupplier(indThree){
   return indThree.id === parseInt(req.params.id)
  
     }
 
  var indThree = sup.filter(chooseSupplier);
  
  
  res.render("editsupplier.jade", {indThree});

    
});


// Create post request to edit the individual product
app.post('/editsupplier/:id', function(req, res){
 var json = JSON.stringify(sup);
 var keyToFind = parseInt(req.params.id); // Id passed through the url
 //var data = contact; // declare data as the reviews json file
  var index = sup.map(function(sup) {return sup.id;}).indexOf(keyToFind)
 

 sup.splice(index, 1, {name: req.body.name, ingredient: req.body.ingredient, id: parseInt(req.params.id), phone: req.body.phone, email: req.body.email});
 json = JSON.stringify(sup, null, 4);
 fs.writeFile('./model/suppliers.json', json, 'utf8'); // Write the file back
 res.redirect("/suppliers");
});

















app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
    console.log("Yes I Got You");
});