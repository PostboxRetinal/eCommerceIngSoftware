const express = require("express");
require("dotenv").config();
const { dbConnection } = require("../database/config.js");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 4000;
    this.server = require("http").createServer(this.app);

    this.paths = {
      auth: "/api/auth",
      catalogo: "/api/catalogo",
      articulos: "/api/articulos",
      compra:"/api/compra",
      categoria: "/api/categoria"
    };

    this.connectToDB();
    this.addMiddlewares();
    this.setRoutes();
  }

  //Conectar BBDD
  async connectToDB() {
    await dbConnection();
  }

  addMiddlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  
  }

  setRoutes() {
    this.app.use(this.paths.auth, require("../routes/auth.js"));
    this.app.use(this.paths.catalogo, require("../routes/catalogo.js"));
    this.app.use(this.paths.articulos, require("../routes/articulos.js"));
    this.app.use(this.paths.compra, require("../routes/compra.js"));
    this.app.use(this.paths.categoria, require("../routes/categoria.js"));
   
    
    this.app.use((req, res, next) => {
      res.status(404).json({
        mensaje: 'La ruta solicitada no existe.'
      });
    });
    
  }
  

  listen() {
    this.app.listen(this.port, () => {
      //callback
      console.log("Servidor corriendo en puerto:", process.env.PORT);
      console.log("Ejecutando", process.env.VERSION);

    });
  }
}


module.exports = Server;
