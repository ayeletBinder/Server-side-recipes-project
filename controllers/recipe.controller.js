const mongoose = require('mongoose');
const { Recipe } = require('../models/recipe.model');
const { Category } = require('../models/category.model');
const fs = require('fs');

exports.getAllRecipe = async (req, res, next) => {
    let { search, perPage, page } = req.query;

    search ??= '';
    perPage ??= 12;
    page ??= 1;

    try {
        const recipes = await Recipe.find({
          name: new RegExp(search),
          IsPrivate: false 
        })
            .skip((page - 1) * perPage)
            .limit(perPage)
            .select('-__v');
          //   for (let i = 0; i < recipes.length; i++) {
          //     const element = recipes[i];
          //     if (element.images){
          //       console.log("before image",recipes[i].images);
          //         recipes[i].images = readImageToBase64(recipes[i].images)
          //       console.log("after image",recipes[i].images);}
          // }
        return res.json(recipes)
    } catch (error) {
        return next(error);
        console.log("perror",error);
    }
}

exports.getRecipeById = async (req, res, next) => {
    const idRecipe = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(idRecipe))
        next({ message: 'id is not valid' });
    else {
        const recipe = await Recipe.findById({_id:idRecipe}, { __v: false })
          // if (recipe.images)
          //   recipe.images= readImageToBase64(recipe.images)
            .then(r=>{res.json(r);})
            .catch(err => {next({ massage: 'the recipe didnt found', status: 404 })});
    }
}

exports.getByUserId = async (req, res, next) => {
    let  id  = req.params.id;
    id=id.slice(1,id.length);
    try {
    const recipes = await Recipe.find({"user._id":id});
    // for (let i = 0; i < recipes.length; i++) {
    //         const element = recipes[i];
    //         if (element.images)
    //             recipes[i].images = readImageToBase64(recipes[i].images)
    //     }
      return res.json(recipes);
  } catch (error) {
      next(error);
  }
}


exports.getRecipeByPreparationTime = async (req, res, next) => {
    let { time } = req.query;
    time ??= Math.max();
    const recipes = await Recipe.find({ preparationTime: { $lte: time } })
        .then(r=>{res.json(r);})
        .catch((err) => { next(err)});
}

//איך לשים את הUSER בתוך המקום?
exports.addRecipe = async (req, res, next) => {
  
    try {
      if (req.token === null) {
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
            const recipeToDelete = await Recipe.findById(id);
            if (!recipeToDelete) {
              return next({ message: 'recipe is not found' });
            }
            if (req.user.role === "admin" || req.user.role ===recipeToDelete.user.role) { // Check authorization
              await Recipe.findByIdAndDelete(id); // Await deletion
              return res.status(204).send(); // Send response after deletion
            } else {
              return next({ message: 'Unauthorized to delete this recipe' });
            }
          } catch (error) {
            return next(error);
          }
    }
}


const path = `${__dirname}/uploads`.replace('\\controllers', '')

function readImageToBase64(images) {
    // בדיקה אם הנתיב לתמונה קיים
    if (!fs.existsSync(`${path}/${images}`)) {
        // throw new Error(`Image path ${imagePath} does not exist.`);
        return ''
    }

    // קריאת התמונה כקובץ בינארי

    const imageBuffer = fs.readFileSync(`${path}/${images}`);

    // המרת נתוני התמונה למחרוזת Base64
    const base64String = Buffer.from(imageBuffer).toString('base64');

    return 'data:image/jpeg;base64,' + base64String;
}

exports.deleteAllRecipe = async (req, res, next) => {
  try {
      const recipeToDelete = await Recipe.find();
      if (!recipeToDelete) {
        return next({ message: 'recipe is not found' });
      }
      // if (req.user.role === "admin" || req.user.role ===recipeToDelete.user.role) { // Check authorization
        await Recipe.deleteMany({}); // Await deletion
        return res.status(204).send(); // Send response after deletion
      // } else {
        // return next({ message: 'Unauthorized to delete this recipe' });
      // }
    } catch (error) {
      return next(error);
    }
}