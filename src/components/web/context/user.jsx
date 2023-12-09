import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  let [userToken, setUserToken] = useState(null);
  let [userData, setUserData] = useState(null);
  let [cartCount, setCartCount] = useState(null);

  const getUserData = async () => {
    if (userToken) {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/user/profile`, {
          headers: { Authorization: `Tariq__${userToken}` },
        });
        setUserData(data);
      } catch (e) {
        console.log(e);
      }
    }
  };
  
  const getCartItems = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
      headers: { Authorization: `Tariq__${userToken}` },
    });
    setCartCount(data.count);
  };

  useEffect(() => {
    getUserData();
    getCartItems();
  }, [userToken])

  return (
    <UserContext.Provider value={{ userToken, setUserToken, userData, setUserData, cartCount }}>
      {children}
    </UserContext.Provider>
  );
}
