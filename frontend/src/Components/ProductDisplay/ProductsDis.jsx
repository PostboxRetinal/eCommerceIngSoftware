import React, { useContext, useState } from "react";
import "./ProductsDis.scss";
import { itemContext } from "../../Context/itemsContext";
import axios from 'axios';
import star_icon from "../Assets/star_icon.png";
import star_dull from "../Assets/star_dull_icon.png";

const ProductDisplay = ({ selectedProductId }) => {
    const { products, addTOcart } = useContext(itemContext);

    const selectedProduct = products.find(product => product._id === selectedProductId);

    const [customDescription, setCustomDescription] = useState('');
    const [customImageUrl, setCustomImageUrl] = useState('');

    const handleCreateDesign = async () => {
        try {
            // Obtener el token del localStorage
            const token = localStorage.getItem('auth-token');
            console.log(token);

            // Verificar si el token está presente
            if (!token) {
                console.error('User token not found');
                return;
            }

            // Extraer el ID de usuario del token (si es posible)
            const userId = extractUserIdFromToken(token);
            console.log(userId)

            // Verificar si se pudo extraer el ID de usuario
            if (!userId) {
                console.error('User ID not found in token');
                return;
            }

            const response = await axios.post('http://104.154.254.77:4000/api/disennos/', {
                identificador: `disenno-${Date.now()}`,
                descripcion: customDescription,
                urlImagen: customImageUrl,
                producto: selectedProductId,
                estado: "pendiente",
                fechaCreacion: new Date(),
                usuario: userId,
            }, {
                headers: {
                    'auth-token': token // Enviar el token en el encabezado
                }
            });

            console.log('Custom Design Created:', response.data.disennoGuardado);
            alert("Se ha generado su diseño")
            window.location.href = "/";
        } catch (error) {
            console.error('Error creating custom design:', error);
        }
    };

    const extractUserIdFromToken = (token) => {
        try {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            return decodedToken.uid;
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    };

    return (
        <div className="productdisplay">
            <div className="productodisplay-left">
                <div className="productdisplay-img-list">
                </div>
                <div className="productdisplay-img">
                    <img className="productdisplay-main-img" src={selectedProduct.imagen} alt={selectedProduct.nombre} />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{selectedProduct.nombre}</h1>
                <div className="productdisplay-right-star">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull} alt="" />
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-pricesnew">${selectedProduct.precioUnitario}</div>
                </div>
                <div className="productdisplay-right-description">
                    {selectedProduct.descripcion}
                </div>
                <div className="productdisplay-right-size">
                    <h1>Tallas Disponibles</h1>
                    <div className="productdisplay-right-sizes">
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                    </div>
                    <button onClick={() => { addTOcart(selectedProduct._id) }}>AÑADIR AL CARRITO</button>
                </div>
                {selectedProduct.isPersonalizable && (
                    <div className="productdisplay-customization">
                        <h2>Personaliza tu Producto</h2>
                        <div className="descripdes">
                            <label>Descripción:</label>
                            <input
                                type="text"
                                value={customDescription}
                                onChange={(e) => setCustomDescription(e.target.value)}
                            />
                        </div>
                        <div className="imagendes">
                            <label>URL Imagen:</label>
                            <input
                                type="text"
                                value={customImageUrl}
                                onChange={(e) => setCustomImageUrl(e.target.value)}
                            />
                        </div>
                        <button onClick={handleCreateDesign}>CREAR DISEÑO</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDisplay;
