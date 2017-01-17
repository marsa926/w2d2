var express = require("express");
var app = express();
var PORT = process.env.PORT || 8080; //default

var urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

//this will print out Hello! on http://localhost:8008
// app.get("/", function(request, response){
//   response.end("Hello!");
// });

//this will print out urlDatabase, code/url address on http://localhost:8080/urls.json
// app.get("/urls.json", function(request, response){
//   response.json(urlDatabase);
// });


//this will print out HELLO WORLD(bold) in http://localhost:8080/hello
app.get("/hello", function(request, response){
  response.end("<html><body>HELLO <b>WORLD</b></body></html>\n");
});

app.listen(PORT, function(){
  console.log(`Example app listening on port ${PORT}!`);
});