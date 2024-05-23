const mongoose = require('mongoose');
const { Recipe, recipeValidator } = require('../models/recipe.model');
const { Category } = require('../models/category.model');
const { addCategory, updateRecipeInCategory } = require('./category.controller');
const { User } = require('../models/user.model');

exports.getAllRecipe = async (req, res, next) => {
    let { search, perPage, page } = req.query;

    search ??= '';
    perPage ??= 12;
    page ??= 1;

    try {
        const recipes = await Recipe.find({ name: new RegExp(search) })
            .skip((page - 1) * perPage)
            .limit(perPage)
            .select('-__v');
        return res.json(recipes)
    } catch (error) {
        return next(error);
    }
}

exports.getRecipeById = async (req, res, next) => {
    const idRecipe = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(idRecipe))
        next({ message: 'id is not valid' });
    else {
        const recipe = await Recipe.findById({_id:idRecipe}, { __v: false })
            .then(r=>{res.json(r);})
            .catch(err => {next({ massage: 'the recipe didnt found', status: 404 })});
    }
}

exports.getByUserId = async (req, res, next) => {
    const { id } = req.params;
    const user = User.findById({ _id: id });
    if (id != req.user.id);
    {
        return next({ message: 'you dont have allow' });
    }
    const recipes = Recipe.find({ user: { id: id } });
    res.send(recipes);
}

exports.getRecipeByPreparationTime = async (req, res, next) => {
    let { time } = req.query;
    time ??= Math.max();
    const recipes = await Recipe.find({ preparationTime: { $lte: time } })
        .then(r=>{res.json(r);})
        .catch((err) => { next(err)});
}

exports.addRecipe = async (req, res, next) => {
    try {
      if (req.user.role === null) {
        return next({ message: 'You are not authorized to add recipes for this user.', status: 401 });
      }
      const recipe = new Recipe(req.body);
      let category;
      for (let i = 0; i < req.body.category.length; i++) {
        category = await Category.findOne({description:req.body.category[i]});
        if(!category)
        {
          category = new Category({description:req.body.category[i],recipes:[]}); 
          await category.save();
        }
        // const minRecipe={_id:recipe._id,name:recipe.name,images:recipe.images};//צריך להכניס כל שדה בנפרד?
        category.recipes.push(recipe);
        await category.save();
        console.log("recipes",category.recipes);
  
      }
     
      await recipe.save();
      res.status(201).json(recipe);
    } catch (error) {
      next(error); 
    }
  };
//צריך לעדכן ג"כ בקטגוריה?
exports.updateRecipe = async (req, res, next) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id))
        next({ message: 'id is not valid' })
    else {
        try {
            const r = await Recipe.findByIdAndUpdate(
                id,
                { $set: req.body },
                { new: true }
            )
            return res.json(r);
        } catch (error) {
            next(error);
        }
    }
}

exports.deleteRecipe = async (req, res, next) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id))
        next({ message: 'id is not valid' });
    else {
        try {
            const idr = await Recipe.findById(id)
            if (!idr)
                return next({ message: 'recipe is not fount' });
            if(req.user.role === "admin" )//|| req.user.role ===idr.user.role האם יש לו הרשאת גישה למחוק מתכון...
            await Recipe.findByIdAndDelete(id);
            return res.status(204).send();
        } catch (error) {
            return next(error);
        }
    }
}