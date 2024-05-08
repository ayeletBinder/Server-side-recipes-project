const express=require('express');
const { getAllCategory, getAllCategoryWithRecipes } = require('../controllers/category.controller');

const router=express.Router();

router.get("/",getAllCategory);
router.get("/withRecipes",getAllCategoryWithRecipes);
router.get("/:id",getAllCategoryWithRecipes);

module.exports=router;