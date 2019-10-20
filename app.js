var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

mongoose.connect("mongodb://localhost/IBR");

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/public/views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

var userSchema = new mongoose.Schema({
  name: String,
  email: String,
  country: String,
  product:String,
  exportCountry: String
});


var User = mongoose.model("User", userSchema);


// User.create(
//   {
//     name: "Dinith",
//     email: "dkar07@yahoo.com",
//     country: "Canada",
//     product: "Clothing"
//   }, function(err, user){
//     if(err){
//       console.log(err);
//     }else{
//       console.log("New User");
//       console.log(user);
//     }
//   });
app.get('/', function(req, res){
    res.render('index');
});

app.get('/users', function(req, res){
  
});

app.post('/addUser/', function(req,res){
  var name = req.body.name;
  var email = req.body.email;
  var country = req.body.country;
  var product = req.body.product;
  var exportCountry;
  
  switch(country){
    case "Ghana":
      exportCountry = "USA";
      break;
    case "Sri Lanka":
      exportCountry = "USA";
      break;
  }
  
  var newUser = {name: name, email: email, country: country, product: product, exportCountry: exportCountry};
  
  res.render('new.ejs',{newUser: newUser});
});


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The server has started!");
});