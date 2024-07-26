import React, { useState } from 'react';
import './LoginPopUp.css';
import { assets } from '../../assets/assets';

const LoginPopUp = ({setShowLogin}) => {

    const [currentState, setCurrentState] = useState('Sign Up');

  return (
    <div className='login-popup'>
      <form className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currentState}</h2>
            <img onClick={() => setShowLogin(false) } src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
            { currentState == "Sign Up" && <input type="text" placeholder='Your Name' required /> }
            <input type="email" placeholder='Youre Email' name="" id="" required />
            <input type="password" placeholder='Password' name="" id="" required />
        </div>
        <button>{currentState == 'Sign Up' ? 'Create Account' : 'Login'}</button>
        <div className="login-popup-condition">
            <input type="checkbox" name="" id="" required />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currentState == 'Login' && <p>Create a new account? <span onClick={() => setCurrentState('Sign Up')}>Click here</span></p>}
        {currentState == 'Sign Up' && <p>Already have an account? <span onClick={() => setCurrentState('Login')}>Login here</span></p>}
      </form>
    </div>
  )
}

export default LoginPopUp;
