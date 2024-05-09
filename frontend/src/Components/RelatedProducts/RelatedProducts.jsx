import React, { useContext } from "react";
import "./RelatedProducts.scss"
import { itemContext } from "../../Context/itemsContext";
import { Link } from "react-router-dom";

const RelatedProducts = () =>{
    const { products } = useContext(itemContext);
    return(
        <div className="relatedproducts">
            <h1>Productos que te podrian Interesar</h1>
            <hr />
            <div className="relatedproducsitems">
            {products && products.slice(0, 4).map(producto => (
                        <Link style={{ textDecoration: 'none' }} key={producto._id}  to={`/Preview/${producto._id}`}>
                            <div className="produtinte">
                                <img onClick={window.scroll(0,0)} src={producto.imagen} alt={producto.nombre} />
                                <div>
                                    <p>{producto.nombre} - ${producto.precioUnitario}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
            </div>
        </div>
    )
}

export default RelatedProducts