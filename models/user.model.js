const mongoose=require('mongoose');
const jwt =require('jsonwebtoken');

const userSchema=new mongoose.Schema({
name:{type:String,required:[true,"name is required"]},
password:{type:String,required:[true,"password have to be strong passworrd"]},
email:{type:String,required:[ true, 'Email address is required'],unique: true},//match
address:{type:String,default:"israel"},
role:{type:Boolean,required:true}
})

module.exports.user=mongoose.model("User",userSchema);

module.exports.generateToken=(user)=>{
    const privateKey= process.env.JWT_SECRET||'JWT_SECRET';
    const data={role:user.role,user_id:user._id};
    const token=jwt.sign(data,privateKey,{expiresIn:'1h'});
    return token;
}