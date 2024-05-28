import React, { useState, useContext } from "react";
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

    const [datos, setDatos] = useState({
        correo: "",
        password: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDatos({ ...datos, [name]: value });
    }

    const handleSubmit = async () => {
        try {
            const res = await axios.post("http://104.154.254.77:4000/api/auth/login", datos);
            setUser(res.data.user); // Establece el usuario en el contexto de usuario
            alert(res.data.msg); // Mostrar mensaje de bienvenida
            localStorage.setItem('auth-token', res.data.token); // Almacena el token en localStorage
            window.location.href = "/"; // Redirige al usuario a la página principal
        } catch (error) {
            console.error(error);
            alert("Ingreso inválido");
        }
    };

    const toggleMostrarContrasena = () => {
        setMostrarContrasena(!mostrarContrasena);
    }

    return (
        <div className="login">
            <div className="foton">
                <img src={foton} alt="" />
            </div>
            <div className="ti">
                <p>Ingresa aquí</p>
            </div>
            <div className="subti">
                <p>Acceso para miembos exclusivos de SportiFusion</p>
            </div>
            <div className="info">
                <p>E-mail</p>
                <input
                    type="email"
                    name="correo"
                    value={datos.correo}
                    onChange={handleInputChange}
                />
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
                <button type="submit" onClick={handleSubmit}>Iniciar Sesión</button>
            </div>
            <div className="register">
                <Link style={{ textDecoration: 'none' }} to='/Registrar'><p>¿No tienes una cuenta? Registrate</p></Link>
            </div>
        </div>
    )
}

export default Login;
