import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

mongoose.pluralize(null);

const collection = "users";

const schema = new mongoose.Schema({
  //users properties
  firstName: { type: String, required: true, index: true },
  lastName: { type: String, required: true, index: true },
  email: { type: String, required: true },
  gender: { type: String, required: true },
});

schema.plugin(mongoosePaginate);

const model = mongoose.model(collection, schema);

export default model;
