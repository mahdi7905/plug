import React, {useContext} from 'react'
import { NavLink } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LogoutIcon from '@mui/icons-material/Logout';
import "./navbar.css"
import { AuthContext } from '../../context/authContext';
import useAuth from '../../hooks/useAuth';
import { CartContext } from '../../context/cartContext';
import { FavoriteContext } from '../../context/favoriteContext';
const Navbar = () => {
  const { user } = useContext(AuthContext);
  const {cartItems} = useContext(CartContext)
  const {favoriteItems} = useContext(FavoriteContext)
  const {Logout} = useAuth()
  return (
    <>
    <header className='navbar'>
      <h2>CapMan</h2>
      {
        user && user.role === "consumer"&& (
          <nav>
            <ul className='navLinkContainer'>
              <li className="navLink"><NavLink to='/'><HomeIcon sx={{width:"25px",height:"25px" }}/></NavLink></li>
              <li className="navLink">{favoriteItems.length > 0 && (<span className='badge'>{favoriteItems.length}</span>)}<NavLink to='/favorites'><FavoriteIcon sx={{width:"25px",height:"25px" }}/></NavLink></li>
              <li className="navLink"><NavLink to='/orders'><ShoppingBagIcon sx={{width:"25px",height:"25px" }}/></NavLink></li>
              <li className="navLink">{cartItems.length > 0 && (<span className='badge'>{cartItems.length}</span>)}<NavLink to='/cart'><ShoppingCartIcon sx={{width:"25px",height:"25px" }}/></NavLink></li>
            </ul>
        </nav>
        )
      }
      {
        user && (
          <div className='actionArea'>
            <span onClick={Logout} style={{cursor:"pointer"}}><LogoutIcon sx={{width:"25px",height:"25px" }}/></span>
            <span className='username'>{user.username[0].toUpperCase()}</span>
          </div>
        )
      }
      
    </header>

    <header className='navbarSmall'>
      <div className='inner-nav'>
        <h2>CapMan</h2>
        {
          user && (
            <div className='actionArea'>
              <span onClick={Logout} style={{cursor:"pointer"}}><LogoutIcon sx={{width:"25px",height:"25px" }}/></span>
              <span className='username'>{user.username[0].toUpperCase()}</span>
            </div>
          )
        }
      </div>
      {
        user && user.role === "consumer" && (
          <nav className='smallLinks'>
            <ul className='navLinkContainer'>
              <li className="navLink"><NavLink to='/'><HomeIcon sx={{width:"25px",height:"25px" }}/></NavLink></li>
              <li className="navLink">{favoriteItems.length > 0 && (<span className='badge'>{favoriteItems.length}</span>)}<NavLink to='/favorites'><FavoriteIcon sx={{width:"25px",height:"25px" }}/></NavLink></li>
              <li className="navLink"><NavLink to='/orders'><ShoppingBagIcon sx={{width:"25px",height:"25px" }}/></NavLink></li>
              <li className="navLink">{cartItems.length > 0 && (<span className='badge'>{cartItems.length}</span>)}<NavLink to='/cart'><ShoppingCartIcon sx={{width:"25px",height:"25px" }}/></NavLink></li>
            </ul>
        </nav>
        )
      }
      
    </header>
    </>
  )
}

export default Navbar