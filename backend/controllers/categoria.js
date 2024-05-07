const Articulo = require("../models/articulo");

const añadirArticulo = async (req, res) => {
  try {
    const {
      nombre,
      precioUnitario,
      categoria,
      serial,
      stock,
      comentario,
      isPersonalizable,
      xl, l, m, s
    } = req.body;

    // Validación
    if (!nombre) {
      return res.json({ error: "El nombre es obligatorio" });
    }
    if (!precioUnitario) {
      return res.json({ error: "El precio unitario es obligatorio" });
    }
    if (precioUnitario < 0) {
      return res.json({ error: "El precio unitario no puede ser negativo" });
    }
    if (!categoria){
      return res.json({error:"La categoria es obligatoria"});
    }
    if (precioUnitario === 0) {
      return res.json({ error: "El precio unitario no puede ser 0" });
    }
    if (!serial) {
      return res.json({ error: "El serial es obligatorio" });
    }
    if (!stock) {
      return res.json({ error: "El stock es obligatorio" });
    }
    if (!comentario) {
      return res.json({ error: "El comentario es obligatorio" });
    }
    if (isPersonalizable === undefined) {
      return res.json({ error: "El campo personalizable es obligatorio" });
    }

    const existeArticulo = await Articulo.findOne({ nombre });

        if (existeArticulo) {

            return res.json({ error: "El articulo ya existe" });
        };

    let articulo = new Articulo(req.body);
    await articulo.save();
    res.json(articulo);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
};

const actualizarArticulo = async (req, res) => {
  try {
    const {
      nombre,
      precioUnitario,
      serial,
      stock,
      comentario,
      isPersonalizable,
      imagen
    } = req.body;

    // Validación
    if (!nombre) {
      return res.json({ error: "El nombre es obligatorio" });
    }
    if (!serial) {
      return res.json({ error: "El serial es obligatorio" });
    }
    if (!precioUnitario) {
      return res.json({ error: "El precio unitario es obligatorio" });
    }
    if (precioUnitario < 0) {
      return res.json({ error: "El precio unitario no puede ser negativo" });
    }
    if (precioUnitario === 0) {
      return res.json({ error: "El precio unitario no puede ser 0" });
    } 
    if (!stock) {
      return res.json({ error: "El stock es obligatorio" });
    }
    if (!comentario) {
      return res.json({ error: "El comentario es obligatorio" });
    }
    if (isPersonalizable === undefined) {
      return res.json({ error: "El campo personalizable es obligatorio" });
    }
    if (!imagen) {
      return res.json({ error: "La imagen es obligatoria" });
    }

    const articulo = await Articulo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    await articulo.save();

    res.json(articulo);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
};

const eliminarArticulo = async (req, res) => {
  try {
    const articulo = await Articulo.findByIdAndDelete(req.params.id);

    res.json(articulo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno" });
  }
};

const buscarArticulos = async (req, res) => {
  try {
    const pageSize = 6;
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const count = await Articulo.countDocuments({ ...keyword });
    const articulos = await Articulo.find({ ...keyword }).limit(pageSize);

    res.json({
      articulos,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno" });
  }
};

const buscarArticuloPorId = async (req, res) => {
  try {
    const articulo = await Articulo.findById(req.params.id);

    if (articulo) {
      return res.json(articulo);
    } else {
      res.status(404);
      throw new Error("No se encontró el articulo");
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "No se encontró el producto" });
  }
};

const buscarTodosLosArticulos = async (req, res) => {
  try {
    const articulos = await Articulo.find({}).limit(12).sort({ createAt: -1 });
    res.json(articulos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno" });
  }
};

module.exports = {
  añadirArticulo,
  actualizarArticulo,
  eliminarArticulo,
  buscarArticulos,
  buscarArticuloPorId,
  buscarTodosLosArticulos,
};
=======
const Categoria = require("../models/categoria.js");


const crearCategoria = async (req, res) => {

    try {

        const {
            nombre,} = req.body;
           
        if(!nombre){
            return res.json({ error: "El nombre es obligatorio" });
        }   
            
        const existeCategoria = await Categoria.findOne({ nombre });

        if (existeCategoria) {

            return res.json({ error: "La categoria ya existe" });
        }


        const categoria = await new Categoria({ nombre}).save();
        res.json(categoria);
        
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);

    }




};

const actualizarCategoria = async (req, res) => {

    try{

        const {
            nombre,
        } = req.body;
        const {IdCategoria} = req.params;

        const categoria = await Categoria.findOne({ _id: IdCategoria });

        if(!categoria){
            return res.status(404).json({ error: "La categoria no existe" });
        }

        categoria.nombre = nombre;


        const actualizarCategoria = await categoria.save();
        res.json(actualizarCategoria);

    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Error interno"})
    }

}

const eliminarCategoria = async (req, res) => {

    try {

        const borrado = await Categoria.findByIdAndDelete(req.params.IdCategoria);
        res.json(borrado);
    } catch (error) {

        console.error(error);
        res.status(500).json({error: "Error interno"})
        
    }
};

const listarCategorias = async (req, res) => {

try {
    const todasLasCategorias = await Categoria.find({});
    res.json(todasLasCategorias);
    
} catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
}



};


const buscarCategoria = async (req, res) => {

    try {


        const categoria = await Categoria.findById(req.params.id);
        res.json(categoria);


    } catch (error) {

        console.error(error);
        return res.status(404).json({ error: "No se encontró la categoria" });
        
    }

}

module.exports = { crearCategoria, actualizarCategoria, eliminarCategoria, listarCategorias, buscarCategoria };
