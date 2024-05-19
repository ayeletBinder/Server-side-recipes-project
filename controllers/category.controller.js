const mongoose=require('mongoose');
const {Category, category} =require('../models/category.model');
const { recipe } = require('../models/recipe.model');

exports.addCategory=async(req,res,next)=>{ //לעשות כך או כמו פונ רגילה ? 
    try {
        // description:{type:String},//שם
        // recipes:{type:[{id:{type:mongoose.Types.ObjectId},name:{type:String,required:true},images:{type:[String]}}]} 
        const r=new Category({description:req.body.category,recipes:[]});
        await r.save();
        return res.status(201).json(r)
    } catch (error) {
        next(error);
    }
};
exports.updateRecipeInCategory=async(req,res,next)=>{
    try {
        //מציאת הקטגוריה
        const description=req.body.category;
        const recipe={recipeId:req.body.recipe.id,description:req.body.recipe.name,images:req.body.recipe.images};
        //הוספה לרשימת המתכונים בקטגוריה - מתכון ושמירה 
        const u=await Category.findByAndUpdate(
            description,
            {$set:recipe},//זה מוסיף או רק משנה ? 
            {new:true}
        )
        return res.json(u);
    } catch (error) {
        next(error);
    }
};
exports.getAllCategory = async (req, res, next) => {
    try {
        const categories = await Category.find({}, { name: 1 });
        return res.json(categories);
    } catch (error) {
        next(error);
    }
}
//אמור להגיע לי ממש מתכון או רק פרטי המתכון שנשמרו לי בקטגוריה?
exports.getAllCategoryWithRecipes=async(req,res,next)=>{
    try {
        const r=await Category.find()
        .populate('recipe','recipe_Id')
        .select('-__v')
        return req.json(r);
    } catch (error) {
        next(error);
    } 
}

//כנ"ל

exports.getAllCategoryWithRecipesByName=async(req,res,next)=>{
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id))
        next({ message: 'id is not valid' })
    else{
        const c=await Category.findById(id,{__v:false})
        .then(req.json(c))
        .catch(next({message:'caterory not found', status: 404 }));
    } 
};




