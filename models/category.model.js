const mongoose=require('mongoose');

const categorySchema=({
    description:{type:String},
    //id of recipe?
    recipes:{type:[{id:{type:Number},name:{type:String,required:true},images:{type:[String]}}]} //recipes - שם, תמונה ,ID
})

module.exports.category=mongoose.model('category',categorySchema);