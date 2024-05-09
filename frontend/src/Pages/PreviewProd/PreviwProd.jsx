import React, { useContext } from "react";
import "./Preview.scss";
import { itemContext } from "../../Context/itemsContext";
import { useParams } from "react-router-dom";
import Breadcrum from "../../Components/Breadcrums/Breadcrum";
import ProductDisplay from "../../Components/ProductDisplay/ProductsDis";
import DescriptionBox from "../../Components/DescriptionBox/DescriptionBox";
import RelatedProducts from "../../Components/RelatedProducts/RelatedProducts";

const PreviwProd = () => {
    const { products } = useContext(itemContext);
    const { Productid } = useParams();
    const product = products.find((e) => e._id === Productid);

    return (
        <div className="preview">
            <Breadcrum selectedProductId={Productid} />
            <ProductDisplay selectedProductId={Productid}/>
            <DescriptionBox selectedProductId={Productid}/>
            <RelatedProducts/>
        </div>
    );
};

export default PreviwProd;
