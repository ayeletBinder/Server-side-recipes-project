const mongoose=require('mongoose');
const {Recipe} =require('../models/recipe.model');
const {Category} =require('../models/category.model');
const { addCategory, updateRecipeInCategory } = require('./category.controller');

exports.getAllRecipe=async(req,res,next)=>{
    let {search,perPage,page}=req.query;

    search ??= '';
    perPage ??=12;
    page ??=1

    try {
        const recipes= await Recipe.find({name:new RegExp(search)})
        .skip((page-1)*perPage)
        .limit(perPage)
        .select('-__v');
        return res.json(recipes)
    } catch (error) {
        return next(error);
    }
}

exports.getRecipeById=async(req,res,next)=>{
    const idRecipe =req.params.id;
    if(!mongoose.Types.ObjectId.isValid(idRecipe))
        next({message: 'id is not valid'});
    else{   
            const recipe=await Recipe.findById(idRecipe, {__v:false})
            .then( recipe.json())
            .catch(err=>({massage:'the recipe didnt found',status:404}));
    }
}

// exports.getByUser מה צריך לעשות??

exports.getRecipeByPreparationTime=async(req,res,next)=>{
    const time = req.body.time;
    if ( typeof time == 'number' && time >= 0 ){
        const recipes= await Recipe.find({preparationTime:{$lte:time}})
        .then( recipes.json())
        .catch( (err)=> next(err));
    }
    else{
        next({massage:'time is only number and bigger then zero'});
    }
}

exports.addRecipe=async(req,res,next)=>{
    let c=Category.GetAllCategory().find({category:req.body.category});
    try {
        if(!c){
            //יצירת הקטגוריה
            addCategory(req.body.category);
        }
        //להכניס למתכונים את המתכון
        const r=new Recipe(req.body);
        await r.save();
        return res.status(201).json(r)
        //להכניס למערך מתכונים שבתוך הקטגוריות את המתכון
        // ?? update    
        updateRecipeInCategory(req.body);

    } catch (error) {
        next(error);
    }
    
    // user:{type:{id:{type:Number},name:{type:String}}}
}
//צריך לעדכן ג"כ בקטגוריה?
exports.updateRecipe=async(req,res,next)=>{
    const {id} = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id))
        next({message:'id is not valid'})
    else{
        try {
            const r=await Recipe.findByIdAndUpdate(
                id,
                {$set:req.body},
                {new:true}
            )
            return res.json(r);
        } catch (error) {
            next(error);
        }
    }
}

exports.deleteRecipe=async(req,res,next)=>{
    const {id} = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id))
        next({message:'id is not valid'})
    else{
        try {
            const idr=await Recipe.findById(id)
            if(!idr)
                return next({message:'recipe is not fount'});
            // if(req.user.role === "admin" || req.user.role ===idr.user.role)//האם יש לו הרשאת גישה למחוק מתכון...
            await Recipe.findByIdAndDelete(id);
            return res.status(204).send();
        } catch (error) {
            return next(error);
        }
    }
}