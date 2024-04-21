const express = require("express");
const { asyncHandler } = require("../middlewares/asyncHandler");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");
const { generarToken } = require("../utils/jwt");

//Función asíncrona para crear un usuario
const crearUsuario = asyncHandler(async (req, res) => {
  const { identificacion, username, correo, password } = req.body;
  let idExistente = await Usuario.findOne({ identificacion });
  let correoExistente = await Usuario.findOne({ correo });
  let userExistente = await Usuario.findOne({ username });
  //Validar si el usuario ya existe
  if (idExistente || correoExistente || userExistente) {
    return res.status(409).json({
      msg: "ID, correo o usuario ya se encuentran en uso. Intenta con otro(s)",
    });
  }
  //Validar si los campos están vacíos
  if (!identificacion || !username || !correo || !password) {
    return res.status(400).json({
      msg: "Por favor, rellene todos los campos",
    });
  }
  //Crear un nuevo usuario
  let usuario = new Usuario(req.body);
  const salt = bcrypt.genSaltSync();
  usuario.password = bcrypt.hashSync(password, salt);
  //Guardar el usuario en la base de datos
  try {
    await usuario.save();
    generarToken(res, usuario._id);
    //Enviar respuesta al cliente
    res.status(201).json({
      ok: true,
      _id: usuario._id,
      username: usuario.username,
      correo: usuario.correo,
      isAdmin: usuario.isAdmin,
      isDisennador: usuario.isDisennador,
    });
    //Manejo de errores
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error en el servidor, por favor intente más tarde",
    });
  }
});
//Función asíncrona para loguear un usuario
const loginUsuario = asyncHandler(async (req, res) => {
  const { correo, password } = req.body;
  //Validar si los campos están vacíos
  try {
    let usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "El correo " + correo + " no se ha encontrado en la base de datos",
      });
    }
    //Validar si la contraseña es correcta
    const passwordValid = bcrypt.compareSync(password, usuario.password);
    if (!passwordValid) {
      return res.status(400).json({
        ok: false,
        msg: "Usuario o contraseña incorrectos",
      });
    }
    //Generar token
    generarToken(res, usuario._id);
    //Enviar respuesta al cliente
    res.status(200).json({
      ok: true,
      msg: "Bienvenido " + usuario.username + " Login correcto",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      error,
    });
  }
});

module.exports = {
  loginUsuario,
  crearUsuario
};
