import { Router } from "express";
import { uploader } from '../uploader.js'
import { ProductController } from "../controllers/product.controller.fs.js";


const router = Router();
const controller = new ProductController();

router.get("/", async (req, res) => {
  const products = await controller.getProducts();
  res.status(200).send({ status: "OK", data: products });
});

/* router.post('/', async (req, res)=>{
    const products = await controller.getProducts();
    res.status(200).send({status: "OK", data: products});
}) */

router.post('/', uploader.single('thumbnail'), async (req, res)=>{
    if(!req.file) return res.status(400).send({status: 'FIL', data:'No se pudo subir el archivo'})
    const {title, description, price, category, stock} = req.body
    if(!title || !description || !price || !category || !stock){
        return res.status(400).send({status: 'ERR', data:'Faltan completar todos los campos'})
    }

    const newContent = {
        title,
        description,
        price,
        thumbnail: req.file.filename,
        category,
        stock
    }
    const result = await controller.addProduct(newContent)
    res.status(200).send({status: 'OK', data: result})
})
export default router;
