import axios from "axios";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { UserContext } from "./user.jsx";

export const CartContext = createContext(null);

export function CartContextProvider({ children }) {

  let {cartCount, setCartCount} = useContext(UserContext);

  const addToCartContext = async (productId) => {
    try {
      const userToken = localStorage.getItem("userToken");
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/cart`,
        { productId },
        { headers: { Authorization: `Tariq__${userToken}` } }
      );
      if (data.message == "success") {
        toast.success("Product Added", {
          position: "top-left",
          autoClose: true,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      setCartCount(cartCount++);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const getCartContext = async () => {
    try {
      const userToken = localStorage.getItem("userToken");
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
        headers: { Authorization: `Tariq__${userToken}` },
      });
      setCartCount(data.count);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const removeItemContext = async (productId) => {
    try {
      const userToken = localStorage.getItem("userToken");
      const {data} = await axios.patch(
        `${import.meta.env.VITE_API_URL}/cart/removeItem`,
        { productId },
        { headers: { Authorization: `Tariq__${userToken}` } }
      );
      setCartCount(cartCount--);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CartContext.Provider value={{ addToCartContext, getCartContext, removeItemContext }}>
      {children}
    </CartContext.Provider>
  );
}
