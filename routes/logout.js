
module.exports=(app)=>{
    console.log("clicked");
    app.get("/logout",function(req,res){
        req.logout();
        res.redirect("login");
    })
    
}