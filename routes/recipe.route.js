const express=require('express');
const { getAllRecipe, getRecipeById, getRecipeByPreparationTime, addRecipe, deleteRecipe, updateRecipe, getByUserId } = require('../controllers/recipe.controller');
const { auth } = require('../middlewares/auth');

const router=express.Router();

router.get("/getByUserId/:id",getByUserId);

router.get("/:id",getRecipeById);

router.get("/",getAllRecipe);

router.get("/time",getRecipeByPreparationTime);


router.post("/",addRecipe);//admin && user//שגיאה !!!

router.patch("/:id",auth,updateRecipe);//admin && id user

router.delete("/:id",auth,deleteRecipe);//admin && id user 

module.exports=router;