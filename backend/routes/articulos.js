const express = require("express");
const router = express.Router();
const formidable = require("formidable");

const {
  añadirArticulo,
  actualizarArticulo,
  eliminarArticulo,
  buscarArticulos,
  buscarArticuloPorId,
  buscarTodosLosArticulos,
} = require("../controllers/articulos.js");

const validarId = require("../middlewares/validarId.js");

router.route("/").get(buscarArticulos).post(añadirArticulo);

router.route("/todosLosArticulos").get(buscarTodosLosArticulos);

router
  .route("/:id")
  .put(actualizarArticulo)
  .delete(eliminarArticulo)
  .get(buscarArticuloPorId);

module.exports = router;
