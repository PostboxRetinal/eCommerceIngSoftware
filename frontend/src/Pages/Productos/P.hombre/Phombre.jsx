import React from "react";
import "./Phombre.scss";
import foton2 from "../../../Components/Assets/Mask group.png"
const Phombre = () =>{
    return(
        <div className="Phombre">
            <div className="foton2">
                <img src={foton2} alt="" />
            </div>
            <p className="tituloh">Ropa de Hombre Personalizada</p>
            <div className="containerH">
                <p>Aqui van los Productos de los Hombres</p>
            </div>
        </div>
    )
}

export default Phombre