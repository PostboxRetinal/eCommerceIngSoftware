import React, {useContext} from 'react'
import "./CartItems.scss"
import {itemContext} from "../Context/itemsContext";
import removeicon from "../Components/Assets/cart_cross_icon.png"
import imagenremplazable from "../Components/Assets/product_1.png"

const Cartitems = () => {
const { products, cartItems, removeFormcart,getTotalcarAmount } = useContext(itemContext);
  return (
    <div className='cartitems'>
        <div className="cartitems-format-main">
            <p>Productos</p>
            <p>Titulo</p>
            <p>Precio</p>
            <p>Cantidad</p>
            <p>Total</p>
            <p>Borrar</p>
        </div>
        <hr />
        <div>
            {products && products.map(e=>{
                if(cartItems[e._id]>0){
                    return <div key={e._id}>
                            <div className="cartimes-format cartitems-format-main">
                            <img src={e.imagen} alt={e.nombre}className='carticon-product-icon' />
                            <p>{e.nombre}</p>
                            <p>{e.precioUnitario}</p>
                            <button className='cartitmes-cantidad'>{cartItems[e._id]}</button>
                            <p>${e.precioUnitario*cartItems[e._id]} </p>
                            <img className="cart-remove-icon"src={removeicon} onClick={()=>{removeFormcart(e._id)}} alt="" />
                        </div>
                        <hr />
                    </div>
                }
                return null;
            })}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Total Carrito</h1>
                    <div>
                        <div className="cartitmes-total-item">
                            <p>Subtotal</p>
                            <p>${getTotalcarAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitmes-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitmes-total-item">
                            <h3>Total</h3>
                            <h3>${getTotalcarAmount()}</h3>
                        </div>
                    </div>
                    <button>PROCEDER AL CHECKOUT</button>
                </div>
                <div className="cartitems-promocode">
                    <p>Si tienes un codigo de promocion,ingresalo aqui</p>
                    <div className="cartitem-promobox">
                        <input type="text" placeholder='Codigo de Promocion' />
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Cartitems
