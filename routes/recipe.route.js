const express=require('express');
const { getAllRecipe, getRecipeById, getRecipeByPreparationTime, addRecipe, deleteRecipe, updateRecipe } = require('../controllers/recipe.controller');
const { authUser, auth } = require('../middlewares/auth');

const router=express.Router();

router.get("/",getAllRecipe);

router.get("/:id",getRecipeById);

router.get("/",getRecipeByPreparationTime);

// router.get("/with/")

router.post("/",addRecipe);//admin && user

router.patch("/:id",authUser,updateRecipe);//admin && id user

router.delete("/:id",authUser,deleteRecipe);//admin && id user 

module.exports=router;