const compra = require("../models/compra.js")
const {asyncHandler} = require("../middlewares/asyncHandler.js");
const usuario = require("../models/usuario.js");

const obtenerCompras = asyncHandler(async (req, res) => {
  const Compra = await compras.find({}).populate('usuario').populate('compraItems.articulo');
  if (compras.length === 0) {
    // No hay documentos, enviar una respuesta indicándolo
    res.status(404).json({ mensaje: 'No se encontraron compras.' });
  } else {
    // Envía los datos de las compras como respuesta JSON
    res.json(compras);
  }
});

const agregarCompra = asyncHandler(async (req, res) => {
  try {
    // Verificar si el ID del usuario existe
    const usuarioExiste = await usuario.findById(req.body.usuario);
    if (!usuarioExiste) {
      return res.status(404).json({ mensaje: 'El ID del usuario no existe.' });
    }

    // Crear una nueva compra con los datos enviados en el cuerpo de la solicitud (req.body)
    const nuevaCompra = new compra(req.body);

    // Validar y guardar la nueva compra en la base de datos
    await nuevaCompra.validate();
    await nuevaCompra.save();

    // Enviar una respuesta indicando que la compra fue creada exitosamente
    res.status(201).json({
      mensaje: 'Compra agregada exitosamente',
      newCompra: nuevaCompra
    });
  } catch (error) {
    // Si hay un error de validación o de otro tipo, enviar un mensaje de error
    res.status(400).json({ mensaje: 'Error al agregar la compra', detalles: error.message });
  }
});

const eliminarCompra = asyncHandler(async (req, res) => {
  try {
    const compraId = req.params.id; // El ID se pasa como parámetro de URL
    const Compra = await compra.findByIdAndDelete(compraId);

    if (!Compra) {
      return res.status(404).json({ mensaje: 'Compra no encontrada.' });
    }

    res.json({ mensaje: 'Compra eliminada exitosamente.' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar la compra', error: error.message });
  }
});

const actualizarCompra = asyncHandler(async (req, res) => {
  try {
    const compraId = req.params.id; // El ID se pasa como parámetro de URL
    const compraActualizada = await compra.findByIdAndUpdate(compraId, req.body, { new: true, runValidators: true });

    if (!compraActualizada) {
      return res.status(404).json({ mensaje: 'Compra no encontrada.' });
    }

    res.json({ mensaje: 'Compra actualizada exitosamente.', CompraUpd: compraActualizada });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar la compra', error: error.message });
  }
});





module.exports = {
  obtenerCompras,
  agregarCompra,
  eliminarCompra,
  actualizarCompra
};