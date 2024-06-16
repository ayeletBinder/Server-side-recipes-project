const express=require('express');
const { getAllCategory, getAllCategoryWithRecipes,  getAllCategoryWithRecipesById } = require('../controllers/category.controller');

const router=express.Router();

router.get("/",getAllCategory);
router.get("/withRecipes",getAllCategoryWithRecipes);
router.get("getAllCategoryWithRecipesById/:id",getAllCategoryWithRecipesById);

module.exports=router;