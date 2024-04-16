const { Schema, model } = require("mongoose");

const usuarioSchema = Schema(
  {
    identificacion: {
      type: String,
      unique: true,
      required: true,
    },

    username: {
      type: String,
      unique: true,
      required: true,
    },

    correo: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },

    isDisennador: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = model("usuario", usuarioSchema);
