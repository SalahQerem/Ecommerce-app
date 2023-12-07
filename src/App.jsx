import React, { useContext, useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { CartContextProvider } from './components/web/context/Cart.jsx';
import {router} from './layouts/routes.jsx'
import { UserContext } from './components/web/context/user.jsx';

function App() {

  let {setUserToken} = useContext(UserContext);

  useEffect(() => {
    if(localStorage.getItem('userToken') != null){
      setUserToken(localStorage.getItem('userToken'));
    }
  }, []);
  
  return (
    <CartContextProvider>
      <RouterProvider router={router}/>
    </CartContextProvider>
    
  )
}

export default App