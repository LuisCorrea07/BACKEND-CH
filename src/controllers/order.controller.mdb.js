import orderModel from "../models/orders.model.js";

export class OrderController {
  constructor() {}

  async getOrders(category) {
    try {
      /* return await orderModel.find().lean(); */
      const process = await orderModel.aggregate([
        { $match: { category: category } },
        { $group: { _id: "$name", totalPrice: { $sum: "$price" } } },
        { $sort: { totalPrice: 1 } },
        { $group: { _id: 1, orders: { $push: "$$ROOT" } } },
        { $project: { _id: 0, orders: "$orders" } }
        //{ $merge: { into: "reports" } },
      ]);
      return "Reporte generado exitosamente";
    } catch (err) {
      return err.message;
    }
  }
}
