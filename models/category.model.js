const mongoose=require('mongoose');

const categorySchema=({
    description:{type:String},//שם
    //id of recipe?
    recipes:{type:[{id:{type:mongoose.Types.ObjectId},name:{type:String,required:true},images:{type:[String]}}]} //recipes - שם, תמונה ,ID
})

module.exports.category=mongoose.model('category',categorySchema);