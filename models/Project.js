const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
   
    name:{
        type:String,
        default:''
    },
    pass:{
        type:String,
        default:''
    },
    type:{
        type:String,
        default:''
    },
    hours:{
        type:Number,
        default:0
    }
  
})

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;
