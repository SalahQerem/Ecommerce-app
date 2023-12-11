import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  let [userToken, setUserToken] = useState(null);
  let [userData, setUserData] = useState(null);
  let [cartCount, setCartCount] = useState(null);
  let [loading, setLoading] = useState(false);

  const getUserData = async () => {
    setLoading(true);
    if (userToken) {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/profile`,
        {
          headers: { Authorization: `Tariq__${userToken}` },
        }
      );
      setUserData(data);
    }
    setLoading(false)
  };

  const getCartItems = async () => {
    if(userToken){
      setLoading(true);
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
        headers: { Authorization: `Tariq__${userToken}` },
      });
      setCartCount(data.count);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
    getCartItems();
  }, [userToken]);

  return (
    <UserContext.Provider
      value={{
        userToken,
        setUserToken,
        userData,
        setUserData,
        cartCount,
        setCartCount,
        loading,
        setLoading
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
