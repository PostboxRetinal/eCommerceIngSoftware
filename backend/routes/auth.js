const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { crearUsuario, loginUsuario, borrarUsuario , getUserInfo, logoutUsuario} = require("../controllers/auth");

const { validarCampos } = require("../middlewares/validarCampos");
const  authMiddleware  = require("../middlewares/authMiddleware")

router.post("/login", 
[ 
check('correo',' el correo es obligatorio').isEmail(),
check('password',).isLength({min:6}),
validarCampos,
], 
loginUsuario);
router.delete("/delete", borrarUsuario);

router.get("/userinfo", authMiddleware, getUserInfo); 

router.post(
  "/new",
  [
    check("username", "username es obligatorio").not().isEmpty(),
    check("identificacion", "Identificación es obligatorio").not().isEmpty(),
    check("correo", "Formato de correo inválido u obligatorio")
      .not()
      .isEmpty()
      .isEmail(),
    check(
      "password",
      "La contraseña es obligatoria y debe ser mínimo de 6 caractéres"
    ).isLength({ min: 6 }),
    validarCampos,
  ],
  crearUsuario
);

router.post("/logout", logoutUsuario);

module.exports = router;
