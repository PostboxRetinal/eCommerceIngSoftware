import React, { useState, useContext} from "react"
import './Navbar.scss'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from "react-router-dom"
import { UserContext } from "../../Context/UserContext";

const Navbar = () => {

    const [menu , setMenu] = useState('Tienda')
    const { user , logout} = useContext(UserContext);
   
    return (
        <div className="navbar">
            <div className="nav-logo">
                <img src={logo} alt="" />
                <p>E-COMMERCE</p>
            </div>
        <ul className="nav-menu">
            <li onClick={() => {setMenu('Tienda')}}><Link style={{textDecoration:'none'}} to = '/'>Inicio</Link>{menu === "Tienda"?<hr/>:<></>}</li>
            <li onClick={() => {setMenu('Productos')}}><Link style={{textDecoration:'none'}}to='/Product'>Productos</Link>{menu === "Productos"?<hr/>:<></>}</li>
            <li onClick={() => {setMenu('Contactanos')}}><Link style={{textDecoration:'none'}} to='/Contactanos'>Contactanos</Link>{menu === "Contactanos"?<hr/>:<></>}</li>
        </ul>
        <div className="nav-login-cart">
            {/* Mostrar el nombre del usuario si está autenticado, de lo contrario, mostrar el botón de inicio de sesión */}
            {user ? (
                    <div className="dropdown">
                        <button className="dropbtn">{user.username}</button>
                        <div className="dropdown-content">
                            <button onClick={logout}>Logout</button>
                        </div>
                    </div>
                ) : (
                    <Link to='/Login'><button>Registrar/Inicio</button></Link>
                )}
            <Link to='/Carrito'><img src={cart_icon} alt="" /></Link>
            <div className="nav-cart-count">0</div>
        </div>
        </div>
    )
}

export default Navbar