import React, { useEffect, useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import Categories from "./components/web/categories/Categories.jsx";
import Home from "./components/web/home/Home.jsx";
import Layout from "./layouts/Layout.jsx";
import DachboredCategories from "./components/dashbored/categories/Categories.jsx";
import DashboredHome from "./components/dashbored/home/Home.jsx";
import DashboardLayout from "./layouts/DashboredLayout.jsx";
import { createBrowserRouter } from "react-router-dom";
import Register from "./components/web/register/Register.jsx";
import Login from "./components/web/login/Login.jsx";
import { jwtDecode } from 'jwt-decode';
import CategoryDatails from './components/web/categories/CategoryDetails.jsx';
import Product from './components/web/product/Product.jsx';

function App() {

  const [user, setUser] = useState(null);

  const saveCurrentUser = () => {
    const token = localStorage.getItem("userToken");
    const decoded = jwtDecode(token);
    setUser(decoded);
  }

  useEffect(() => {
    if(localStorage.getItem("userToken")){
      saveCurrentUser();
    }
  }, []);

  const router = createBrowserRouter([
    {
      path:'/',
      element: <Layout user={user}/>,
      children:[
        {
          index:true,
          element: <Home />
        },
        {
          path: 'categories',
          element: <Categories/>,
        },
        {
          path: 'products/category/:categoryId',
          element: <CategoryDatails />
        },
        {
          path: 'product/:productId',
          element: <Product />
        },
        {
          path: 'register',
          element: <Register/>
        },
        {
          path: 'login',
          element: <Login saveCurrentUser={saveCurrentUser}/>
        },
        {
          path:'*',
          element:<h2>Page not found --web</h2>
        }
      ]
    },
    {
      path: 'dashbored',
      element: <DashboardLayout />,
      children: [
        {
          path:'home',
          element: <DashboredHome />
        },
        {
          path:'categories',
          element: <DachboredCategories />
        },
        {
          path: '*',
          element: <h2>Page not found --admin</h2>
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router}/>
  )
}

export default App