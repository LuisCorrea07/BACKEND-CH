import express from "express";
import { Router } from "express";

// routes/carts.mjs
const router = Router();

// Simula una lista de carritos
let carts = [
  { id: 1, products: [] },
  { id: 2, products: [] },
];

// Ruta raíz POST /api/carts
router.post("/", async (req, res) => {
  try {
    // Genera un nuevo ID único para el carrito
    const newCartId = generateUniqueId();

    // Crea un nuevo carrito
    const newCart = {
      id: newCartId,
      products: [],
    };

    // Agrega el nuevo carrito a la lista
    carts.push(newCart);

    res
      .status(201)
      .json({ message: "Carrito creado correctamente", cart: newCart });
  } catch (error) {
    console.error("Error al crear un nuevo carrito:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Ruta GET /api/carts/:cid
router.get("/:cid", (req, res) => {
  const cartId = req.params.cid;
  const cart = carts.find((c) => c.id == cartId);
  if (cart) {
    res.json({ message: `Carrito con ID ${cartId}`, cart });
  } else {
    res.status(404).json({ error: "Carrito no encontrado" });
  }
});

// Ruta POST /api/carts/:cid/product/:pid
router.post("/:cid/product/:pid", (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const quantity = req.body.quantity || 1;

  const cart = carts.find((c) => c.id == cartId);
  if (!cart) {
    return res.status(404).json({ error: "Carrito no encontrado" });
  }

  const existingProduct = cart.products.find((p) => p.product === productId);

  if (existingProduct) {
    // Si el producto ya existe en el carrito, incrementa la cantidad
    existingProduct.quantity += quantity;
  } else {
    // Si el producto no existe en el carrito, agrégalo
    cart.products.push({ product: productId, quantity });
  }

  res.json({ message: `Producto agregado al carrito con ID ${cartId}`, cart });
});

// Función para generar un ID único
function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

// Configura las rutas para carritos aquí si es necesario
export default router;
