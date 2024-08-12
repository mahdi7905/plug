import React, {useState} from 'react'

import PersonIcon from '@mui/icons-material/Person';
import KeyIcon from '@mui/icons-material/Key';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import './auth.css'
import useAuth from '../../hooks/useAuth'

const Auth = () => {
  
  const {Login, Register, authError, setAuthError} = useAuth()
  const [signup, setSignup] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showPassConfirm, setShowPassConfirm] = useState(false);
  
  const [authData, setAuthData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    role: "consumer",
  });
  const handleAuthToggle = () => {
    setAuthData({
      username: "",
      password: "",
      confirmPassword: "",
      role: "consumer",
    });
    setAuthError({...authError, username: null, password: null})
    setSignup((val) => !val);
    setShowPass(false);
  };
  const handleLogin = () => {
    Login(authData)
  }
 
  const handleRegister = () => {
    if (authData.password === authData.confirmPassword){
      Register(authData)
      // console.log(formData)
    }
    
    if (authData.password !== authData.confirmPassword){
      setAuthError({...authError, password: "Passwords do not match"})
    }
    
  }
  return (
    <div className='auth-page'>
      <div className="auth-card">
        {/* Login */}
        {
          !signup && 
            <div className="auth-form">
              <p className="auth-header">Login</p>
              <span className="error-message">{authError.username}</span>
              <div className={`${authError.username? 'input-wrapper form-error': 'input-wrapper'}`}>
                <PersonIcon style={{color:`${authError.username ? 'var(--favorite)' : 'var(--btn-secondary)'}`}}/>
                <input 
                value={authData.username}
                onChange={(e) => {
                  setAuthData({ ...authData, username: e.target.value })
                    setAuthError({...authError, username: null})
                }} 
                type="text" 
                placeholder="Username"
                className='auth-form-input'
                />
              </div>
                <span className="error-message">{authError.password}</span>
                <div className={`${authError.password? 'input-wrapper form-error': 'input-wrapper'}`}>
                  <div className="show-pass">
                    <VisibilityIcon className={`${showPass ? 'off' : 'on'}`} style={{color: 'var(--btn-primary)'}} onClick={()=>setShowPass(true)}/>
                    <VisibilityOffIcon className={`${showPass ? 'on' : 'off'}`} style={{color: 'var(--btn-primary)'}} onClick={()=>setShowPass(false)}/>
                  </div>
                  <KeyIcon style={{color:`${authError.password ? 'var(--favorite)' : 'var(--btn-secondary)'}`}}/>
                  <input 
                value={authData.password}
                onChange={(e) => {
                  setAuthData({ ...authData, password: e.target.value })
                    setAuthError({...authError, password: null})
                }}
                type={showPass? 'text' : 'password'}
                placeholder="Password"
                className='auth-form-input'
                />
                </div>
              
              <button onClick={handleLogin} className='auth-button'>Login</button>
              <div className="auth-toggle-section">
                <p className="toggle-query">Don't have account yet? <span onClick={handleAuthToggle} className="toggler">Register</span></p>
              </div>
            </div>
          
        }
        {/* Register */}

         {
           signup && 
           
             <div className="auth-form">
              <p className="auth-header">Register</p>
              <span className="error-message">{authError.username}</span>
              <div className={`${authError.username? 'input-wrapper form-error': 'input-wrapper'}`}>
                <PersonIcon style={{color:`${authError.username ? 'var(--favorite)' : 'var(--btn-secondary)'}`}}/>
                <input 
                  value={authData.username}
                  onChange={(e) => {
                  setAuthData({ ...authData, username: e.target.value })
                    setAuthError({...authError, username: null})
                }} 
                  type="text" 
                  placeholder='Username' 
                  className='auth-form-input'
                  />
              </div>
              <span className="error-message">{authError.password}</span>
              <div className={`${authError.password? 'input-wrapper form-error': 'input-wrapper'}`}>
                <div className="show-pass">
                  <VisibilityIcon className={`${showPass ? 'off' : 'on'}`} style={{color: 'var(--btn-primary)'}} onClick={()=>setShowPass(true)}/>
                  <VisibilityOffIcon className={`${showPass ? 'on' : 'off'}`} style={{color: 'var(--btn-primary)'}} onClick={()=>setShowPass(false)}/>
                </div>
                  <LockIcon style={{color:`${authError.password ? 'var(--favorite)' : 'var(--btn-secondary)'}`}}/>
                <input 
                  value={authData.password}
                  onChange={(e) => {
                  setAuthData({ ...authData, password: e.target.value })
                    setAuthError({...authError, password: null})
                }} 
                  type={showPass? 'text' : 'password'}
                  placeholder='Password' 
                  className='auth-form-input'
                  />
              </div>
                <div className={`${authError.password? 'input-wrapper form-error': 'input-wrapper'}`}>
                  <div className="show-pass">
                    <VisibilityIcon className={`${showPassConfirm ? 'off' : 'on'}`} style={{color: 'var(--btn-primary)'}} onClick={()=>setShowPassConfirm(true)}/>
                    <VisibilityOffIcon className={`${showPassConfirm ? 'on' : 'off'}`} style={{color: 'var(--btn-primary)'}} onClick={()=>setShowPassConfirm(false)}/>
                  </div>
                  <LockIcon style={{color:`${authError.password ? 'var(--favorite)' : 'var(--btn-secondary)'}`}}/>
              <input 
                value={authData.confirmPassword}
                onChange={(e) => {
                  setAuthData({ ...authData, confirmPassword: e.target.value })
                    setAuthError({...authError, confirmPassword: null})
                }} 
                type={showPassConfirm? 'text' : 'password'}
                placeholder='Confirm password' 
                className='auth-form-input'
                />
                </div>
              <button onClick={handleRegister} className='auth-button'>Register</button>
              <div className="auth-toggle-section">
                <p className="toggle-query">Already have an account? <span onClick={handleAuthToggle} className="toggler">Login</span></p>
              </div>
            </div> 
        }
      </div>
    </div>
  )
}

export default Auth