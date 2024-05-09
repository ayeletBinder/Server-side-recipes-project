const mongoose=require('mongoose')
const joi=require('joi')


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

module.exports.recipe=mongoose.model('recipe',recipeSchema);

exports.recipeValidator={
    addRecipe:joi.object().keys({
        name:joi.string().required(),
        description:joi.string(),
        category:joi.string(),
        preparationTime:joi.number(),
        DifficultyLevel:joi.number().min(1).max(5),
        // Addeddate:joi.Date(),
        // layers:joi.{description:joi.String},products:joi.[String]}}},//אפשר מערך של מערכים מסוג:STRING או לעשות מערך של אובייקט מסוג שיכבה (ליצור אוביקט שיכבה ) או
        instructions:joi.string(),
        images:joi.string(),//[s]
        // IsPrivate:joi.Boolean(),
        // user:joi.{id:joi.Number},name:joi.String()
    }),
    updateRecipe:joi.object().keys({
        name:joi.string(),
        description:joi.string(),
        category:joi.string(),
        preparationTime:joi.number(),
        DifficultyLevel:joi.number().min(1).max(5),
        // Addeddate:joi.Date(),
        // layers:joi.{description:joi.String},products:joi.[String]}}},//אפשר מערך של מערכים מסוג:STRING או לעשות מערך של אובייקט מסוג שיכבה (ליצור אוביקט שיכבה ) או
        instructions:joi.string(),
        images:joi.string(),//[s]
        // IsPrivate:joi.Boolean(),
        // user:joi.{id:joi.Number},name:joi.String()
    }),
}