import mongoose from "mongoose";

mongoose.pluralize(null)

const collection = 'users'

const shema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    userName: {type: String, required: true},
    age: { type: Number, required: true},
    active: {type: Boolean, required: true},
})

const model = mongoose.model(collection, shema)

export default model