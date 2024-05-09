const { Schema, model } = require("mongoose");

const categoriaSchema = Schema({
  identificador: {
    type: String,
    require: true,
    unique: true,
  },

  nombre: {
    type: String,
    require: true,
    unique: true,
  },

  subCategoria: {
    type: String,
  },
});

const Categoria = model("categoria", categoriaSchema);
module.exports = Categoria;
