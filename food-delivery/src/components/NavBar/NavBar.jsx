import React, { useState } from 'react';
import './NavBar.css';
import { assets } from '../../assets/assets';

const NavBar = () => {

    const [menu, setMenu] = useState('home');

  return (
    <div className='navbar'>
      <img className='logo' src={assets.logo} alt="logo" />
      <nav>
        <ul className='navItems'>
            <li onClick={() => setMenu('home')} className={menu==='home' ? 'active': ''}>Home</li>
            <li onClick={() => setMenu('menu')} className={menu==='menu' ? 'active': ''}>Menu</li>
            <li onClick={() => setMenu('mobile-app')} className={menu==='mobile-app' ? 'active': ''}>Mobile-App</li>
            <li onClick={() => setMenu('contact-us')} className={menu==='contact-us' ? 'active' : ''}>Contact Us</li>
        </ul>
      </nav>
      <div className='navItems-right'>
        <img src={assets.search_icon} alt="search" />
        <div className='cart'>
            <img src={assets.basket_icon} alt="basket-icon" />
            <div className="dot"></div>
        </div>
        <button>Sign In</button>
      </div>
    </div>
  )
}

export default NavBar
