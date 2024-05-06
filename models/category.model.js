const mongoose=require('mongoose');

const categorySchema=({
    description:{type:String},
    recipes:{type:[recipesOfCategorySchema]} //recipes - שם, תמונה ,ID
})
const recipesOfCategorySchema=({
    //id of recipe?
    name:{type:String,required:true},
    images:{type:[String]},
})

module.exports.categorySchema=mongoose.Schema('category',categorySchema);