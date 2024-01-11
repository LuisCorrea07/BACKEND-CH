import cartModel from '../models/cart.model.js'

export class CartController {
    constructor() {
    }

    async getCarts() {
        try {
            // path: elemento a completar
            return await cartModel.find().lean()
        } catch (err) {
            return err.message
        }
        
    }
}