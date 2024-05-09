const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Obtener el token de autorización del encabezado de la solicitud
  const token = req.header("Authorization");

  // Verificar si no hay token
  if (!token) {
    return res.status(401).json({ msg: "No hay token, autorización denegada" });
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Agregar el usuario decodificado al objeto de solicitud
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token no válido" });
  }
};

module.exports = authMiddleware;
