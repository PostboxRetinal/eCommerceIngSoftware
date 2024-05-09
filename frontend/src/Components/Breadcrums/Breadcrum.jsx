import React, { useContext } from "react";
import "./Breadcrum.scss";
import { itemContext } from "../../Context/itemsContext";
import arrow_icon from "../Assets/breadcrum_arrow.png";

const Breadcrum = ({ selectedProductId }) => {
    const { products } = useContext(itemContext);

    const selectedProduct = products.find(product => product._id === selectedProductId);

    return(
        <div className="breadcrum">
            HOME <img src={arrow_icon} alt=""/> Shop <img src={arrow_icon} alt=""/> {selectedProduct ? selectedProduct.nombre : "Producto no encontrado"}
        </div>
    );
}

export default Breadcrum;
