const { Schema, model } = require("mongoose");

const articuloSchema = Schema({
  

  nombre: {
    type: String,
    require: true,
  },

  precioUnitario: {
    type: Number,
    require: true,
  },

  categoria: {
    type: Schema.Types.ObjectId,
    ref: "categoria",
    require: true,
  },

  stock: {
    type: {
      tallas: {
        type: Map,
        of: Number
      },total: {
        type: Number,
        required: true
      }
    }},

  comentario: {
    type: String,
    ref: "comentario",
  },

  imagen: {
    type: String,
    ref: "imagen",
    require: false,
  },
  isPersonalizable: {
    type: Boolean,
    require: true,
  },
});

module.exports = model("Articulo", articuloSchema);
