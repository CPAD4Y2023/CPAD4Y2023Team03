const Vegetable = require('../models/Vegetable')

//Get all the products
exports.getAllVegetables = async(req,res)=>{
    try{
        const products = await Vegetable.find({});
        res.status(200).json(products);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}


//Get product by id
exports.getVegetableById = async(req,res)=>{
    try{
        const {id} = req.params;
        const product = await Vegetable.findById(id);
        res.status(200).json(product);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
};

//Add Product
exports.addVegetable = async(req, res)=>{
    try{
        const product = await Vegetable.create(req.body)
        res.status(200).json(product);
     }
     catch (error){
        console.log(error.message);
        res.status(200).json({message: error.message})
     }
 
};

//update the product
exports.updatedVegetable =  async(req,res)=>{
    try{
        const {id} = req.params;
        const product = await Vegetable.findByIdAndUpdate(id, req.body);
        //cannot find prod in db
        if(!product){
            return res.status(404).json({message: `Can't find the product with ID ${id}`})
        }
        const updatedProduct = await Vegetable.findById(id);
        res.status(200).json(updatedProduct);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

//delete the product
exports.deleteVegetable = async(req,res)=>{
    try{
        const {id} = req.params;
        const product = await Vegetable.findByIdAndDelete(id);
        //cannot find prod in db
        if(!product){
            return res.status(404).json({message: `Can't find the product with ID ${id}`})
        }
       
        res.status(200).json(product);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}


