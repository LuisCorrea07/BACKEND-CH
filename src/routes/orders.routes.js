import { Router } from "express";
import { OrderController } from "../controllers/order.controller.mdb.js";



const router = Router();
const controller = new OrderController();

router.get("/", async (req, res) => {
  try {
    res.status(200).send({ status: "Ok", data: await controller.getOrders() });
  } catch (err) {
    res.status(500).send({ status: "ERR", data: err.message });
  }
});

router.get("/:category", async (req, res) => {
    try {
      res.status(200).send({ status: "Ok", data: await controller.getOrders(req.params.category) });
    } catch (err) {
      res.status(500).send({ status: "ERR", data: err.message });
    }
  });

export default router;