const express = require("express");
const router = express.Router();

const {
    createCompra,
    getAllCompras,
    getUserCompras,
    countTotalCompras,
    calculateTotalVentas,
    calcualteTotalVentasByDate,
    findCompraById,
    markCompraAsPaid,
    markCompraAsDelivered,
} = require("../controllers/compra.js");

router
  .route("/")
  .post(createCompra)
  .get(getAllCompras);

router.route("/mine").get(getUserCompras);
router.route("/total-compras").get(countTotalCompras);
router.route("/total-sales").get(calculateTotalVentas);
router.route("/total-sales-by-date").get(calcualteTotalVentasByDate);
router.route("/:id").get(findCompraById);
router.route("/:id/pay").put(markCompraAsPaid);
router
  .route("/:id/deliver")
  .put(markCompraAsDelivered);

module.exports = router;