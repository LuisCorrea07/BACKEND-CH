import mongoose from "mongoose";

mongoose.pluralize(null)

const colletion = 'products'

const schema = new mongoose.Schema({
    //propiedades del producto
    descripcion: {type: String, required:true},
    precio:{type: Number, required:true},
    stock: {type: Number, required:true},
})
const model = mongoose.model(collection,shema)

export default model