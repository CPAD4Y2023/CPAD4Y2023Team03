const mongoose = require('mongoose');

//Schema for the product
const vegetableSchema = mongoose.Schema( {
    
        name:{
            type: String,
            required: [true, "Please Enter the name of Vegetable"],
            unique:true
        },
        quantity:{
            type:Number,
            required:true,
            defualt:0
        },
        price:{
            type: Number,
            required: true,
        },
        image:{
            type:String,
            required:false,
        }   
},
{
    timestamps: true
}
);

//Create the Product Model
const Vegetable = mongoose.model('Vegetable', vegetableSchema )
module.exports = Vegetable;
