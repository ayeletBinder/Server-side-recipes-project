const mongoose=require('mongoose')


const recipeSchema=mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String},
    category:{type:String},
    preparationTime:{type:Number},
    DifficultyLevel:{type:Number,min:1,max:5},
    Addeddate:{type:Date,default:Date.now()},
    layers:{type:{description:{type:String},products:{type:[String]}}},//אפשר מערך של מערכים מסוג:STRING או לעשות מערך של אובייקט מסוג שיכבה (ליצור אוביקט שיכבה ) או
    instructions:{type:String},
    images:{type:[String]},
    IsPrivate:{type:Boolean},
    user:{type:{id:{type:Number},name:{type:String}}}
})

module.exports.recipeSchema=mongoose.Schema('recipe',recipeSchema);