import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import "./Compra.scss"

const Compra = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const productosEnCarrito = JSON.parse(decodeURIComponent(searchParams.get('productos')));
    console.log("estos son los productos del carrito:",productosEnCarrito)

    const [direccion, setDireccion] = useState({
        direccion: '',
        ciudad: '',
        barrio: '',
        codigoPostal: '',
        observaciones: ''
    });

    const [metodoPago, setMetodoPago] = useState('');
    const [userId, setUserId] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Verificar si el usuario está autenticado al cargar el componente
        const token = localStorage.getItem('auth-token');
        console.log("id del usuario:",token)
        if (token) {
            // Decodificar el token para obtener el ID del usuario
            const decodedToken = decodeToken(token);
            console.log("id del usuario:",decodedToken.uid)
            if (decodedToken && decodedToken.uid) {
                setUserId(decodedToken.uid);
                console.log("id del usuario:",decodedToken.uid)
                setIsLoggedIn(true);
                
            }
        }
    }, []);

    const decodeToken = (token) => {
        console.log("id del usuario:",token)
        // Aquí puedes usar una librería como jwt-decode para decodificar el token
        // Este es solo un ejemplo básico
        try {
            const decoded = JSON.parse(atob(token.split('.')[1]));
            console.log("id del usuario:",decoded)
            return decoded;
        } catch (error) {
            return null;
        }
    };

    // Función para procesar la compra
    const procesarCompra = async () => {
        
        // Verificar si el usuario está autenticado antes de procesar la compra
        if (!isLoggedIn) {
            alert("no te has iniciado sesion")
            window.location.href = '/login';
            return;
        }

        
        console.log("id del usuario:",userId)
const compraItems = productosEnCarrito.map(producto => ({
            consecutivo: Math.floor(Math.random() * 1000),
            fecha: new Date(),
            stock: {
                tallas: { [producto.talla]: producto.cantidad },
                total: producto.cantidad
            },
            precio: producto.precioUnitario,
            articulo: producto.id
        }));

        const compra = {
            usuario: userId,
            compraItems,
            cantidadProductos: compraItems.length,
            estado: 'PENDIENTE',
            direccionDomicilio: direccion,
            metodoPago,
            precioArticulos: productosEnCarrito.reduce((total, producto) => total + (producto.precioUnitario * producto.cantidad), 0),
            precioTotal: productosEnCarrito.reduce((total, producto) => total + (producto.precioUnitario * producto.cantidad), 0), // Debes calcular el precio total aquí,
            isPago: false,
            isDelivered: false
        };

        try {
            const response = await axios.post('http://104.154.254.77:4000/api/compra/', compra);
            console.log('Compra procesada:', response.data);
            alert("Su Compra a sido Realizada");
            window.location.href = '/';

        } catch (error) {
            alert("Error al realizar su compra llene todos los campos");
            console.error('Error al procesar la compra:', error);
        }
    };


    return (
        <div className='Compra'>
            <div className="Titulocom">
                <h1>Compra</h1>
            </div>
            <hr />
        <form>
            <label className='dir'>
                Dirección:
                <input type="text" value={direccion.direccion} onChange={e => setDireccion({ ...direccion, direccion: e.target.value })} />
            </label>
            <label className='ciu'>
                Ciudad:
                <input type="text" value={direccion.ciudad} onChange={e => setDireccion({ ...direccion, ciudad: e.target.value })} />
            </label>
            <label className='barrio'>
                Barrio:
                <input type="text" value={direccion.barrio} onChange={e => setDireccion({ ...direccion, barrio: e.target.value })} />
            </label>
            <label className='Codp'>
                Código Postal:
                <input type="text" value={direccion.codigoPostal} onChange={e => setDireccion({ ...direccion, codigoPostal: e.target.value })} />
            </label>
            <label className='Obse'>
                Observaciones:
                <textarea value={direccion.observaciones} onChange={e => setDireccion({ ...direccion, observaciones: e.target.value })} />
            </label>
            <label className='metod'>
                Método de Pago:
                <select value={metodoPago} onChange={e => setMetodoPago(e.target.value)}>
                    <option value="">Selecciona método de pago</option>
                    <option value="Tarjeta">Tarjeta</option>
                    <option value="PayPal">PayPal</option>
                    <option value="Transferencia">Transferencia</option>
                </select>
            </label>
            <button className="btoncom" type="button" onClick={procesarCompra}>Realizar Compra</button>
        </form>
    </div>
    );
}

export default Compra;
