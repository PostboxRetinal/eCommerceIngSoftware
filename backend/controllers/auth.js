const express = require("express");
const { asyncHandler } = require("../middlewares/asyncHandler");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");
const { generarToken } = require("../utils/jwt");

//Función asíncrona para crear un usuario
const crearUsuario = asyncHandler(async (req, res = express.request) => {
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
const loginUsuario = asyncHandler(async (req, res = express.request) => {
  const { correo, password } = req.body;

  //Validar si los campos están vacíos
  try {

    //Validar si el usuario existe
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

    //Validar si el usuario es administrador
    let esAdministrador = await Usuario.findOne({ correo: correo, isAdmin: true });
    console.log('Objeto esAdministrador: '+esAdministrador);
    if (!esAdministrador) {
      return res.status(200).json({
      msg: "Bienvenido " + usuario.username + " Login correcto",
      isAdmin: false,
      });
    } else {
      return res.status(200).json({
      msg: "Bienvenido ADMINISTRADOR " + usuario.username + " Login correcto",
      isAdmin: true,
      });
    }

    //Manejo de errores
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      error,
    });
  }
});

const borrarUsuario = asyncHandler(async (req, res = express.request) => {
  const { correo, password } = req.body;

  //Validar si los campos están vacíos
  if (!correo || !password) {
    return res.status(400).json({
      ok: false,
      msg: "Por favor, rellene todos los campos",
    });
  }

  //Validar si el usuario existe
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

  //Borrar el usuario
  try {
    await Usuario.deleteOne({ correo: usuario.correo });
    res.status(200).json({
      ok: true,
      msg: "Usuario eliminado correctamente"
    });

  //Manejo de errores
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error en la petición, por favor intente más tarde",
    });
  }
});

const getUserInfo = asyncHandler(async (req, res) => {
  try {
    // El ID del usuario se extrae del token de autenticación
    const userId = req.user.id;

    // Buscar el usuario por su ID
    const usuario = await Usuario.findById(userId);

    if (!usuario) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    // Devolver la información del usuario al frontend
    res.status(200).json({
      ok: true,
      username: usuario.username,
      correo: usuario.correo,
      isAdmin: usuario.isAdmin,
      isDisennador: usuario.isDisennador,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
});

const logoutUsuario = asyncHandler(async (req, res) => {
  try {
    // Si estás utilizando tokens JWT, podrías invalidar el token almacenado en el cliente
    // En este ejemplo, simplemente respondemos con un mensaje indicando que la sesión se ha cerrado correctamente

    // Elimina el token almacenado en el cliente (localStorage, sessionStorage, etc.)
    // Esto invalidará el token y cerrará la sesión del usuario
    localStorage.removeItem("token"); // Suponiendo que estás utilizando localStorage para almacenar el token

    res.status(200).json({ message: "Sesión cerrada exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error al cerrar sesión, por favor intente más tarde",
    });
  }
});
module.exports = {
  loginUsuario,
  crearUsuario,
  borrarUsuario,
  getUserInfo,
  logoutUsuario
};
