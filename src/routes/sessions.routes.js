import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  try {
    if (req.session.counter) {
      req.session.counter++;
      res.send(`Se ha visitado el sitio ${req.session.counter} veces`);
    } else {
      //si no hay una sesion para el usuario, inicializar en 1
      req.session.counter = 1;
      res.status(200).send({ status: "OK", data: "Bienvenido al sitio!" });
    }
  } catch (error) {
    res.status(500).send({ status: "ERR", data: error.message });
  }
});

router.get("/logout", async (req, res) => {
  try {
    req.session.destroy((error) => {
      if (error) {
        res.status(500).send({ status: "ERR", data: error.message });
      } else {
        res.status(200).send({ status: "Ok", data: "Sesion finalizada" });
      }
    });
  } catch (error) {
    res.status(500).send({ status: "ERR", data: error.message });
  }
});

router.get("/status", async (req, res) => {
  try {
    if (req.session.user) {
      res.status(200).send({ status: "Ok", data: req.session.user });
    } else {
      res.status(200).send({ status: "Ok", data: "No hay datos de usuario" });
    }
  } catch (error) {
    res.status(500).send({ status: "ERR", data: error.message });
  }
});

const auth = (req, res, next) => {
  try {
    if (req.session.user) {
      if (req.session.user.admin === true) {
        next();
      } else {
        res
          .status(403)
          .send({ status: "ERR", data: "El usuario no es un ADMIN" });
      }
    } else {
      res.status(401).send({ status: "ERR", data: "Usuario no autorizado" });
    }
  } catch (error) {
    res.status(500).send({ status: "ERR", data: error.message });
  }
};

router.get("/admin", auth, async (req, res) => {
  try {
    res.status(200).send({ status: "OK", data: "Estos datos son privados" });
  } catch (error) {
    res.status(500).send({ status: "ERR", data: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { user, pass } = req.body;

    if (user === "cperren" && pass === "abc123") {
      req.session.user = { username: user, admin: true };
      res.status(200).send({ status: "OK", data: "Sesión iniciada" });
    } else {
      res.status(401).send({ status: "ERR", data: "Datos no válidos" });
    }
  } catch (err) {
    res.status(500).send({ status: "ERR", data: err.message });
  }
});

router.post("/register", async (req, res) => {
    
  // Obtener los datos del formulario
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const age = req.body.age;
  const password = req.body.password;

  // Validar los datos
  if (!firstName.trim()) {
    return res.status(422).send({ error: "El nombre es obligatorio." });
  }

  if (!lastName.trim()) {
    return res.status(422).send({ error: "El apellido es obligatorio." });
  }

  if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
    return res.status(422).send({ error: "La dirección de correo electrónico no es válida." });
  }

  if (!Number.isInteger(age)) {
    return res.status(422).send({ error: "La edad debe ser un número entero." });
  }

  if (password.length < 8) {
    return res.status(422).send({ error: "La contraseña debe tener al menos 8 caracteres." });
  }

  // Los datos son válidos
  return true;
});








export default router;
