const express=require('express');
const { getAllCategory, getAllCategoryWithRecipes, getAllCategoryWithRecipesByName } = require('../controllers/category.controller');

const router=express.Router();

router.get("/",getAllCategory);
router.get("/withRecipes",getAllCategoryWithRecipes);
router.get("/:id",getAllCategoryWithRecipesByName);

module.exports=router;