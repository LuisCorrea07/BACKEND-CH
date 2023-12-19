import mongoose from "mongoose";

const productColletion = 'products'

const productSchema = new mongoose.Schema({
    //propiedades del producto
    descripcion: String,
    precio:Number,
    stock: Number
})

export default productsModel = mongoose.model(productColletion, productSchema)