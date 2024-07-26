import React, { useContext, useState } from 'react';
import './NavBar.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const NavBar = ({setShowLogin}) => {

    const {cartItems} = useContext(StoreContext);

    const navigate = useNavigate();

    const [menu, setMenu] = useState('home');

    const routeMeTo = (loc) => {
      navigate(`/${loc}`);
    };

  return (
    <div className='navbar'>
      <img onClick={() => routeMeTo('')} className='logo' style={{cursor: 'pointer'}} src={assets.logo} alt="logo" />
      <nav>
        <ul className='navItems'>
            <Link to={'/'} onClick={() => setMenu('home')} className={menu==='home' ? 'active': ''}>Home</Link>
            <a href='#explore-menu' onClick={() => setMenu('menu')} className={menu==='menu' ? 'active': ''}>Menu</a>
            <a href='#app-download' onClick={() => setMenu('mobile-app')} className={menu==='mobile-app' ? 'active': ''}>Mobile-App</a>
            <a href='#footer' onClick={() => setMenu('contact-us')} className={menu==='contact-us' ? 'active' : ''}>Contact Us</a>
        </ul>
      </nav>
      <div className='navItems-right'>
        <img src={assets.search_icon} alt="search" />
        <div onClick={() => routeMeTo('cart')} className='cart-icon' style={{cursor: 'pointer'}}>
            <img src={assets.basket_icon} alt="basket-icon" />
            {Object.keys(cartItems).length > 0 && <div className="dot"></div>}
        </div>
        <button onClick={() => setShowLogin(true)}>Sign In</button>
      </div>
    </div>
  )
}

export default NavBar
