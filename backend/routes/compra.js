const express = require("express");
const router = express.Router();

const { obtenerCompras, agregarCompra, eliminarCompra, actualizarCompra} = require("../controllers/compra.js");

router
  .route("/")
  .get(obtenerCompras)
  .post(agregarCompra)
  
  router.route("/:id").delete(eliminarCompra)
  router.route("/:id").put(actualizarCompra)

module.exports = router;
