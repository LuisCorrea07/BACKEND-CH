import mongoose from "mongoose";

mongoose.pluralize(null);

const collection = "users";

const schema = new mongoose.Schema({
  //users properties
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true },
  age: { type: Number, required: true },
  active: { type: Boolean, required: true },
});

const model = mongoose.model(collection, schema);

export default model;
