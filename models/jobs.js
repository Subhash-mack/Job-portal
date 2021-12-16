const mongoose=require('mongoose');
const findOrCreate=require('mongoose-findorcreate')
const JobsSchema = new mongoose.Schema({

    username:{type:String,ref:'User'},
    job:[{jobtitle: String, jobdescription: String, keywords: String, location: String, 
        appliedBy:[{username:String,email:String,phone:Number,location:String}] }]
});
JobsSchema.plugin(findOrCreate)
module.exports= mongoose.model("Jobs",JobsSchema);