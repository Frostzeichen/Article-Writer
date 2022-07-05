//PRELOADING
//express
const express = require("express")
const app = express()

//http
const http = require("http")
const server = http.createServer(app)

//pug
const pug = require("pug")
app.set("views", "./views")
app.set("view engine", "pug")

//bodyparser
const bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//fauna
const faunadb = require("faunadb")
const q = faunadb.query;
const serverClient = new faunadb.Client({ secret: 'fnAEpWUSYOACU7N-i78QFG_sp94yh1ES6_P03RZQ' });

//article-storage
const atclstorage = require("./controllers/storage/article-storage")

//upload-article-to-database
const upatcltodb = require("./controllers/storage/upload-article-to-database.js")

//SERVER
//app.get
app.get("/", (req, res) => res.render("writer.pug"))//res.render("index.pug"))
app.get("/success", (req, res) => res.render("success.pug"))
app.get("/writer", (req, res) => res.render("writer.pug"))
app.get("/article-list", (req, res) => res.render("article-list.pug"))

//app.post
app.post("/saveArticle", (req, res) => {
  let output = [];
  output.push(req.body);
  output = output[0];
  output.date = {
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
    year: new Date().getFullYear()
  }
  output.likes = 0;
  output.dislikes = 0;
  output.views = 0;
  output.comments = [];
  output.is_article = true;
  console.log(output);

  let originalListArticles = atclstorage.listArticles;
  originalListArticles.push(output);
  console.log(originalListArticles);

  serverClient.query(
    q.Create(
      q.Collection("articles"),
      {data: output},
    )
  )
  .then((ret) => console.log(ret))
  .catch((err) => console.error(
    'Error: [%s] %s: %s',
    err.name,
    err.message,
    err.errors()[0].description,
  ))
  
  res.render("success.pug");
})

//server info
const port = 9
const appName = "Project Nuntius - Website Template"
const version = "version 2.1.0 - Pre-release"
server.listen(port, (error) => {
  if(error){
    console.error(error);
  } else {
    console.log(appName + " " + version);
    console.log("Listening! @ port " + port);
  };
})