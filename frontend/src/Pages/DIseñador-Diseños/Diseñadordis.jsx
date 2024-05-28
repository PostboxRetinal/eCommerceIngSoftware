import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Diseñadordis.scss";

// Función para obtener uid desde el token
const getUidFromToken = (token) => {
  if (!token) {
    return null;
  }
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  const payload = JSON.parse(jsonPayload);
  return payload.uid;
};

const Diseñadordis = () => {
  const [diseños, setDiseños] = useState([]);
  const [selectedDiseño, setSelectedDiseño] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('auth-token');
        const uid = getUidFromToken(token);

        if (!uid) {
          throw new Error('No se pudo obtener el UID del token');
        }

        const res = await axios.get(`http://104.154.254.77:4000/api/disennos/disennador/${uid}`);
        setDiseños(res.data);
      } catch (error) {
        console.error('Error fetching diseños', error);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = async (diseño) => {
    try {
      await axios.put(`http://104.154.254.77:4000/api/disennos/${diseño._id}`, diseño);
      setDiseños(diseños.map(d => d._id === diseño._id ? diseño : d));
    } catch (error) {
      console.error('Error updating diseño', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://104.154.254.77:4000/api/disennos/${id}`);
      setDiseños(diseños.filter(d => d._id !== id));
    } catch (error) {
      console.error('Error deleting diseño', error);
    }
  };

  return (
    <div className="diseñadordis">
      <h1>Mis Diseños Encargados</h1>
      <div className="table">
        
          <div className='diseñadis' >
            <p>Identificador</p>
            <p>Descripción</p>
            <p>Imagen</p>
            <p>Nombre Articulo</p>
            <p>Estado</p>
            <p>Accion 1</p>
            <p>Accion 2</p>
          </div>
        <hr />
        <div>
          {diseños.map(diseño => (
            <div className='listadiseña diseñadis' key={diseño._id}>
              <p>{diseño.identificador}</p>
              <p>{diseño.descripcion}</p>
               <img src={diseño.urlImagen} alt="" /> 
              <p>{diseño.producto.nombre} </p>
              
                <select
                  value={diseño.estado}
                  onChange={(e) => setSelectedDiseño({ ...diseño, estado: e.target.value })}
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="rechazado">Rechazado</option>
                  <option value="en progreso">En Progreso</option>
                  <option value="aceptado">Aceptado</option>
                </select>
             
              
                <button onClick={() => handleUpdate(selectedDiseño)}>Actualizar</button>
                <button onClick={() => handleDelete(diseño._id)}>Eliminar</button>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Diseñadordis;
