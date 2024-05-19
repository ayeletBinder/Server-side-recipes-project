const bcrypt=require('bcrypt');
const {User, generateToken, userValidator}=require("../models/user.model")

exports.signIn=async (req,res,next)=>{
    const v=userValidator.signIn.validate(req.body);
    if(v.error)
        next({message:v.error.message});
    const {email,password}=req.body;
    const user = await User.findOne({email})
    if(user){
        bcrypt.compare(password,user.password,(err,same)=>{
            if(err){
               return next(new Error(err.message));
            }
            if(same){
                const token=generateToken(user);
                user.password="****";
                return res.send({user,token});
            }
            return res.send({message:'auth failed',status:401});
        })
    }
    else{
        return next({message:'auth failed',status:401});
    }
}

exports.signUp= async (req,res,next)=>{
   const {name,password,email,address,role} = req.body;
    try {
        const user=new User({name,password,email,address,role});
        await user.save();
        const token=generateToken(user);
        user.password='****';
        return res.status(201).json({user,token});
    } catch (error) {
        return next({message:error.message,status:409});
    }
}

exports.updateUser=async(req,res,next)=>{
    const v=User.userValidator.signUp.validate(req.body);
    if(v.error)
        return next({message:v.error.message});
    const { id }=req.params;
    const userUpdate=req.body;
    try {
        if(id!==userUpdate._id){
            return next({message:'user id conflict',status:409});
        }
        else if(req.user.role==="admin"||req.user._id===id){
            const u=await User.findByAndUpdate(
                id,
                {$set:this.updateUser},
                {new:true}
            )
            return res.json(u);
        }
        else{
            return next({message:`connot update User: ${id}, you can update only your details`,status:403});
        }
    } catch (error) {
        next(error);
    }
}

//get
 exports.getAllUsers = async(req,res,next) => {
     try {
        if(req.user.role==="admin"){
         const users = await User.find({}, { password: 0, __v: 0 });
         res.json(users);
        }
        else{
            next({message:"only the admin can see the uses list"});
        }
     } catch (error) {
         next(error);
     }
 }
