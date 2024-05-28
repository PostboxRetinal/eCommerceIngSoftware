import React, { useState, useEffect, useContext } from "react";
import './Tienda.scss';
import Hero from "../../Components/Hero/Hero";
import bann1 from "../../Components/Assets/Frame 2.png";
import bann2 from "../../Components/Assets/Frame 3.png";
import bann3 from "../../Components/Assets/Frame 4.png";
import produ from "../../Components/Assets/Products.png";
import { Link } from "react-router-dom";
import { itemContext } from "../../Context/itemsContext";
import axios from "axios";

const Tienda = () => {
    const { products } = useContext(itemContext);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [showPersonalizable, setShowPersonalizable] = useState(false);
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        obtenerCategorias();
    }, []);

    useEffect(() => {
        // Filtrar productos según la categoría seleccionada
        let filtered = products;
        if (selectedCategory) {
            filtered = filtered.filter(producto => producto.categoria === selectedCategory);
        }
        if (showPersonalizable) {
            filtered = filtered.filter(producto => producto.isPersonalizable);
        }
        setFilteredProducts(filtered);
    }, [selectedCategory, showPersonalizable, products]);

    const obtenerCategorias = async () => {
        try {
            const response = await axios.get('http://104.154.254.77:4000/api/categoria/categorias');
            setCategorias(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;
        setSelectedCategory(selectedCategory); // Establecer la categoría seleccionada
    };
    return(
        <div className="Tienda">
            <Hero/>
            <p className="titulo1">
                Algunos de Nuestros Productos
                <hr/>
            </p>
            <div className="articulosdes">
                <div className="proddes" >
                    {filteredProducts && filteredProducts.slice(0, 4).map(producto => (
                        <Link style={{ textDecoration: 'none' }} key={producto._id}  to={`/Preview/${producto._id}`}>
                            <div className="productosss">
                                <img src={producto.imagen} alt={producto.nombre} />
                                <div>
                                    <p>{producto.nombre} - ${producto.precioUnitario}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="banners">
                <img src={bann1} alt="" />
                <img src={bann2} alt="" />
                <img src={bann3} alt="" />
            </div>
            <p className="titulo2">
                Todos Nuestros Productos 
                <hr/>
            </p>
            <div className="filtros">
                <button onClick={() => setSelectedCategory(null)}>Todos</button>
                <select value={selectedCategory ? selectedCategory.nombre : ''} onChange={handleCategoryChange}>
                    <option value="">Seleccione una categoría</option>
                    {categorias.map(categoria => (
                         <option key={categoria._id} value={categoria._id}>{categoria.nombre}</option>
                    ))}
                </select>
                <button onClick={() => setShowPersonalizable(!showPersonalizable)}>
                    {showPersonalizable ? 'Mostrar Todos' : 'Personalizables'}
                </button>
            </div>
            <div className="articuin">
                <div className="prodeuni" style={{ textDecoration: 'none' }}>
                    {filteredProducts.map(producto => (
                        <Link key={producto._id} to={`/Preview/${producto._id}`}>
                            <div className="productosinte">
                                <img src={producto.imagen} alt={producto.nombre} />
                                <p>{producto.nombre} - ${producto.precioUnitario}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="producs">
                <img src={produ} alt="" />
            </div>
        </div>
    );
}

export default Tienda;
