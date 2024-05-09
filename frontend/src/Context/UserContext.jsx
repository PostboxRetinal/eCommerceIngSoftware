import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // Configurar axios para incluir el token de autenticación en todas las solicitudes
        const token = localStorage.getItem("token");
        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
          // Si no hay token en el almacenamiento local, no hacemos la solicitud
          return;
        }

        const res = await axios.get("http://localhost:4000/api/auth/userinfo");
        setUser(res.data);
      } catch (error) {
        console.error("Error al obtener la información del usuario:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const logout = async () => {
    try {
      await axios.post("http://localhost:4000/api/auth/logout");
      setUser(null);
      alert("Sesión cerrada exitosamente");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
