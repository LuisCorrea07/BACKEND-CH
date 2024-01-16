import { Router } from "express";

const router = Router();

const users = [
  {
    firstName: "Carlos",
    lastName: "Perren",
    age: 48,
    email: "cperren@gmail.com",
    phone: "+5493492222333",
    role: "admin",
  },

  {
    firstName: "Carolina",
    lastName: "Ferrero",
    age: 42,
    email: "cferrero@gmail.com",
    phone: "+5493492222334",
    role: "user",
  },

  {
    firstName: "Juan",
    lastName: "Perez",
    age: 30,
    email: "jperez@gmail.com",
    phone: "+5493492222335",
    role: "user",
  },
];

router.get("/chat", (req, res) => {
  res.render("chat", {
    title: "Coder Compras Chat",
  });
});

router.get("/products", (req, res) => {
  res.render("products", {});
});

router.get("/users", async (req, res) => {
  const data = await userController.getUsersPaginated()
  data.pages = []
  for (let i = 1; i <= data.totalPages; i++) data.pages.push(i);  
  
  res.render("users", {
    title: "Listado de Usuarios",
    data: data,
  });
});

router.get("/users/:page", async (req, res) => {
  const data = await userController.getUsersPaginated(0)
  data.pages = []
  for (let i = 1; i <= data.totalPages; i++) data.pages.push(i);  
  
  res.render("users", {
    title: "Listado de Usuarios",
    data: data,
  });
});



router.get("/userspaginated", async (req, res) => {
  const data = await userController.getUsersPaginated();
  data.pages = [];
  for (let i = 1; i <= data.totalPages; i++) data.pages.push(i);
  res.render("users", {
    title: "Listado de Usuarios",
    data: data,
  });
});

export default router;
