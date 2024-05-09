import React, { useContext }  from "react";
import "./DescriptionBox.scss"
import { itemContext } from "../../Context/itemsContext";

const DescriptionBox = ({ selectedProductId }) =>{
    const { products } = useContext(itemContext);

    const selectedProduct = products.find(product => product._id === selectedProductId);

    return(
        <div className="descriptionbox">
            <div className="descriptionbox-navigator">
                <div className="descriptionbox-nav-box">Descripcion</div>
                <div className="descriptionbox-nav-box fade">Comentarios (122)</div>

            </div>
            <div className="descriptionbox-description">
                <p>{selectedProduct.comentario}</p>
            </div>
        </div>
    )
}

export default DescriptionBox