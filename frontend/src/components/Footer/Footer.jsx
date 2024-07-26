import React from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="logo" />
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum quibusdam corrupti tempore, consequatur obcaecati maxime saepe explicabo necessitatibus labore ratione consequuntur eveniet incidunt, sint voluptatum odio ipsa numquam commodi vel!</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="facebook-icon" />
                <img src={assets.twitter_icon} alt="twitter-icon" />
                <img src={assets.linkedin_icon} alt="linkedin-icon" />
            </div>
        </div>
    
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>

        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>
                    +2347047126688
                </li>
                <li>
                    contact@tomatoe.com
                </li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024 &copy; Tomato.com - All Right Reserved
      </p>
    </div>
  )
}

export default Footer
