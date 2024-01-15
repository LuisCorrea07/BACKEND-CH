import mongoose from "mongoose";

mongoose.pluralize(null);

const colletion = "products";

const schema = new mongoose.Schema({
  //propiedades del producto
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: false },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
});

export default mongoose.model(colletion, schema);