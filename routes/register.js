
const User=require('../models/user')
const passport = require("passport");

module.exports=(app)=>{

app.get('/',function(req,res){
    res.render("register");
});

app.post('/',function(req,res){
  const userdata={
    username:req.body.username,   
    email:req.body.email,
    location:req.body.location,
    number:req.body.number,
    usertype:req.body.usertype
  }
  User.findOne({ username: userdata.username, email: userdata.email}, function(err, doc) {
    if (err) {
        console.log(err);
    }
    if(!doc){
      User.register(({
        username:userdata.username,   
        email:userdata.email,
        location:userdata.location,
        phone:userdata.number,
        usertype:userdata.usertype
    
        }) , req.body.password,function (err, user) {
          if (err)
          {console.log(err);
              res.redirect("register");
          }
          else
              passport.authenticate("local")(req, res, function () {
                let prevSession = req.session;
                req.session.regenerate((err) => { 
                  if(err){
                    console.log(err);
                  } // Compliant
                Object.assign(req.session, prevSession);
                  console.log(user);
              });
      });
    });
        
        res.render("login");
    }
    else{
        console.error('username or email already exist');
        res.json({A: "no"})
    }
});

});
}