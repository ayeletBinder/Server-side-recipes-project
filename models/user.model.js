const mongoose=require('mongoose');
const jwt =require('jsonwebtoken');
const  bcrypt=require('bcrypt');
const Joi = require('joi');

const userSchema=new mongoose.Schema({
name:{type:String,required:[true,"name is required"]},
password:{type:String,required:[true,"password have to be strong passworrd"]},
email:{type:String,required:[ true, 'Email address is required'],unique: true},//match
address:{type:String,default:"israel"},
role:{type:String,default:'user',enum:['user','admin']}
})

userSchema.pre('save',function(next){
const salt=+process.env.BCRYPT_SALT|10;
bcrypt.hash(this.password,salt,async(err,hashPass)=>{
    if(err){
        throw new Error({message:err})
    }
    this.password=hashPass;
    next();
})
});

module.exports.userValidator={
    signIn:Joi.object().keys({
        email:Joi.string().email().required(),
        password:Joi.string().min(4).max(10)
    }),
    signUp:Joi.object().keys({
        name:Joi.string().min(2).required(),
        password:Joi.string().required(),
        email:Joi.string().email().required(),
        address:Joi.string().min(2).max(20),
        admin:Joi.string().valid('user','admin')
    }),
};

module.exports.User = mongoose.model('users', userSchema);

module.exports.generateToken=(user)=>{
    const privateKey= process.env.JWT_SECRET||'JWT_SECRET';
    const data={role:user.role,user_id:user._id};
    const token=jwt.sign(data,privateKey,{expiresIn:'1h'});
    return token;
}