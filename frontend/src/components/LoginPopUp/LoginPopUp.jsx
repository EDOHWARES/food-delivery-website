import React, { useContext, useState } from 'react';
import './LoginPopUp.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const LoginPopUp = ({setShowLogin}) => {

    const {setToken, url} = useContext(StoreContext);

    const [currentState, setCurrentState] = useState('Sign Up');
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
    });

    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;

      setFormData((prev) => {
        return {...prev, [name]: value};
      });
    };

    const onLogin = async (e) => {
      e.preventDefault();
      
      let newUrl = url;
      if (currentState == 'Login') {
        newUrl += '/api/user/login';
        const resp = await axios.post(newUrl, formData);
        if (resp.data.success) {
          setToken(resp.data.token);
          localStorage.setItem('token', resp.data.token);
          setShowLogin(false);
        } else {
          alert(resp.data.message);
        };
      } else {
        newUrl += '/api/user/register';
        const resp = await axios.post(newUrl, formData);
        if (resp.data.success) {
          setCurrentState('Login')
        } else {
          alert(resp.data.message);
        };
      };
    }

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currentState}</h2>
            <img onClick={() => setShowLogin(false) } src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
            { currentState == "Sign Up" && <input onChange={handleChange} value={formData.name} type="text" name='name' placeholder='Your Name' required /> }
            <input onChange={handleChange} value={formData.email} type="email" name='email' id='email' placeholder='Your Email' required />
            <input onChange={handleChange} value={formData.password} type="password" placeholder='Password' name="password" id="password" required />
        </div>
        <button type='submit'>{currentState == 'Sign Up' ? 'Create Account' : 'Login'}</button>
        <div className="login-popup-condition">
            <input type="checkbox" name="agree" required />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currentState == 'Login' && <p>Create a new account? <span onClick={() => setCurrentState('Sign Up')}>Click here</span></p>}
        {currentState == 'Sign Up' && <p>Already have an account? <span onClick={() => setCurrentState('Login')}>Login here</span></p>}
      </form>
    </div>
  )
}

export default LoginPopUp;
