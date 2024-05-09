const express=require('express');
const { getAllRecipe, getRecipeById, getRecipeByPreparationTime, addRecipe, deleteRecipe, updateRecipe } = require('../controllers/recipe.controller');

const router=express.Router();

router.get("/",getAllRecipe);

router.get("/:id",getRecipeById);

router.get("/",getRecipeByPreparationTime);

// router.get("/with/")

router.post("/",addRecipe);

router.patch("/:id",updateRecipe);

router.delete("/:id",deleteRecipe);

module.exports=router;