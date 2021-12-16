const authenticationRoutes=require('express').Router()
const User=require('../models/user')
const passport = require("passport");



authenticationRoutes.route('/').get((req,res)=>{
    res.render('login');
  });

authenticationRoutes.route('/').post((req, res)=> {
    const user = new User({
      username: req.body.username,
      password: req.body.password
  });
  req.login(user, function (err) {
       if(err){
       console.log(err);}
      passport.authenticate("local",{failureRedirect:'/login'})(req, res, ()=>{
        User.find({username:user.username},(errorFindingId,userData)=>{
          if(errorFindingId) return errorFindingId;
          else{
              if(userData[0].usertype!=='company') return res.redirect('/applyjob');
              res.redirect('/postjob');
          }
        })
       // res.render('home');
  });
  });
  });

  

  module.exports=authenticationRoutes;