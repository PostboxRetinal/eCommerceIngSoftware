const compra = require("../models/compra.js")
const {asyncHandler} = require("../middlewares/asyncHandler.js");
const usuario = require("../models/usuario.js");
const Articulo = require ("../models/articulo.js")
const mongoose = require("mongoose")

// //Funciones secundarias
// async function obtenerUltimoConsecutivo() {
//   // Obtener la última compra y devolver su consecutivo
//   const ultimaCompra = await compra.findOne().sort({ consecutivo: -1 });
//   return ultimaCompra ? ultimaCompra.consecutivo : 0;
// }



//Funciones principales
const obtenerCompras = asyncHandler(async (req, res) => {
  const Compra = await compra.find({}).populate('usuario').populate('compraItems.articulo');
  if (compra.length === 0) {
    // No hay documentos, enviar una respuesta indicándolo
    res.status(404).json({ mensaje: 'No se encontraron compras.' });
  } else {
    // Envía los datos de las compras como respuesta JSON
    res.json(Compra);
  }
});

const agregarCompra = asyncHandler(async (req, res) => {
  const session = await mongoose.startSession(); // Iniciar una sesión de transacción
  session.startTransaction(); // Iniciar la transacción
  try {
    // Verificar si el ID del usuario existe
    const usuarioExiste = await usuario.findById(req.body.usuario);
    if (!usuarioExiste) {
      await session.abortTransaction(); // Abortar la transacción si el usuario no existe
      session.endSession();
      return res.status(404).json({ mensaje: 'El ID del usuario no existe.' });
    }

    // Validar el stock de cada artículo en la compra
    for (const item of req.body.compraItems) {
      const articulo = await Articulo.findById(item.articulo);
      if (!articulo) {
        await session.abortTransaction(); // Abortar la transacción si el usuario no existe
        session.endSession();
        return res.status(404).json({ mensaje: `Artículo con ID ${item.articulo} no encontrado.` });
      }
      if (articulo.stock < item.cantidad) {
        await session.abortTransaction(); // Abortar la transacción si el usuario no existe
        session.endSession();
        return res.status(400).json({ mensaje: `No hay suficiente stock para el artículo: ${articulo.nombre}.` });
      }
    }

    // Si el stock es suficiente, crear una nueva compra
    const nuevaCompra = new compra(req.body);

    // Restar el stock de los artículos comprados
    for (const item of req.body.compraItems) {
      await Articulo.updateOne(
        { _id: item.articulo },
        { $inc: { stock: -item.cantidad } },
        { session }
      );
    }

    // Validar y guardar la nueva compra en la base de datos
    await nuevaCompra.validate();
    await nuevaCompra.save({session});

    await session.commitTransaction();
    session.endSession();

    // Enviar una respuesta indicando que la compra fue creada exitosamente
    res.status(201).json({
      mensaje: 'Compra agregada exitosamente',
      newCompra: nuevaCompra
    });
  } catch (error) {
    await session.abortTransaction(); // Abortar la transacción en caso de error
    session.endSession();
    // Si hay un error de validación o de otro tipo, enviar un mensaje de error
    res.status(400).json({ mensaje: 'Error al agregar la compra', detalles: error.message });
  }
});


const eliminarCompra = asyncHandler(async (req, res) => {
  try {
    const { consecutivo } = req.body; // El ID se pasa como parámetro de URL
    const Compra = await compra.findOneAndDelete({'compraItems.consecutivo':consecutivo});


    if (!Compra) {
      return res.status(404).json({ mensaje: 'Compra no encontrada.' });
    }

    res.json({ mensaje: 'Compra eliminada exitosamente.' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar la compra', error: error.message });
  }
});

const actualizarCompra = async (req, res) => {
  const compraId = req.body._id; // Asume que el ID de la compra viene en el cuerpo de la solicitud

  try {
    const compraActualizada = await compra.findByIdAndUpdate(
      compraId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!compraActualizada) {
      return res.status(404).json({ mensaje: 'Compra no encontrada.' });
    }

    res.json({ mensaje: 'Compra actualizada exitosamente.', compraActualizada });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar la compra', error: error.message });
  }
};

const buscarCompraPorConsecutivo = asyncHandler(async (req, res) => {
  const { consecutivo } = req.body; // Asume que el consecutivo viene en el cuerpo de la solicitud

  try {
    const Compra = await compra.findOne({ 'compraItems.consecutivo': consecutivo });

    if (!Compra) {
      return res.status(404).json({ mensaje: 'Compra no encontrada.' });
    }

    res.json(Compra);

  } catch (error) {
    res.status(500).json({ mensaje: 'Error al buscar/actualizar la compra', error: error.message });
  }
});

module.exports = {
  obtenerCompras,
  agregarCompra,
  eliminarCompra,
  actualizarCompra,
  buscarCompraPorConsecutivo
};