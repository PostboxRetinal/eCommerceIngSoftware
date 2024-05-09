const express = require("express");
const router = express.Router();

const { crearCategoria, actualizarCategoria, eliminarCategoria, listarCategorias, buscarCategoria } = require("../controllers/categoria");


router.route("/crearcat").post(crearCategoria);
router.route('/:IdCategoria').put(actualizarCategoria);
router.route('/:IdCategoria').delete(eliminarCategoria);
router.route('/categorias').get(listarCategorias);
router.route('/:id').get(buscarCategoria);

module.exports = router;