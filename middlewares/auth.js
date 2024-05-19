const jwt=require("jsonwebtoken");

exports.auth=(req,res,next)=>{
    try {
    const {authorization} =req.header;
    const [,token]=authorization.split(' ');
    const privateKey=process.env.JWT_SECRET ||'JWT_SECRET';
    const data= jwt.verify(token,privateKey);
    req.user=data;
    next();
    } catch (error) {
        next({message:error,status:401});
    }
};

exports.authUser=(req,res,next)=>{
    // if(req.user.role == null){
    //     res.send('you have to logIn');
    // }
    // next();
}

exports.authAdmin=(req,res,next)=>{
    // if(req.user.role != 'admin'){
    //     res.send('you are not admin');
    // }
    // next();
}

