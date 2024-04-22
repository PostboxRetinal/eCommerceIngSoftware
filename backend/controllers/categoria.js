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