
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Tienda from './Pages/Tienda/Tienda';
import Productos from './Pages/Productos/Productos';
import Contactanos from './Pages/Contactanos/Contactanos';
import Login from './Pages/Login/Login';
import Carrito from './Pages/Carrito/Carrito';
import Footer from './Components/Footer/Footer';
import Registrar from './Pages/Registrarse/Registrer';
import Phombre from './Pages/Productos/P.hombre/Phombre';
import Pmujer from './Pages/Productos/P.mujer/Pmujer';
import PreviwProd from './Pages/PreviewProd/PreviwProd';

function App() {
  return (
    <div >
      <BrowserRouter>
        <Navbar/>
          <Routes>
            <Route path='/' element={<Tienda/>}/>
            <Route path='/Product' element={<Productos/>}/>
            <Route path='/Preview' element={<PreviwProd/>}>
              <Route path=':Productid' element={<PreviwProd/>}/>
            </Route>
            <Route path='/Contactanos' element={<Contactanos/>}/>
            <Route path='/Login' element={<Login/>}/>
            <Route path='/Carrito' element={<Carrito/>}/>
            <Route path='/Registrar' element={<Registrar/>}/>
            <Route path='/Phombre' element={<Phombre/>}/>
            <Route path='/Pmujer' element={<Pmujer/>}/>
          </Routes>
         <Footer/>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
