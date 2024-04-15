const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const {
  crearUsuario,
  loginUsuario,
  revalidarToken,
} = require("../controllers/auth");

const { validarCampos } = require("../middlewares/validarCampos");
const { validarJWT } = require("../middlewares/validarToken");

router.post("/login", loginUsuario);

router.post(
  "/new",
  [
    check("username","username es obligatorio").not().isEmpty(),
    check("identificacion","Identificación es obligatorio").not().isEmpty(),
    check("correo","Formato de correo inválido y es obligatorio").not().isEmpty().isEmail(),
    check("password","La contraseña debe ser mínimo de 6 caractéres y es obligatoria").isLength({ min: 6 }),
    validarCampos,
  ],
  crearUsuario
);

router.get("/renew", validarJWT, revalidarToken);

module.exports = router;
