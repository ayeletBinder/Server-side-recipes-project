const express=require('express');
const { getAllRecipe, getRecipeById, getRecipeByPreparationTime, addRecipe, deleteRecipe, updateRecipe } = require('../controllers/recipe.controller');
const { auth } = require('../middlewares/auth');

const router=express.Router();

router.get("/",getAllRecipe);

router.get("/time",getRecipeByPreparationTime);

router.get("/:id",getRecipeById);

// router.get("/with/")

router.post("/",auth,addRecipe);//admin && user//שגיאה !!!

router.patch("/:id",auth,updateRecipe);//admin && id user

router.delete("/:id",auth,deleteRecipe);//admin && id user 

module.exports=router;