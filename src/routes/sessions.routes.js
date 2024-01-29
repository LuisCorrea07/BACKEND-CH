import { Router } from "express";
import passport from 'passport'
import userModel from "../models/users.model.js";
import { createHash, isValidPassword } from "../utils.js";
import initPassport from '../config/passport.config.js'



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
        //res.status(200).send({ status: "Ok", data: "Sesion finalizada" });
        res.redirect("/login");
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


router.get("/hash/:pass", async (req,res) => {
  res.status(200).send({status: "OK", data: createHash(req.params.pass)})
})

router.get('/failregister', async (req, res) => {
  res.status(400).send({ status: 'ERR', data: 'El email ya existe o faltan datos obligatorios' })
})

router.get('/failrestore', async (req, res) => {
  res.status(400).send({ status: 'ERR', data: 'El email no existe o faltan datos obligatorios' })
})

router.get('/github', passport.authenticate('githubAuth', { scope: ['user:email'] }), async (req, res) => {
})

router.get('/githubcallback', passport.authenticate('githubAuth', { failureRedirect: '/login' }), async (req, res) => {
    req.session.user = { username: req.user.email, admin: true }
    // req.session.user = req.user
    res.redirect('/profile')
})

router.post("/login", async (req, res) => {
  try {
    const { email, pass } = req.body;
    const userInDb = await userModel.findOne({ email: email });
    if (userInDb !== null && isValidPassword(userInDb, pass)) {
      req.session.user = { username: email, admin: true };
      //res.status(200).send({ status: "OK", data: "Sesión iniciada" });
      res.redirect("/profile");

      // Utilizando tokens JWT
      //const access_token = generateToken({ username: email, admin: true }, '1h')
      // res.status(200).send({ status: 'OK', data: access_token })
      //res.redirect(`/profilejwt?access_token=${access_token}`)
    } else {
      res.status(401).send({ status: "ERR", data: "Datos no válidos" });
    }
  } catch (err) {
    res.status(500).send({ status: "ERR", data: err.message });
    console.log(isValidPassword)
  }
});

router.post('/register', passport.authenticate('registerAuth', { failureRedirect: '/api/sessions/failregister' }), async (req, res) => {
  try {
      res.status(200).send({ status: 'OK', data: 'Usuario registrado' })
  } catch (err) {
      res.status(500).send({ status: 'ERR', data: err.message })
  }
})


router.post('/restore', passport.authenticate('restoreAuth', { failureRedirect: '/api/sessions/failrestore' }), async (req, res) => {
  try {
      res.status(200).send({ status: 'OK', data: 'Clave actualizada' })
  } catch (err) {
      res.status(500).send({ status: 'ERR', data: err.message })
  }
})

export default router;
