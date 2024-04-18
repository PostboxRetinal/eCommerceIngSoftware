const { Schema, model } = require("mongoose");

const comentarioSchema = Schema({
  identificador: {
    type: String,
    require: true,
    unique: true,
  },

  titulo: {
    type: String,
    require: true,
  },
  
  calificacion: {
    type: Number,
    require: true,
  },

  contenido: {
    type: String,
  },
});

module.exports = model("comentario", comentarioSchema);
