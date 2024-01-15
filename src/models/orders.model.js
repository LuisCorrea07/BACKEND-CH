import mongoose from "mongoose";

mongoose.pluralize(null)

const collection = 'orders'

const schema = new mongoose.Schema({
    name:{ type: String, required: true}, 
    model:{ type: String, required: true},
    price:{ type: Number, required:true},
    category:{ type: String, required: true},
    date: {type: Date}
})

export default mongoose.model(collection, schema)