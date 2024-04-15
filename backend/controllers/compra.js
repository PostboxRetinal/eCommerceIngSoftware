const Compra = require("../models/compra.js")
const articulo = require("../models/articulo.js")

// Utility Function
function calcPrecios(compraItems) {
  const articulosPrecio = compraItems.reduce(
    (acc, item) => acc + item.precio * item.cantidad, 0
    ) 
    return { calcPrecios, articulosPrecio};
  }

const createCompra = async (req, res) => {
  try {
    const { compraItems, direccionDomicilio, metodoPago } = req.body;

    if (compraItems && compraItems.length === 0) {
      res.status(400);
      throw new Error("No hay items en la compra");
    }

    const itemsFromDB = await articulo.find({
      _id: { $in: compraItems.map((x) => x._id) },
    });

    const dbCompraItems = compraItems.map((itemFromClient) => {
      const matchingCompraFromDB = itemsFromDB.find(
        (itemsFromDB) => itemsFromDB._id.toString() === itemFromClient._id
      );

      if (!matchingCompraFromDB) {
        res.status(404);
        throw new Error(`Producto no encontrado: ${itemFromClient._id}`);
      }

      return {
        ...itemFromClient,
        articulo: itemFromClient._id,
        precio: matchingCompraFromDB.precio,
        _id: undefined,
      };
    });

    const { precioArticulos, precioTotal } =
      calcPrecios(dbCompraItems);

    const compra = new Compra({
      compraItems: dbCompraItems,
      usuario: req.user._id,
      direccionDomicilio,
      metodoPago,
      precioArticulos,
      precioTotal,
    });

    const createCompra = await compras.save();
    res.status(201).json(createCompra);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllCompras = async (req, res) => {
  try {
    const compras = await compras.find({}).populate("user", "id username");
    res.json(compras);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserCompras = async (req, res) => {
  try {
    const compras = await compras.find({ usuario: req.usuario._id });
    res.json(compras);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const countTotalCompras = async (req, res) => {
  try {
    const totalCompras = await compras.countDocuments();
    res.json({ totalCompras });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const calculateTotalVentas = async (req, res) => {
  try {
    const compras = await compras.find();
    const totalVentas = compras.reduce((sum, compra) => sum + compra.totalPrice, 0);
    res.json({ totalVentas });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const calcualteTotalVentasByDate = async (req, res) => {
  try {
    const ventasByFecha = await compras.aggregate([
      {
        $match: {
          isPago: true,
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$paidAt" },
          },
          totalVentas: { $sum: "$precioTotal" },
        },
      },
    ]);

    res.json(ventasByFecha);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const findCompraById = async (req, res) => {
  try {
    const compra = await compras.findById(req.params.id).populate(
      "usuario",
      "correo"
    );

    if (compras) {
      res.json(compra);
    } else {
      res.status(404);
      throw new Error("Compra no encontrada");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const markCompraAsPaid = async (req, res) => {
  try {
    const compra = await compras.findById(req.params.id);

    if (compra) {
      compra.isPago = true;
      compra.paidAt = Date.now();
      compra.resultadoPago = {
        id: req.body.id,
        estado: req.body.estado,
        update_time: req.body.update_time,
        correo: req.body.payer.correo,
      };

      const updateCompra = await compras.save();
      res.status(200).json(updateCompra);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const markCompraAsDelivered = async (req, res) => {
  try {
    const compra = await compras.findById(req.params.id);

    if (compra) {
      compra.isDelivered = true;
      compra.deliveredAt = Date.now();

      const updatedCompra = await compras.save();
      res.json(updatedCompra);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCompra,
  getAllCompras,
  getUserCompras,
  countTotalCompras,
  calculateTotalVentas,
  calcualteTotalVentasByDate,
  findCompraById,
  markCompraAsPaid,
  markCompraAsDelivered,
};