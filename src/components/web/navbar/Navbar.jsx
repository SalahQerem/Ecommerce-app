import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './navbar.css'
import logo from '../../../assets/img/logo.png';
import { UserContext } from '../context/user.jsx';

function Navbar () {
  let {userToken, setUserToken, userData, setUserData, cartCount, setLoggedIn} = useContext(UserContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("userToken");
    setUserToken(null);
    setUserData(null);
    setLoggedIn(false)
    navigate("/");
  }

  return (
    <nav className="navbar navbar-expand-lg bg-success bg-gradient">
      <div className="container">
      <a className="text-white navbar-brand" href="#">
        <img src={logo} alt="logo" className='img-fluid logo'/>
      </a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav m-auto mb-2 mb-lg-0">
         
          <li className="nav-item">
            <Link className="nav-link" to={"/"}>Home</Link>
          </li>


          <li className="nav-item">
            <Link className="nav-link" to={"/categories"}>Categories</Link>
          </li>


          <li className="nav-item">
          <a className="nav-link" href="#">Products</a>
          </li> 
          {userToken ?<li className="nav-item">
          <Link className="nav-link" to={"/cart"}>Cart <span className='badge bg-white text-black ms-1'>{cartCount}</span></Link>
          </li> : <></>}
       
        </ul>
        <ul className="navbar-nav">
        <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          {userData != null ? userData.user.userName : 'Account'}
        </a>
        <ul className="dropdown-menu">
          {!userToken ? 
          <>
            <li><Link className="dropdown-item" to='/register'>Register</Link></li>
            <li><hr className="dropdown-divider" /></li>
            <li><Link className="dropdown-item" to='/login'>Login</Link></li>
          </> : 
          <>
            <li><Link className="dropdown-item" to={`/user/profile`}>Profile</Link></li>
            <li><hr className="dropdown-divider" /></li>
            <li><Link className="dropdown-item" onClick={logout}>Logout</Link></li>
          </>
          }
          
        </ul>
      </li>
        </ul>
     
      </div>
    </div>
  </nav>
  )
}

export default Navbar