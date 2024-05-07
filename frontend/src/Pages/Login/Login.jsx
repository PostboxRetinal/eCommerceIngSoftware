import React , { useState, useContext }from "react";
import './Login.scss';
import foton from "../../Components/Assets/image 22.png"
import ojoabierto from "../../Components/Assets/ojo (1).png"
import ojocerrado from "../../Components/Assets/ojo.png"
import { Link } from "react-router-dom";
import axios from 'axios';
import { UserContext } from "../../Context/UserContext";

const Login = () => {
    const [mostrarContrasena, setMostrarContrasena] = useState(false);
    const { setUser } = useContext(UserContext);

    const[datos,setDatos]=useState({
        correo:"",
        password:""

    });
    const handleInputChange =(e) =>{
        let{name,value} = e.target;
        let newDatos = {...datos,[name]:value};
        setDatos(newDatos);
    }
    const handleSubmit = async () => {
        try {
          const res = await axios.post("http://localhost:4000/api/auth/login", datos);
          setUser(res.data.user); // Aquí asumimos que el backend devuelve el usuario al iniciar sesión
          alert("Bienvenido" + res.data.msg);
        } catch (error) {
          console.error(error);
          alert("Ingreso inválido");
        }
      };

    const toggleMostrarContrasena = () => {
        setMostrarContrasena(!mostrarContrasena);
    }

    return(
        <div className="login">
            <div className="foton">
                <img src={foton} alt="" />
            </div>
            <div className="ti">
                <p>Camisetas Colombia</p>
            </div>
            <div className="subti">
                <p>Acceso gratuito a todas las herramientas de nuestro E-commerce</p>
            </div>
            <div className="info">
                <p>Email</p>
                <input type="email" 
                name="correo"
                value={datos.correo}
                onChange={handleInputChange}/>
                <p>Contraseña</p>
                 <div className="contrasena-input">
                    <input
                        type={mostrarContrasena ? "text" : "password"}
                        placeholder=""
                        name="password"  
                        value={datos.password}
                        onChange={handleInputChange}
                    />
                    <img
                        src={mostrarContrasena ? ojoabierto : ojocerrado}
                        alt="Mostrar Contraseña"
                        onClick={toggleMostrarContrasena}
                    />
                </div>
               
            </div>
            <div className="btlogon">
            <Link to="/">
                <button type="submit" onClick={handleSubmit}>Iniciar Sesion</button>
            </Link>
            </div>

            <div className="register">
            <Link style={{textDecoration:'none'}} to='/Registrar'><p>¿No tienes una cuenta?Registrate</p></Link>
            </div>

        </div>
    )
}

export default Login

