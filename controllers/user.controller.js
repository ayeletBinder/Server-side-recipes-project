const bcrypt=require('bcrypt');
const User=require("../models/user.model")

exports.signIn=async (req,res,next)=>{
    const {email,password}=req.body;
    const user = await User.findOne({email})
    if(user){
        bcrypt.compare(password,user.password,(err,same)=>{
            if(err){
               return next(new Error(err.message));
            }
            if(same){
                const token=User.generateToken(user);
                user.password="****"
                return res.send({user,token});
            }
            return res.next({message:'auth failed',status:401});
        })
    }
    else{
        return res.next({message:'auth failed',status:401});
    }
}

exports.signUp= async (req,res,next)=>{
   const {name,password,email,address,role} = req.body;
    try {
        const user=new User(name,password,email,address,role);
        await user.save();
        const token=User.generateToken(user);
        user.password='****';
        return res.status(201).json({user,token});
    } catch (error) {
        return res.next({message:error.message,status:409})
    }
}

exports.updateUser=async(req,res,next)=>{
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