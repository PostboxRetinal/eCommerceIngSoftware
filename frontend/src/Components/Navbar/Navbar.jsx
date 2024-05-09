import React, { useState, useContext} from "react"
import './Navbar.scss'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from "react-router-dom"
import { UserContext } from "../../Context/UserContext";
import { itemContext } from "../../Context/itemsContext"

const Navbar = () => {

    const [menu , setMenu] = useState('Tienda')
    const { user , logout} = useContext(UserContext);
    const { getTotalCartItems }  = useContext (itemContext)
   
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
            {localStorage.getItem('auth-token')
            ? <button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace("/")}}>Cerrar Sesion</button>
            :<Link to='/Login'><button>Registrar/Inicio</button></Link>}
            <Link to='/Carrito'><img src={cart_icon} alt="" /></Link>
            <div className="nav-cart-count">{getTotalCartItems()}</div>
        </div>
        </div>
    )
}

export default Navbar