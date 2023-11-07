import express from "express";
import ProductManager from "../ProductManager.js";

const app = express();
const PORT = 8080;

const manager = new ProductManager("productos.json");

app.use(express.json());

// Ruta para obtener todos los productos
app.get("/api/products", (req, res) => {
  const products = manager.getProducts();
  res.json(products);
});

// Ruta para obtener un producto por ID
app.get("/api/products/:pid", (req, res) => {
  const productId = parseInt(req.params.pid);
  const product = manager.getProductById(productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: "Producto no encontrado" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
