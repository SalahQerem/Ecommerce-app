import React from 'react'
import Navbar from '../components/web/navbar/Navbar.jsx'
import Footer from '../components/web/footer/Footer.jsx'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
     <Navbar />
     <Outlet />
     <Footer />
    </>
  )
}
export default Layout