import React from "react";
import './Producto.scss'
import foton2 from "../../Components/Assets/Mask group.png"
import fhom from "../../Components/Assets/Fhom.png"
import fmuj from "../../Components/Assets/Fmuj.png"
import { Link } from "react-router-dom";

const Productos = () => {
    return (
        <div className="Productos">
            <div className="foton2">
                <img src={foton2} alt="" />
            </div>
            <p className="titulorop">Elige un producto</p>
            <div className="rophom">
                <p>Ropa de Hombre</p>
                <Link to="/Phombre"><img src={fhom} alt="" /></Link>
            </div>
            <div className="ropmuj">
                <p>Ropa de Mujer</p>
                <Link to="/Pmujer"><img src={fmuj} alt="" /></Link>
            </div>
        </div>
    )
}

export default Productos