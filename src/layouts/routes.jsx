import Categories from "../components/web/categories/Categories.jsx";
import Home from "../components/web/home/Home.jsx";
import Layout from "./Layout.jsx";
import DachboredCategories from "../components/dashbored/categories/Categories.jsx";
import DashboredHome from "../components/dashbored/home/Home.jsx";
import DashboardLayout from "./DashboredLayout.jsx";
import { createBrowserRouter } from "react-router-dom";
import Register from "../components/web/register/Register.jsx";


export const router = createBrowserRouter([
    {
      path:'/',
      element: <Layout />,
      children:[
        {
          path: 'home',
          element: <Home />
        },
        {
          path: 'categories',
          element: <Categories/>
        },
        {
          path: 'register',
          element: <Register/>
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