import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Diseñusu.scss"

const Diseñusu = () => {
  const [diseños, setDiseños] = useState([]);
  const [userId, setUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [expandedDiseños, setExpandedDiseños] = useState([]);
  const token = localStorage.getItem('auth-token');

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
        axios.get(`http://104.154.254.77:4000/api/disennos/usu?usuario=${decodedToken.uid}`)
          .then(response => {
            setDiseños(response.data);
            // Inicializar el estado de los diseños expandidos para cada usuario
            const initialExpandedDiseños = response.data.map(() => false);
            setExpandedDiseños(initialExpandedDiseños);
          })
          .catch(error => {
            console.error('Error al obtener los diseños del usuario:', error);
          });
      }
    }
  }, []);

  const toggleDiseñoExpansion = (index) => {
    setExpandedDiseños(prevState => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <div className='Diseños-usuarios'>
      <h2>Tus Diseños Solicitados</h2>
      <div className="usuitems">
        <p>Descripción</p>
        <p>Estado</p>
        <p>Imagen</p>
        <p>Detalles</p>
      </div>
      <hr />
      {isLoggedIn ? (
        <div>
          {diseños.map((diseño, index) => (
            <div key={diseño._id}>
              <div className="listadisenousu usuitems">
                <p>{diseño.descripcion}</p>
                <p>{diseño.estado}</p>
                <img src={diseño.urlImagen} alt="" />
                <button onClick={() => toggleDiseñoExpansion(index)}>
                  {expandedDiseños[index] ? 'Ocultar Detalles' : 'Mostrar Detalles'}
                </button>
              </div>
              <hr />
              {expandedDiseños[index] && (
                <div>
                    <div className='diseñditail'>
                    <p>Articulo</p>
                    <p>nombre del articulo</p>
                    </div>
                    <hr />
                <div className='diseñditail'>
                  <img src={diseño.producto.imagen} alt="" />
                  <p> {diseño.producto.nombre} </p>
                </div>
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

export default Diseñusu;
