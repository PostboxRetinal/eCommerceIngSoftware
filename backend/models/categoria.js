const { Schema, model } = require("mongoose");

const categoriaSchema = Schema({
  

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
