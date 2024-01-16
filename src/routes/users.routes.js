import { Router } from "express";
import { UserController } from "../controllers/user.controller.mdb.js";

const router = Router();
const controller = new UserController();

router.get("/", async (req, res) => {
  try {
    const users = await controller.getUsers();
    res.status(200).send({ status: "Todo Ok", data: users });
  } catch (err) {
    res.status(500).send({ status: "ERR", data: err.message });
  }
});

router.get("/paginated", async (req, res) => {
  try {
    const users = await controller.getUsersPaginated();
    res.status(200).send({ status: "OK", data: users });
  } catch (error) {
    res.status(500).send({ status: "ERR", data: error.message });
  }
});

export default router;
