const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
name:{type:String,required:[true,"name is required"]},
password:{type:String,required:[true,"password have to be strong passworrd"]},
email:{type:String,required:[ true, 'Email address is required'],unique: true},//match
address:{type:String,default:"israel"},
role:{type:Boolean,required:true}
})
module.exports.userSchema=mongoose.model("User",userSchema);

exports.generateToken=(user)=>{

}