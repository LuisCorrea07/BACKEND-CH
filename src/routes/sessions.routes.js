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
    if(req.session.user){
      res.status(200).send({status: "Ok", data: req.session.user})
    }else{
      res.status(200).send({status: "Ok", data: "No hay datos de usuario"})
    }
  } catch (error) {
    res.status(500).send({status: "ERR", data: error.message})
  }
})


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

export default router;
