import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const itemContext = createContext();

export const ItemProvider = ({ children }) => {
  const [products, setProductos] = useState([]);
  const [cartItems, setCartItems] = useState({}); // Cambié getDefaultCart a un objeto vacío

  useEffect(() => {
    axios.get('http://104.154.254.77:4000/api/articulos/')
      .then(response => {
        setProductos(response.data.articulos);
        setCartItems(getDefaultCart(response.data.articulos)); // Llamar getDefaultCart aquí con los productos
      })
      .catch(error => console.error('Error al obtener los productos:', error));
  }, []);

  // Función para obtener el carrito por defecto basado en los productos
  const getDefaultCart = (products) => {
    let cart = {};
    for (const product of products) {
      cart[product._id] = 0;
    }
    return cart;
  };
  
  const addTOcart = (itemId) =>{
    setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
    console.log(cartItems)
  }

  const removeFormcart = (itemId) =>{
    setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
  }

  const getTotalcarAmount = () => {
    let totalAmount = 0;
    for(const item in cartItems) {
      if(cartItems[item] > 0) {
        let iteminfo = products.find((product) => product._id === item);
        totalAmount += iteminfo.precioUnitario * cartItems[item];
      }
    }
    return totalAmount; // Mover el return fuera del bucle
  }

  const getTotalCartItems = () =>{
    let totalItem = 0;
    for(const item in cartItems){
      if(cartItems[item] > 0){
        totalItem += cartItems[item];
      }
    }
    return totalItem; // Mover el return fuera del bucle
  }
  const addArticleToDatabase = async (newArticle) => {
    try {
      const response = await axios.post('http://104.154.254.77:4000/api/articulos/', newArticle);
      const addedArticle = response.data;
      setProductos(prev => [...prev, addedArticle]);
      setCartItems(prev => ({ ...prev, [addedArticle._id]: 0 }));
      console.log("Artículo agregado correctamente:", addedArticle);
    } catch (error) {
      console.error('Error al agregar el artículo:', error);
    }
  };

  const eliminarArticulo = async (itemId) => {
    try {
      await axios.delete(`http://104.154.254.77:4000/api/articulos/${itemId}`);
      setProductos(prevProducts => prevProducts.filter(product => product._id !== itemId));
      setCartItems(prevCartItems => {
        const updatedCart = { ...prevCartItems };
        delete updatedCart[itemId];
        return updatedCart;
      });
      console.log("Artículo eliminado correctamente:", itemId);
    } catch (error) {
      console.error('Error al eliminar el artículo:', error);
    }
  };

  const actualizarArticulo = async (itemId, newData) => {
    try {
      await axios.put(`http://104.154.254.77:4000/api/articulos/${itemId}`, newData);
      setProductos(prevProducts =>
        prevProducts.map(product =>
          product._id === itemId ? { ...product, ...newData } : product
        )
      );
      console.log("Artículo actualizado correctamente:", itemId);
    } catch (error) {
      console.error('Error al actualizar el artículo:', error);
    }
  };
  return (
    <itemContext.Provider value={{ products, cartItems,addTOcart,removeFormcart, getTotalcarAmount, getTotalCartItems,addArticleToDatabase, actualizarArticulo,eliminarArticulo }}>
      {children}
    </itemContext.Provider>
  );
};

export default itemContext;
