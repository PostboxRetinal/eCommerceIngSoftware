import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Categorias.scss";

const Categorias = () => {
    const [categorias, setCategorias] = useState([]);
    const [nuevaCategoria, setNuevaCategoria] = useState('');

    useEffect(() => {
        obtenerCategorias();
    }, []);

    const obtenerCategorias = async () => {
        try {
            const respuesta = await axios.get('http://104.154.254.77:4000/api/categoria/categoriasr');
            setCategorias(respuesta.data);
        } catch (error) {
            console.error(error);
        }
    };

    const agregarCategoria = async () => {
        try {
            const respuesta = await axios.post('http://104.154.254.77:4000/api/categoria/categoriasr', { nombre: nuevaCategoria });
            setCategorias([...categorias, respuesta.data]);
            setNuevaCategoria('');
        } catch (error) {
            console.error(error);
        }
    };

    const eliminarCategoria = async (id) => {
        try {
            await axios.delete(`http://104.154.254.77:4000/api/categoria/categoriasr/${id}`);
            const nuevasCategorias = categorias.filter(categoria => categoria._id !== id);
            setCategorias(nuevasCategorias);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='Categorias'>
            <h2>Lista de Categorías</h2>
            <hr />
            <div className="catego">
                <p>Nombre de la categoria</p>
                <p>Eliminar</p>
            </div>
            <hr />
            <div>
                {categorias.map(categoria => (
                    <div key={categoria._id} >
                        <div className='categori catego '>
                        {categoria.nombre}
                        <button onClick={() => eliminarCategoria(categoria._id)}>Eliminar</button>

                        </div>
                       
                    </div>
                ))}
            </div>
           <hr />
            
            <div className='Agregar-cat'>
            <h2>Añadir Categoria</h2>
                <hr />
                <div className='añarcat'>
                <p>Nombre Categoria</p>
                <input type="text" value={nuevaCategoria} onChange={(e) => setNuevaCategoria(e.target.value)} />
                <button onClick={agregarCategoria}>Agregar Categoría</button>
                </div>
            </div>
        </div>
    );
};

export default Categorias;
