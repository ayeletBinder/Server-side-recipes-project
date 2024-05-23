const mongoose=require('mongoose');

const resipesMiniSchema=({
    _id:{type:mongoose.Types.ObjectId,ref:'recipe'},
    name:{type:String,required:true},
    images:{type:[String]} //recipes - שם, תמונה ,ID
})

const categorySchema=({
    description:{type:String},//שם
    recipes:[resipesMiniSchema]
})



module.exports.Category=mongoose.model('category',categorySchema);