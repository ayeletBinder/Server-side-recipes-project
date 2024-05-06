const mongoose=require('mongoose')

const userOfRecipe=mongoose.Schema({
    idUser:{type:Number},
    name:{type:String}
})

const recipeSchema=mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String},
    category:{type:String},
    preparationTime:{type:Number},
    DifficultyLevel:{type:Number,min:1,max:5},
    Addeddate:{type:Date,default:Date.now()},
    layers:{type:[String]},//אפשר מערך של מערכים מסוג:STRING או לעשות מערך של אובייקט מסוג שיכבה (ליצור אוביקט שיכבה ) או
    instructions:{type:String},
    images:{type:[String]},
    IsPrivate:{type:Boolean},
    user:{type:userOfRecipe}
})

module.exports.recipeSchema=mongoose.Schema('recipe',recipeSchema);