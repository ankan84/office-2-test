const mongoose =require('mongoose')

const data=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    image_url:{
        type:String,
        required:true
    }


})

const Product=new mongoose.model('productlist',data)


module.exports=Product;