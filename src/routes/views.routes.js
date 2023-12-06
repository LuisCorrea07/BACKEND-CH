import { Router } from 'express'

 

const router = Router()

 

const users = [

    { firstName: 'Carlos', lastName: 'Perren', age: 48, email: 'cperren@gmail.com', phone: '+5493492222333', role: 'admin' },

    { firstName: 'Carolina', lastName: 'Ferrero', age: 42, email: 'cferrero@gmail.com', phone: '+5493492222334', role: 'user' },

    { firstName: 'Juan', lastName: 'Perez', age: 30, email: 'jperez@gmail.com', phone: '+5493492222335', role: 'user' }

]

 

router.get('/chat', (req, res) => {

    res.render('chat', {

        title: 'Coder Compras Chat'

    })

})

 

export default router