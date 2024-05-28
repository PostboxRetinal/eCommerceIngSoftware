import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import "./Pedusu.scss";
import { itemContext } from '../../Context/itemsContext';

const Pedusu = () => {
  const [compras, setCompras] = useState([]);
  const [userId, setUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [expandedItems, setExpandedItems] = useState([]);
  const token = localStorage.getItem('auth-token');

  const { products } = useContext(itemContext);

  useEffect(() => {
    const decodeToken = (token) => {
      try {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        return decoded;
      } catch (error) {
        return null;
      }
    };

    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken && decodedToken.uid) {
        setUserId(decodedToken.uid);
        setIsLoggedIn(true);
        axios.get(`http://104.154.254.77:4000/api/compra/usuario?usuario=${decodedToken.uid}`)
          .then(response => {
            setCompras(response.data);
            // Inicializar el estado de los elementos expandidos para cada compra
            const initialExpandedItems = response.data.map(() => false);
            setExpandedItems(initialExpandedItems);
          })
          .catch(error => {
            console.error('Error al obtener las compras:', error);
          });
      }
    }
  }, []);

  const toggleItemExpansion = (index) => {
    setExpandedItems(prevState => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <div className='Pedidos-usuarios'>
      <h2>Tus Compras</h2>
      <div className="usuitems">
        <p>Estado</p>
        <p>Cantidad de Productos</p>
        <p>Precio Total</p>
        <p>Detalles</p>
      </div>
      <hr />
      {isLoggedIn ? (
        <div>
          {compras.map((compra, index) => (
            <div key={compra._id} >
            <div className="listausucom usuitems">
              <p>{compra.estado}</p>
              <p>{compra.cantidadProductos}</p>
              <p>{compra.precioTotal}</p>
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
                        <img src={products.find(product => product._id === item.articulo._id)?.imagen} alt={item.articulo} className='carticon-product-icon' />
                        <p>{products.find(product => product._id === item.articulo._id)?.nombre}</p>
                        
                      <p> {item.precio}</p>
                      <p> {item.fecha} </p>
                      <p> {JSON.stringify(item.stock.tallas)} </p>
                      <p>{products.find(product => product._id === item.articulo._id)?.isPersonalizable ? 'Sí' : 'No'}</p>
                      {/* Agrega aquí más detalles del artículo según sea necesario */}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No se ha iniciado sesión.</p>
      )}
    </div>
  );
}

export default Pedusu;
