const express = require("express");
const bodyParser = require("body-parser");

const app= express();

var items= ["Buy Food", "Get Food"];
var workItems=[];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))

app.get("/", function(req,res){
  var today = new Date();

  var option ={
    weekday: "long",
    day: "numeric",
    month:"long",
  };

    var day= today.toLocaleDateString("en-US", option);

      res.render("list", {listTitle: day, newListItems: items} );
});

app.post("/", function(req,res){

  var item = req.body.newItem;

  if (req.body.list ==="Work List"){
    workItems.push(item);
    res.redirect("/work");
  }
  else{
    items.push(item);
    res.redirect("/");
  }

});

app.get("/work",function(req, res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});

});

app.post("/", function(req,res){
  var item = req.body.newItem;
  items.push(item);
  res.redirect("/work");
});

app.get("/about",function(req, res){
  res.render("about")});


app.listen (3000, function (){
  console.log ("Server is running on port 3000.");
} );
