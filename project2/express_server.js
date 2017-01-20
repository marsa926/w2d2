var express = require('express');
var app = express();
var PORT = process.env.PORT || 8080; //default
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');



//Express app need to use EJS as templating engine.
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());


var urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

const userData = {
  "123552": {id: "123552", email: "user@example.com", password: "123"}
};



function checkEmail(email){
  for (var userid in userData){
    if (email === userData[userid]["email"]){
      return userData[userid]["id"];
    }
  }
  return false;
}

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





//SETS THE /urls/ PAGE LAYOUT
app.get("/urls", (request, response) =>{
  let templateVars = {
    urls: urlDatabase,
    userDatabase: userData,
    userid: request.cookies["userid"] };
  response.render("urls_index", templateVars);
  // response.render("urls_index", { urls: urlDatabase });
});

//for urls_show, showing one shortURL and it's address

//SETS THE /URLS/NEW PAGE LAYOUT
app.get("/urls/new", (request, response) =>{
 let templateVars =  {
    userDatabase: userData,
    userid: request.cookies["userid"] };
  if (!templateVars){
    response.status(403).send("You must log-in first!");
  } else {
    response.render("urls_new", templateVars);
  }
});



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





//DELETE THE urls on /URL/
app.post("/urls/:shortURL/delete", (request, response) =>{
  let shortURL = request.params.shortURL;
  delete urlDatabase[shortURL];
  response.redirect("/urls");
});

//UPDATE THE /URL/
app.post("/urls/:shortURL/update",(request, response) =>{
  let shortURL = request.params.shortURL;
  let newlongURL = request.body.newlongURL;
  updateDataBase(shortURL, newlongURL);
response.redirect("/urls/");
});

//SHOWS THE /URLS/shortURLS/ PAGE
app.get("/urls/:id", (request, response) =>{
  let templateVars = {
    shortURL: request.params.id,
    urls: urlDatabase,
    userid: request.cookies["userid"],
    userDatabase: userData
  };
  response.render("urls_show", templateVars);
});





//LOGIN ROUTE
app.get("/login", (request, response) =>{
  response.render("url_login");
});


// DISPLAY THE USERNAME ON _HEADERS
app.post("/login", (request, response) =>{
  let email = request.body.email;
  let userid = checkEmail(email);
  let password = request.body.password;

  if(userid && userData[userid]["password"] === password){

    response.cookie("userid", userid);

  } else {
    response.status(403).send('Something Wrong');
  }
  response.redirect("/urls");
});




//LOGOUT ROUTE
app.get("/logout", (request, response) =>{
  response.redirect('/urls');
});

//DISPLAY THE USERNAME LOG-OUT
app.post("/logout", (request, response) =>{
  response.cookie("userid", "");
  response.redirect("/urls");
});




//DISPLAY THE REGISTRATION PAGE
app.get("/register", (request, response)=>{
  response.render("url_registration");
});

//REGISTRAION PART
app.post("/register",(request, response)=>{

  var email = request.body.email;
  var password = request.body.password;
  var userid = generateRandomString();
  userData[userid] =  {"id": userid, "email": email, "password": password};
  //response.render("url_registration", userData[userid]);
  response.cookie("userid",userData[userid].id);
  response.redirect("/urls");
});




//listens to port if its working or not
app.listen(PORT, () =>{
  console.log(`Example app listening on port ${PORT}!`);
  });