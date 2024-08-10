import React, { useContext, useState } from 'react';
import './NavBar.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const NavBar = ({setShowLogin}) => {

    const {cartItems, token, setToken} = useContext(StoreContext);

    const navigate = useNavigate();

    const [menu, setMenu] = useState('home');

    const routeMeTo = (loc) => {
      navigate(`/${loc}`);
    };

    const logout = () => {
      localStorage.removeItem('token');
      setToken('');
      routeMeTo('');
    }

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
        {
          !token ? 
            <button onClick={() => setShowLogin(true)}>Sign In</button>
          :
            <div className='navbar-profile'>
              <img src={assets.profile_icon} alt="profile-icon" />
              <ul className='nav-profile-dropdown'>
                <li><img src={assets.bag_icon} alt="bag-icon" />Orders</li>
                <hr />
                <li onClick={logout}><img src={assets.logout_icon} alt="logout-icon" />Logout</li>
              </ul>
            </div>
        }
      </div>
    </div>
  )
}

export default NavBar
