import express from "express";
import viewsRouter from "./routes/views.routes.js";
import productsRouter from "./routes/products.routes.js";
import productsRouter from "./routes/carts.routes.js";

const PORT = 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Endpoints

//Views endpoint
app.use("/", viewsRouter);

//Products endpoint
app.use("/api/products", productsRouter);

//Cards endpoint
app.use("/api/carts", cartsRouter);

app.listen(PORT, () => {
  console.log(`Service enable on port ${PORT}`);
});
