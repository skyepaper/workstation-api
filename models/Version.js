const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const VersionSchema = new Schema({
    
    number:{
        type:String,
        default:''
    },
    version:{
        type:String,
        default:''
    },
    code:{
        type:String,
        default:''
    }
  
})

const Version = mongoose.model("Version", VersionSchema);
module.exports = Version;
