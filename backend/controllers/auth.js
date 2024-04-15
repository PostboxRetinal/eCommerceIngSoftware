const express = require("express");
const { asyncHandler } = require("../middlewares/asyncHandler");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");
const { generarToken } = require("../utils/jwt");

const crearUsuario = asyncHandler(async (req, res) => {
  const { identificacion, username, correo, password } = req.body;
  let idExistente = await Usuario.findOne({ identificacion });
  let correoExistente = await Usuario.findOne({ correo });
  let userExistente = await Usuario.findOne({ username });

  if (idExistente || correoExistente || userExistente) {
    return res.status(409).json({
      msg: "ID, correo o usuario ya se encuentran en uso. Intenta con otro(s)",
    });
  }
  if (!identificacion || !username || !correo || !password) {
    return res.status(400).json({
      msg: "Por favor, rellene todos los campos",
    });
  }

  let usuario = new Usuario(req.body);
  const salt = bcrypt.genSaltSync();
  usuario.password = bcrypt.hashSync(password, salt);

  try {
    await usuario.save();
    generarToken(res, usuario._id);

    res.status(201).json({
      ok: true,
      _id: usuario._id,
      username: usuario.username,
      correo: usuario.correo,
      isAdmin: usuario.isAdmin,
      isDisennador: usuario.isDisennador,
    });
  } catch (error) {
    console.error(error)
    res.status(500).json({
      ok: false,
      msg: "Error en el servidor, por favor intente más tarde",
      
    });
  }
});

const loginUsuario = async (req, res = express.request) => {
  const { correo, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ correo: correo });
    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "El correo" + correo + " no se ha encontrado en la base de datos",
      });
    }

    const passwordValid = bcrypt.compareSync(password, usuario.password);
    if (!passwordValid) {
      return res.status(400).json({
        ok: false,
        msg: "Usuario o contraseña incorrectos",
      });
    }

    const token = await generarToken(usuario.identificacion, usuario.username);

    res.status(200).json({
      ok: true,
      token,
      msg: "Bienvenido " + usuario.username + " Login correcto",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      error,
    });
  }
};

const revalidarToken = async (req, res = express.request) => {
  const { uid, name } = req;
  const token = await generarToken(uid, name);

  res.json({
    ok: true,
    token,
  });
};

module.exports = {
  loginUsuario,
  crearUsuario,
  revalidarToken,
};
