import React from "react";
import "./Pmujer.scss";
import foton2 from "../../../Components/Assets/Mask group.png"
const Pmujer =() =>{
    return(
        <div className="Pmujer">
            <div className="foton2">
                <img src={foton2} alt="" />
            </div>
            <p className="tituloM">Ropa de Mujer Personalizada</p>
            <div className="containerM">
                <p>Aqui van los articulos de las Mujeres</p>
            </div>
        </div>
    )
}

export default Pmujer