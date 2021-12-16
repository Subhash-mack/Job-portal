const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash")
const session = require('express-session')
const passport = require("passport");
const connectEnsureLogin = require('connect-ensure-login');
const findOrCreate = require('mongoose-findorcreate');
const user= new require("./models/user");
const authenticationRoutes = require("./routes/login");

const app=express();
app.use(express.static("public"));

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(session({
  secret: "Our little secret.",
  resave:false,
  saveUninitialized:false
}));

mongoose.connect("mongodb://localhost:27017/Job");

app.use(passport.initialize());
app.use(passport.session());

passport.use(user.createStrategy());
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

require('./routes/register')(app);
app.use('/login',authenticationRoutes)
require('./routes/applyJob')(app);
require('./routes/postJob')(app);






  //res.render("login");



require('./routes/logout')(app);

app.listen(3000, function () {
    console.log("Server started on port 3000");
  });