import { Router } from "express";
import { ProductController } from "../controllers/product.controller.mdb.js";
import { UserController } from "../controllers/user.controller.mdb.js";

const router = Router();

const controller = new ProductController();
const userController = new UserController();

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

router.get("/products", async (req, res) => {
  if (req.session.user) {
    const products = await controller.getProducts();
    res.render("products", {
      title: "Listado de Productos",
      products: products,
    });
  } else {
    res.redirect("/login");
  }
});

router.get("/users", async (req, res) => {
  if (req.session.user && req.session.admin === true) {
    const data = await userController.getUsersPaginated(
      req.query.page || 1,
      req.query.limit || 50
    );
    data.pages = [];
    for (let i = 1; i <= data.totalPages; i++) data.pages.push(i);

    res.render("users", {
      title: "Listado de Usuarios",
      data: data,
    });
  } else if (req.session.user) {
    res.redirect("/profile");
  } else {
    res.redirect("/login");
  }
});

router.get("/users/:page", async (req, res) => {
  const data = await userController.getUsersPaginated(0);
  data.pages = [];
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

router.get("/cookies", async (req, res) => {
  res.render("cookies", {});
});

router.get("/login", async (req, res) => {
  if (req.session.user) {
    res.redirect("/profile");
  } else {
    res.render("login", {});
  }
});

router.get("/profile", async (req, res) => {
  // Si el usuario tiene sesión activa, mostramos su perfil
  if (req.session.user) {
    res.render("profile", { user: req.session.user });
  } else {
    // sino volvemos al login
    res.redirect("/login");
  }
});

router.get("/register", async (req, res) => {
  res.render("register", {});
});
export default router;
