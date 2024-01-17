import { Router } from "express";

const router = Router();

router.get("/getcookies", async (req, res) => {
  try {
    //res.send(req.cookies)
    //res.status(200).send({ status: "OK", data: req.cookies }); //cookie no firmada
    res.status(200).send({ status: "OK", data: req.signedCookies }); // cookie firmada
  } catch (error) {
    res.status(500).send({ status: "ERR", data: error.message });
  }
});

router.get("/setcookie", async (req, res) => {
  try {
    //res.cookie(nombre, payload(contenido), opciones)
    //maxAge: ms (milisegundos)
    //Indico al navegador que almacene una cookie
    res.cookie("CoderCookie", "Este es el contenido de la cookie firmado", { maxAge: 30000, signed: true });
    res.status(200).send({ status: "OK", data: "Cookie generada" });
  } catch (error) {
    res.status(500).send({ status: "ERR", data: error.message });
  }
});

router.get("/deletecookie", async (req, res) => {
  try {
    res.clearCookie("coderCookie");
    res.status(200).send({ status: "OK", data: "Cookie eliminada" });
  } catch (error) {
    res.status(500).send({ status: "ERR", data: error.message });
  }
});

router.post("/", async(req, res)=>{
  try {
    res.cookie("coderCookie", {user: req.body.user, email:req.body.email}, {maxAge: 30000, signed: true})
    res.status(200).send({status: "OK", data:"Cookie generada"})
  } catch (error) {
    res.status(500).send({status: "ERR", data: error.message})
  }
})


export default router;
