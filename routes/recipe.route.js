const express=require('express');
const { getAllRecipe, getRecipeById, getRecipeByPreparationTime, addRecipe, deleteRecipe, updateRecipe, getByUserId, deleteAllRecipe } = require('../controllers/recipe.controller');
const { auth } = require('../middlewares/auth');
const { upload } = require('../middlewares/uploudFile');

const router=express.Router();

router.delete("/deleteAllRecipe",auth,deleteAllRecipe);//admin && id user 

router.get("/getByUserId/:id",getByUserId);

router.get("/:id",getRecipeById);

router.get("/",getAllRecipe);

router.get("/time",getRecipeByPreparationTime);

router.post("/",auth,upload.single('image'),addRecipe);//admin && user//שגיאה !!!

router.patch("/:id",auth,upload.single('image'),updateRecipe);//admin && id user

router.delete("/:id",auth,deleteRecipe);//admin && id user 

module.exports=router;