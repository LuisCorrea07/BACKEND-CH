import { Router } from 'express';
import { uploader } from '../uploader.js';
import { ProductController } from '../controllers/product.controller.mdb.js';
import { MongoClient } from 'mongodb';

const router = Router();
const controller = new ProductController();

// Conexion a la BD
const uri = process.env.MONGODB_URI || 'mongodb+srv://administrador:Admin1234@cluster0.wttbr2c.mongodb.net/ecommerce';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
await client.connect();
const db = client.db();
const productsCollection = db.collection('products');

router.get('/products', async (req, res) => {
  try {
    const products = await productsCollection.find({});

    if (products.length === 0) {
      console.log('No hay artículos en la base de datos');
      res.status(204).send({ status: 'NO_CONTENT', message: 'No se encontraron productos' });
    } else {
      res.status(200).send({ status: 'OK', data: products });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ status: 'ERR', data: err.message });
  }
});



















router.get('/:pid', async (req, res) => {
  try {
    const product = await controller.getProductById(req.params.id);
    if (!product) return res.status(404).send({ status: 'ERR', data: 'Product not found' });
    res.status(200).send({ status: 'OK', data: product });
  } catch (err) {
    res.status(500).send({ status: 'ERR', data: err.message });
  }
});

router.put('/:pid', async (req, res) => {
  try {
    const { title, description, price, code, stock } = req.body;
    if (!title || !description || !price || !code || !stock) {
      return res.status(400).send({ status: 'ERR', data: 'Missing required fields' });
    }
    await controller.updateProduct(req.params.id, {
      title,
      description,
      price,
      code,
      stock,
    });
    res.status(200).send({ status: 'OK', data: 'Product updated' });
  } catch (err) {
    res.status(500).send({ status: 'ERR', data: err.message });
  }
});

router.delete('/:pid', async (req, res) => {
  try {
    await controller.deleteProduct(req.params.id);
    res.status(200).send({ status: 'OK', data: 'Product Eliminado' });
  } catch (err) {
    res.status(500).send({ status: 'ERR', data: err.message });
  }
});

router.post('/', uploader.single('thumbnail'), async (req, res) => {
    try {
      if (!req.file) return res.status(400).send({ status: 'FIL', data: 'No se pudo subir el archivo' });
  
      const { title, description, price, code, stock } = req.body;
      if (!title || !description || !price || !code || !stock) {
        return res.status(400).send({ status: 'ERR', data: 'Faltan campos obligatorios' });
      }
  
      const newContent = {
        title,
        description,
        price,
        // el obj req.file está disponible porque estamos utilizando Multer como middleware,
        // mediante el objeto uploader que estamos importando e inyectando.
        thumbnail: req.file.filename,
        code,
        stock
      };
  
      const result = await controller.addProduct(newContent)
  
      // Si deseamos emitir algún evento de socket.io, primero necesitamos
      // obtener el objeto que seteamos en app.js y luego hacer un emit()
      const socketServer = req.app.get('socketServer')
  
      res.status(200).send({ status: 'OK', data: result })
    } catch (err) {
      res.status(500).send({ status: 'ERR', data: err. Message })
    }
  })



export default router;




/*

import { Router } from 'express'
import { uploader } from '../uploader.js'
import { ProductController } from '../controllers/product.controller.mdb.js'

const router = Router()
const controller = new ProductController()

// http://localhost:3000/api/products?limit=50&page=2&sort=asc
router.get('/', async (req, res) => {
    try {
        const products = await controller.getProducts()
        res.status(200).send({ status: 'OK', data: products })
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message })
    }
})

router.post('/', uploader.single('thumbnail'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).send({ status: 'FIL', data: 'No se pudo subir el archivo' })

        const { title, description, price, code, stock } = req.body
        if (!title || !description || !price || !code || !stock) {
            return res.status(400).send({ status: 'ERR', data: 'Faltan campos obligatorios' })
        }

        const newContent = {
            title,
            description,
            price,
            // el obj req.file está disponible porque estamos utilizando Multer como middleware,
            // mediante el objeto uploader que estamos importando e inyectando.
            thumbnail: req.file.filename,
            code,
            stock
        }

        const result = await controller.addProduct(newContent)

        // Si deseamos emitir algún evento de socket.io, primero necesitamos
        // obtener el objeto que seteamos en app.js y luego hacer un emit()
        const socketServer = req.app.get('socketServer')

        res.status(200).send({ status: 'OK', data: result })
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message })
    }
})

/**
 * Agregar aquí el resto de endpoints para completar el CRUD, realizando las llamadas
 * a los métodos correspondientes del controlador
 *
 * Recordar que tanto para PUT como para DELETE, se deberá pasar por req.params
 * el id correspondiente al documento que se desea operar.
*/

//export default router