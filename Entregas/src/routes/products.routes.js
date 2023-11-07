import {Router} from 'express'

const router = Router()

const products = []

//Router Middleware
router.use((req,res,next) => {
    console.log(Date.now())
    next()
})

router.get('/', (req,res) => {
    res.status(200).send({data: products})
})

router.get('/api/products/:pid', (req,res) => {
    res.status(200).send({data: products})
})



router.post('/', (req,res) => {
    const newContent = req.body
    products.push(newContent)
    res.status(200).send({data: newContent})
})

export default router