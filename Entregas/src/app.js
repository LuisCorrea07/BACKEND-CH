import express from 'express';
import productsRouter from './routes/products.routes.js';
import cartsRouter from './routes/cart.routes.js';

// server
const app = express();
const PORT = 8080;

// Middleware para parsear el cuerpo de las peticiones como JSON
app.use(express.json());

// Ruta raíz
app.get('/', (req, res) => {
  res.send('¡Bienvenido!!');
});

// Rutas para productos
app.use('/api/products', productsRouter);

// Rutas para carritos
app.use('/api/carts', cartsRouter);

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
