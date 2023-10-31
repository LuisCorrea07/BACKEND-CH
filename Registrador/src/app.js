import express from "express";
const PORT = 8080;

//crear una instancia that reads the express server
const app = express();

const ProductManager = require('./productManager');
const manager = new ProductManager('productos.json'); 
app.use(express.json());

// Ruta para obtener todos los productos
app.get('/api/products', (req, res) => {
    const limit = req.query.limit; // Obtener el valor del parámetro de consulta "limit"
    const products = manager.getProducts();
  
    if (limit) {
      // Si se proporciona un valor de "limit", devuelve solo los primeros "limit" productos
      const limitedProducts = products.slice(0, limit);
      res.json(limitedProducts);
    } else {
      // Si no se proporciona "limit", devuelve todos los productos
      res.json(products);
    }
  });
  
  // Ruta para obtener un producto por ID
  app.get('/api/products/:pid', (req, res) => {
    const productId = parseInt(req.params.pid); // Obtener el ID del producto desde req.params
    const product = manager.getProductById(productId);
  
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  });
  
  // Iniciar el servidor
  app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
  });

