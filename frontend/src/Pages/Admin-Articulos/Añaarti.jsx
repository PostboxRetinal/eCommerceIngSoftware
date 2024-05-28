import React, { useState, useContext, useEffect } from 'react';
import { itemContext } from '../../Context/itemsContext';
import axios from 'axios';
import "./Añarti.scss";
import Eliminart from './EliminArt/Eliminart';
const Añaarti = () => {
  const [newArticle, setNewArticle] = useState({
    nombre: '',
    descripcion: '',
    precioUnitario: 0,
    categoria: '',
    stock: {
      tallas: {
        S: 0,
        M: 0,
        L: 0,
        XL: 0
      },
      total: 0
    },
    comentario: '',
    isPersonalizable: false,
    imagen: ''
  });

  const [categorias, setCategorias] = useState([]);
  const { addArticleToDatabase } = useContext(itemContext);

  useEffect(() => {
    // Cargar categorías al montar el componente
    const fetchCategorias = async () => {
      try {
        const response = await axios.get('http://104.154.254.77:4000/api/categoria/categorias');
        setCategorias(response.data);
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    };

    fetchCategorias();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewArticle(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleStockChange = (e) => {
    const { name, value } = e.target;
    // Verificar si el valor es negativo y si es así, establecerlo como 0
    const newValue = parseInt(value) < 0 ? 0 : parseInt(value);
    const { tallas } = newArticle.stock;
    const newStock = {
      ...newArticle.stock,
      tallas: {
        ...tallas,
        [name]: newValue
      },
      total: Object.values({
        ...tallas,
        [name]: newValue
      }).reduce((acc, curr) => acc + curr, 0)
    };
    setNewArticle(prevState => ({
      ...prevState,
      stock: newStock
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://104.154.254.77:4000/api/articulos/', newArticle);
      console.log('Artículo añadido correctamente');
      alert("Articulo Añadido")
      // Limpiar el formulario después de agregar el artículo
      setNewArticle({
        nombre: '',
        descripcion: '',
        precioUnitario: 0,
        categoria: '',
        stock: {
          tallas: {
            S: 0,
            M: 0,
            L: 0,
            XL: 0
          },
          total: 0
        },
        comentario: '',
        isPersonalizable: false,
        imagen: ''
      });
    } catch (error) {
      console.error('Error al añadir el artículo:', error);
    }
  };

  return (
    <div >
      <div className='añadirart'>
      <h2>Añadir Nuevo Artículo</h2>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="forms">
        <label>
          Nombre:
          <input type="text" name="nombre" value={newArticle.nombre} onChange={handleChange} />
        </label>
        <label>
          Descripción:
          <input type="text" name="descripcion" value={newArticle.descripcion} onChange={handleChange} />
        </label>
        <label>
          Precio Unitario:
          <input type="number" name="precioUnitario" value={newArticle.precioUnitario} onChange={handleChange} />
        </label>
        <label>
          Categoría:
          <select name="categoria" value={newArticle.categoria} onChange={handleChange}>
            <option value="">Seleccione una categoría</option>
            {categorias.map(categoria => (
              <option key={categoria._id} value={categoria._id}>{categoria.nombre}</option>
            ))}
          </select>
        </label>
        <label>
          Stock Total:
          <input type="number" name="stock.total" value={newArticle.stock.total} onChange={handleChange} />
        </label>
        <label>
          Stock por Talla:
          <div>
            <label>S:</label>
            <input type="number" name="S" value={newArticle.stock.tallas.S} onChange={handleStockChange} />
            <label>M:</label>
            <input type="number" name="M" value={newArticle.stock.tallas.M} onChange={handleStockChange} />
            <label>L:</label>
            <input type="number" name="L" value={newArticle.stock.tallas.L} onChange={handleStockChange} />
            <label>XL:</label>
            <input type="number" name="XL" value={newArticle.stock.tallas.XL} onChange={handleStockChange} />
          </div>
        </label>
        <label>
          Comentario:
          <input type="text" name="comentario" value={newArticle.comentario} onChange={handleChange} />
        </label>
        <label>
          Personalizable:
          <input type="checkbox" name="isPersonalizable" checked={newArticle.isPersonalizable} onChange={(e) => setNewArticle(prevState => ({ ...prevState, isPersonalizable: e.target.checked }))} />
        </label>
        <label>
          Url de la imagen:
          <input type="text" name="imagen" value={newArticle.imagen} onChange={handleChange} />
        </label>
        <button type="submit">Agregar Artículo</button>
        </div>
      </form>
      </div>
      <Eliminart/>
    </div>
    
    
  );
};

export default Añaarti;
