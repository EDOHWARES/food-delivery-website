import React, { useState } from 'react';
import NavBar from './components/NavBar/NavBar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
import LoginPopUp from './components/LoginPopUp/LoginPopUp';

const App = () => {

  const [showLogin, setShowLogin] = useState(false);
  return (
    <section className='root'>
      {
        showLogin ? <LoginPopUp setShowLogin = {setShowLogin} /> : <></>
      }
      <div className='app'>
        <NavBar setShowLogin = {setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/place-order' element={<PlaceOrder />} />
        </Routes>
      </div>
      <Footer />
    </section>
  )
}

export default App
