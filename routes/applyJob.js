const Jobs = require('../models/jobs');

module.exports = (app) => {

  // app.use(getJobDetails)

  app.get('/applyjob',getJobDetails, function (req, res) {
    if (!req.isAuthenticated()) return res.redirect('/login');
    res.render("applyjob", { jobs: req.jobDetails });
  });



  app.get('/jobDetails/:id', getJobDetails, (req, res) => {
    if (!req.isAuthenticated()) return res.redirect('/login');
    const jobId = req.params.id;
          req.jobDetails.forEach((eachJob)=>{
          if (eachJob._id.toString() === jobId) return res.render('jobDetail', {
            job: eachJob,user:req.user
          });
        })
  });
  app.post('/applyjob/:id/company/:company/', getJobDetails,(req, res) => {
    if(!req.isAuthenticated()) return res.redirect('/login');
    const jobId = req.params.id;
    const recruiterName=req.params.company;
    const username=req.user.username;
    const userEmail=req.user.email;
    const userPhone=req.user.phone;
    const userLocation=req.user.location;
    const appliedBy={username:username,email:userEmail,phone:userPhone,location:userLocation};
    console.log(username,userEmail,userPhone,userLocation,recruiterName);
    const filter={"job._id":jobId}
    const update={"$push": {"job.$.appliedBy": appliedBy }};
    Jobs.findOne({"job":{ "$elemMatch":{"appliedBy.username":username,"_id":jobId}}},(error,data)=>{
      if(error) return console.log(error);
      if(data) return console.log(data);
      Jobs.findOneAndUpdate(filter,update,(err,updated)=>{
        if(err) return console.log(err);
        console.log(updated);
      });
    });
    
    res.redirect('/applyjob');
          
        });


  async function getJobDetails(req,res,next) {
    let data=await Jobs.find({})
    let jobDetails=[];
      data.forEach((eachUser) => {
        eachUser.job.forEach((eachJob) => {
          eachJob.user=eachUser.username;
          jobDetails.push(eachJob);
        });
      });
      req.jobDetails=jobDetails;
     // console.log(jobDetails)
      next();
  }

  


  

}