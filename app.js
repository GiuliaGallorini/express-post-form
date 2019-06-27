const express = require("express");
const bodyParser = require("body-parser"); // NEW

const app = express();

// Middleware that defines req.body
app.use(bodyParser.urlencoded({ extended: true})); // NEW

// // What is a middleware?
// // It is a function with 3 parameters: req, res, next
// // How to spot a middleware?
// // - when it is a function of (req, res, next)
// // - when you see app.use(blabla) => blabla is a middleware
// // You can define your own middleware
// app.use((req, res, next) => {
//   console.log("This is my 1st middleware");
//   next(); // Go to the next middleware
// });

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));

// Middleware executed only when the page is "GET /"
app.get("/", (req, res, next) => {
  res.render("index"), {
    message: req.query.errorMessage
  };
});

// Version 1
// app.post("/login", (req, res, next) => {
//   console.log("req.body", req.body)
//   let username = req.body.username;
//   let password = req.body.password;
//   let message = "";
//   if (username === "maxence" && password === "chartreuse") {
//     message = "Welcome Maxence"
//   } else {
//     message = "Go away!";
//   }
//   res.render("post-login", {message: message });
// });

// Version 2
app.post("/login", (req, res, next) => {
  console.log("req.body", req.body)
  let username = req.body.username;
  let password = req.body.password;
  let message = "";
  if (username === "maxence" && password === "chartreuse") {
    // Redirect to "GET "http://localhost:3000/success-login"
    res.redirect("/success-login");
  } else {
    // Go to the route "GET /" and give a `req.query.errorMessage`
    res.redirect("/?errorMessage=Wrong credientals");
  }
});

// Something is missing: we can access this page even if we are not logged in
// We will solve this issue in week5
app.get("/success-login", (req, res, next) => {
  res.render("success-login");
});

app.listen(3000, () => {
  console.log("App running on http://localhost:3000");
});