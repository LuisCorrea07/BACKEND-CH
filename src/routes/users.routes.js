import { Router } from "express";
import userModel from "../models/users.model.js";

const router = Router();

router.get("/", async (req, res) => {
  const users = await userModel.find();
  res.status(200).send({ status: "Todo Ok", data: users });
});

router.post("/", async (req, res) => {
  try {
    const userData = req.body;

    if (!userData.firstName || !userData.lastName || !userData.userName) {
      res.status(400).json({ error: "Debe completar todos los campos" });
      return;
    }

    // Create a new user with data from req.body
    const newUser = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      userName: userData.userName,
      age: userData.age || null,
      active: userData.active || true,
    };

    // Insert the new user into the database
    const result = await userModel.insertOne(newUser);

    res.json({ message: "Usuario creado con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creando usuario" });
  }
});

router.put("/:uid", async (req, res) => {
  const result = await userModel.updateOne({ _id: uid }, req.body);
  res.status(200).send({ status: "Todo Ok", data: users });
});

router.delete("/:uid", async (req, res) => {
  const deleteUser = await userModel.deleteOne({ _id: uid });
  res.status(200).send({ status: "Todo Ok", data: users });
});

export default router;
