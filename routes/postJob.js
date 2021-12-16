const Jobs=require('../models/jobs');


module.exports=(app)=>{

app.get("/postjob",function(req,res){
    if (!req.isAuthenticated()) return res.redirect('/login');
    Jobs.findOne({username:req.user.username},(err,data)=>{
      if(err) return err;
      res.render("postjob",{jobs:data.job});
    })

   
  });
  
  app.post("/postjob",function(req, res) {
    const username=req.user.username;
    console.log("iddd"+username);
    const jobDetails={jobtitle:req.body.jobname,jobdescription:req.body.jobdescription,location:req.body.location};
    Jobs.findOrCreate({username:username},(err,done)=>{
      if(err) return err;
      Jobs.findOneAndUpdate({username},{ $push: {job:jobDetails}},(error,data)=>{
            if(error) return console.log(error);

            console.log(data);
          });
          res.redirect("/postjob")
    })
   
  });

}