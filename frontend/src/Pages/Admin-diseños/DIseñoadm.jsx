import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Diseñoadm.scss";

const Diseñoadm = () => {
  const [diseños, setDiseños] = useState([]);
  const [diseñadores, setDiseñadores] = useState([]);
  const [selectedDiseño, setSelectedDiseño] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const diseñosRes = await axios.get('http://104.154.254.77:4000/api/disennos/');
        const diseñadoresRes = await axios.get('http://104.154.254.77:4000/api/auth/disennadores');
        setDiseños(diseñosRes.data);
        setDiseñadores(diseñadoresRes.data);
      } catch (error) {
        console.error('Error fetching data', error);
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
    <div className="diseñoadm">
      <h1>Listado de Diseños</h1>
      <div className="table">
        
          <div className='admindis'>
            <p>Identificador</p>
            <p>Descripción</p>
            <p>Imagen</p>
            <p>producto</p>
            <p>Estado</p>
            <p>Diseñador Encargado</p>
            <p>Accion 1</p>
            <p>Accion 2</p>
        </div>
        <hr />
        <div >
          {diseños.map(diseño => (
            <div className='listdadis admindis' key={diseño._id}>
              <p>{diseño.identificador}</p>
              <p>{diseño.descripcion}</p>
                <img src={diseño.urlImagen} alt="" /> 
              <p> {diseño.producto.nombre} </p>

              
                <select
                  value={diseño.estado}
                  onChange={(e) => setSelectedDiseño({ ...diseño, estado: e.target.value })}
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="rechazado">Rechazado</option>
                  <option value="en progreso">En Progreso</option>
                  <option value="aceptado">Aceptado</option>
                </select>
              
              
                <select
                  value={diseño.disennadorEncargado || ''}
                  onChange={(e) => setSelectedDiseño({ ...diseño, disennadorEncargado: e.target.value })}
                >
                  <option value="">Seleccionar diseñador</option>
                  {diseñadores.map(diseñador => (
                    <option key={diseñador._id} value={diseñador._id}>
                      {diseñador.username}
                    </option>
                  ))}
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

export default Diseñoadm;
