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
    
  const { username, email, password, confirmPassword, firstName, lastName, age } = req.body;

  // Validar los datos del formulario

  if (username.length < 6) {
    return res.status(400).send({
      status: "ERR",
      data: "El nombre de usuario debe tener al menos 6 caracteres",
    });
  }

  if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)) {
    return res.status(400).send({
      status: "ERR",
      data: "El correo electrónico no es válido",
    });
  }

  if (password.length < 8) {
    return res.status(400).send({
      status: "ERR",
      data: "La contraseña debe tener al menos 8 caracteres",
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).send({
      status: "ERR",
      data: "Las contraseñas no coinciden",
    });
  }

  // Crear un nuevo usuario en la base de datos

  const user = new User({
    username,
    email,
    password,
    firstName,
    lastName,
    age,
  });

  await user.save();

  // Iniciar sesión al usuario

  req.session.user = user;

  // Devolver una respuesta exitosa

  return res.status(200).send({
    status: "OK",
    data: "Registro exitoso",
  });
});









export default router;
