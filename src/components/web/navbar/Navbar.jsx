import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
      <a className="navbar-brand" href="#">T-shop</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav m-auto mb-2 mb-lg-0">
         
          <li className="nav-item">
            <a className="nav-link" href="#">Home</a>
          </li>


          <li className="nav-item">
            <a className="nav-link" href="#">Categories</a>
          </li>


          <li className="nav-item">
          <a className="nav-link" href="#">Products</a>
        </li>
       
       
        </ul>
        <ul className="navbar-nav">
        <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Dropdown
        </a>
        <ul className="dropdown-menu ">
          <li><Link className="dropdown-item" to='/register'>register</Link></li>
          <li><hr className="dropdown-divider" /></li>
          <li><a className="dropdown-item" href="#">login</a></li>
        </ul>
      </li>
        </ul>
     
      </div>
    </div>
  </nav>
  )
}

export default Navbar