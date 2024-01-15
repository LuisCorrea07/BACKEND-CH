import mongoose from "mongoose";

mongoose.pluralize(null);

const collection = "carts";

const schema = new mongoose.Schema({
  products: { type: [mongoose.Schema.Types.ObjectId], ref: "products" },
  total: { type: Number, required: true },
});

/* schema.pre("find", function () {
  this.populate({ path: "products", model: productsModel });
}); */

export default mongoose.model(collection, schema);
