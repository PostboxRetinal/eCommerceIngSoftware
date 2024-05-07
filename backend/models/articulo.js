const { Schema, model } = require("mongoose");

const articuloSchema = Schema({
  serial: {
    type: String,
    require: true,
    unique: true,
  },

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
    require: false,
  },

  stock: {
    type: Number,
    require: true,
    talla:{
      type: String,
      require: true,
      ref : "talla"
    }
  },

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
