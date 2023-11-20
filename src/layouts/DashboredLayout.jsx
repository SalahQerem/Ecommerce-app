import React from 'react'
import Navbar from '../components/dashbored/navbar/Navbar.jsx'
import Footer from '../components/dashbored/footer/Footer.jsx'
import { Outlet } from 'react-router-dom'

function dashboredLayout() {
  return (
    <>
     <Navbar />
     <Outlet />
     <Footer />
    </>
  )
}

export default dashboredLayout