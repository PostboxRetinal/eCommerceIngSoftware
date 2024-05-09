import React , { useState, useContext }from "react";
import "./Register.scss"
import foton from "../../Components/Assets/image 22.png"
import ojoabierto from "../../Components/Assets/ojo (1).png"
import ojocerrado from "../../Components/Assets/ojo.png"
import axios from 'axios';
import { Link } from 'react-router-dom'
import { UserContext } from "../../Context/UserContext";
const Registrar = () =>{
    const { setUser } = useContext(UserContext);
    const [mostrarContrasena, setMostrarContrasena] = useState(false);
    const [formData, setFormData] = useState({
        identificacion: "",
        username: "",
        correo: "",
        password: ""
      });
    
    const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Enviar los datos al backend (ruta /api/register) mediante Axios
            const response = await axios.post("http://localhost:4000/api/auth/new", formData);
    
            if (response.status === 201) {
                setUser(response.data);
                console.log("Usuario registrado con éxito",formData);
                alert("Bienvenido");
                window.location.href = "/";
                localStorage.setItem('auth-token',response.data.token);
            } else {
                console.error("Error al registrar el usuario:", response.data); // Muestra el mensaje de error del servidor
                alert("Ingreso inválido");
            }
        } catch (error) {
            console.error("Error al registrar el usuario:", error);
            alert("Hubo un error al procesar la solicitud");
        }
    };
    

     
    

    const toggleMostrarContrasena = () => {
        setMostrarContrasena(!mostrarContrasena);
    }
    return(
        <div className="registrer">
            <div className="fotons">
                <img src={foton} alt="" />
            </div>
            <div className="tit">
                <p>Camisetas Colombia</p>
            </div>
            <div className="subtit">
                <p>Acceso gratuito a todas las herramientas de nuestro E-commerce</p>
            </div>
            <div className="infot">
                <p>Identificacion</p>
                <input type="text"
                 name="identificacion"
                 value={formData.identificacion}
                 onChange={handleInputChange}
                 />
                <p>Nombre Completo</p>
                <input type="text" 
                 name="username"
                 value={formData.username}
                 onChange={handleInputChange}
                />
                <p>Email</p>
                <input type="email" 
                name="correo"
                value={formData.correo}
                onChange={handleInputChange}/>
                <p>Contraseña</p>
                 <div className="contrasena-input">
                    <input
                        type={mostrarContrasena ? "text" : "password"}
                        name="password"  
                        value={formData.password}
                        onChange={handleInputChange}

                    />
                    <img
                        src={mostrarContrasena ? ojoabierto : ojocerrado}
                        alt="Mostrar Contraseña"
                        onClick={toggleMostrarContrasena}
                    />
                </div>
               
            </div>
            <div className="btlogonr">
            <Link to="/">
                <button type="submit" onClick={handleSubmit}>Registrarse</button>
            </Link>
            </div>
        </div>
    )
}

export default Registrar