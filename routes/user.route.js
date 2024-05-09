const express=require('express');
const {signIn,signUp, getAllUsers} =require('../controllers/user.controller');

const router=express.Router();

router.post('/signin',signIn);
router.post('/signup',signUp);
router.get('/',getAllUsers);

module.exports=router;


