import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import "./Vercom.scss";
import { itemContext } from '../../Context/itemsContext';

const Vercom = () => {
  const [compras, setCompras] = useState([]);
  const [estadoSeleccionado, setEstadoSeleccionado] = useState('Pendiente');
  const [expandedItems, setExpandedItems] = useState([]);
  const { products } = useContext(itemContext);

  useEffect(() => {
    obtenerCompras();
  }, []);

  const obtenerCompras = async () => {
    try {
      const response = await axios.get('http://104.154.254.77:4000/api/compra/');
      setCompras(response.data);
    } catch (error) {
      console.error('Error al obtener las compras:', error);
    }
  };

  const actualizarEstadoCompra = async (compraId) => {
    try {
      await axios.put(`http://104.154.254.77:4000/api/compra/${compraId}`, { estado: estadoSeleccionado });
      obtenerCompras();
    } catch (error) {
      console.error('Error al actualizar el estado de la compra:', error);
    }
  };

  const eliminarCompra = async (compraId) => {
    try {
      await axios.delete(`http://104.154.254.77:4000/api/compra/${compraId}`);
      obtenerCompras();
    } catch (error) {
      console.error('Error al eliminar la compra:', error);
    }
  };

  const toggleItemExpansion = (index) => {
    setExpandedItems(prevState => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <div className='Vercom'>
      <h2>Listado de Compras</h2>
      <hr />
      <div className='adminitems'>
        <p>Usuario</p>
        <p>Estado Actual</p>
        <p>Total de productos</p>
        <p>Precio total</p>
        <p>Establecer Estado</p>
        <p>Actualizar</p>
        <p>Eliminar</p>
        <p>Detalles</p>

      </div>
      <hr />
      <ul>
        {compras.map((compra,index) => (
          <div key={compra._id} className='listfull'>
            <div className="listaadminitems adminitems">
            <p> {compra.usuario.username}</p>
            <p> {compra.estado}</p>
            <p> {compra.cantidadProductos} </p>
            <p> {compra.precioTotal} </p>
            
            <select
              value={estadoSeleccionado}
              onChange={(e) => setEstadoSeleccionado(e.target.value)}
            >
              <option value="Pendiente">Pendiente</option>
              <option value="Pagado">Pagado</option>
              <option value="Enviado">Enviado</option>
            </select>
            <button onClick={() => actualizarEstadoCompra(compra._id)}>
              Actualizar Estado
            </button>
            <button onClick={() => eliminarCompra(compra._id)}>
              Eliminar Compra
            </button>

            <button onClick={() => toggleItemExpansion(index)}>
              {expandedItems[index] ? 'Ocultar Detalles' : 'Mostrar Detalles'}
            </button>
           
            </div>
            <hr />
            {expandedItems[index] && (
              <div>
                <div className="usuitemsdetail">
                  <p>Articulo</p>
                  <p>nombre del articulo</p>
                  <p>Precio</p>
                  <p>Fecha</p>
                  <p>talla</p>
                  <p>Personalizable</p>
                </div>
                <hr />
                {compra.compraItems.map((item, itemIndex) => (
                  <div key={itemIndex}>
                    <div className="itemsdetail usuitemsdetail">
                      {item.articulo && (
                        <>
                          <img src={products.find(product => product._id === item.articulo._id)?.imagen} alt={item.articulo} className='carticon-product-icon' />
                          <p>{products.find(product => product._id === item.articulo._id)?.nombre}</p>
                        </>
                      )}
                      <p> {item.precio}</p>
                      <p> {item.fecha} </p>
                      <p> {JSON.stringify(item.stock.tallas)} </p>
                      <p>{item.articulo && products.find(product => product._id === item.articulo._id)?.isPersonalizable ? 'Sí' : 'No'}</p>
                      {/* Agrega aquí más detalles del artículo según sea necesario */}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Vercom;
