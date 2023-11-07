import {Router} from 'express'

const router = Router()

const users = []


//Router Middleware
router.use((req,res,next) => {
    console.log(Date.now())
    next()
})



router.get('/', (req,res) => {
    res.status(200).send({data: users})
})

router.post('/', (req,res) => {
    const newContent = req.body
    users.push(newContent)
    res.status(200).send({data: newContent})
})

export default router