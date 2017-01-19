var express = require("express");
var app = express();
var PORT = process.env.PORT || 8080; //default
var bodyParser = require('body-parser');

//Express app need to use EJS as templating engine.
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

var urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

 function generateRandomString(){
    var shortURL = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 6; i++){
      let randNumb = Math.floor(Math.random() * possible.length);
      shortURL += possible[randNumb];
    }
    return shortURL;
  }

function updateDataBase(shortURL, newlongURL){
  urlDatabase[shortURL] = newlongURL;
  console.log(`updated ${shortURL} belongs with ${newlongURL}`);
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

app.get("/urls", (request, response) =>{
  let templateVars = { urls: urlDatabase };
  response.render("urls_index", templateVars);
  // response.render("urls_index", { urls: urlDatabase });
});

//for urls_show, showing one shortURL and it's address


app.get("/urls/new", (request, response) =>{
  response.render("urls_new");
});

// app.post("/urls", (request, response) =>{
//   console.log(request.body); //debug statement to see POST para
//   response.send(" OK ");

// });




app.get("/u/:shortURL", (request, response) =>{
  let longURL = urlDatabase[request.params.shortURL];
  response.redirect(longURL);
});

//generate random shortURL
app.post("/urls/new", (request, response) =>{
  var longURL = request.body.longURL;
  var shortURL = generateRandomString();
  urlDatabase[shortURL] = longURL;
  // console.log(urlDatabase);
  response.redirect(`/urls/${shortURL}`);
});

//delete the url
app.post("/urls/:shortURL/delete", (request, response) =>{
  let shortURL = request.params.shortURL;
  delete urlDatabase[shortURL];
  response.redirect("/urls");
});

//update the url
app.post("/urls/:shortURL/update",(request, response) =>{
  let shortURL = request.params.shortURL;
  let newlongURL = request.body.newlongURL;
  updateDataBase(shortURL, newlongURL);
response.redirect("/urls/");
});




app.get("/urls/:id", (request, response) =>{
  let templateVars = { shortURL: request.params.id, urls: urlDatabase };
  response.render("urls_show", templateVars);
});




//listens to port if its working or not
app.listen(PORT, () =>{
  console.log(`Example app listening on port ${PORT}!`);
});

