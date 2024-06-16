const mongoose=require('mongoose');
const {Category, category} =require('../models/category.model');
const { recipe } = require('../models/recipe.model');


// exports.updateRecipeInCategory=async(req,res,next)=>{
//     try {
//         //מציאת הקטגוריה
//         const description=req.body.category;
//         const recipe={recipeId:req.body.recipe.id,description:req.body.recipe.name,images:req.body.recipe.images};
//         //הוספה לרשימת המתכונים בקטגוריה - מתכון ושמירה 
//         const u=await Category.findByAndUpdate(
//             description,
//             {$set:recipe},//זה מוסיף או רק משנה ? 
//             {new:true}
//         )
//         return res.json(u);
//     } catch (error) {
//         next(error);
//     }
// };
exports.getAllCategory = async (req, res, next) => {
    try {
        const categories = await Category.find({});
        return res.json(categories);
    } catch (error) {
        next(error);
    }
}

exports.getAllCategoryWithRecipes=async(req,res,next)=>{
    try {
        const r=await Category.find({})
        .populate('recipes')
        .select('-__v')
        return res.json(r);
    } catch (error) {
        next(error);
    } 
}

//כנ"ל

exports.getAllCategoryWithRecipesById=async(req,res,next)=>{
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id))
        next({ message: 'id is not valid' })
    else{
        const c=await Category.findById(id, { __v: false })
        .then(c=>{res.json(c);})
        .catch(()=>{next({message:'caterory not found', status: 404 })});
    } 
};




