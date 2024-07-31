const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const USerSchema=new Schema({
    timestamp:{
        type:String,
        default:function(){return new Intl.DateTimeFormat('en-us',{
            dateStyle:'medium',
            timeStyle:'short',
            timeZone: 'EET'
        }).format(new Date())}
    },
    nickname:{
        type:String,
        default:''
    }   
})

const User=mongoose.model("User", UserSchema);
module.exports=User;
