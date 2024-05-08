const mongoose=require('mongoose');
const {Category} =require('../models/category.model');

//לעשות כך?
exports.addCategory=async(req,res,next)=>{
    try {
        
    } catch (error) {
        next(error);
    }
};
exports.updateRecipeInCategory=async(req,res,next)=>{
    try {
        
    } catch (error) {
        next(error);
    }
};
exports.getAllCategory=async(req,res,next)=>{
    try {
        const r=await Category.find({},{name:1});
        return req.json(r);
    } catch (error) {
        next(error);
    }
}
//אמור להגיע לי ממש מתכון או רק פרטי המתכון שנשמרו לי בקטגוריה?
exports.getAllCategoryWithRecipes=async(req,res,next)=>{
    try {
        const r=await Category.find({});
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




