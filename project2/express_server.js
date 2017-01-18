var express = require("express");
var app = express();
var PORT = process.env.PORT || 8080; //default


//Express app need to use EJS as templating engine.
app.set("view engine", "ejs");


var urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

//generate random shortURL
function generateRandomString(){
  let randomStr = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 6; i++){
      randomStr += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return randomStr;
}


//this will print out Hello! on http://localhost:8008
// app.get("/", function(request, response){
//   response.end("Hello!");
// });

//this will print out urlDatabase, code/url address on http://localhost:8080/urls.json
// app.get("/urls.json", function(request, response){
//   response.json(urlDatabase);
// });


//this will print out HELLO WORLD(bold) in http://localhost:8080/hello
// app.get("/hello", function(request, response){
//   response.end("<html><body>HELLO <b>WORLD</b></body></html>\n");
// });

app.get("/urls", function(request, response){
  let templateVars = { urls: urlDatabase };
  response.render("urls_index", templateVars);
  // response.render("urls_index", { urls: urlDatabase });
});

//for urls_show, showing one shortURL and it's address
app.get("/urls/:id", function(request, response){
  let templateVars = { shortURL: request.params.id, urls: urlDatabase };
  response.render("urls_show", templateVars);
});

app.get("/urls/new", function(request, response){
  response.render("urls_new");
});

app.post("urls/new", function(request, response){
  console.log(request.body.form); //debug statement to see POST para
  response.send("OK");
});


//listens to port if its working or not
app.listen(PORT, function(){
  console.log(`Example app listening on port ${PORT}!`);
});

