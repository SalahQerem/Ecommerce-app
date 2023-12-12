import React, { useContext, useState } from "react";
import { CartContext } from "../web/context/Cart.jsx";
import { toast } from "react-toastify";

function CartItem({ product }) {
  let [itemQty, setItemQty] = useState(product.quantity);
  const { cart, setCart, removeItemContext, decraseQty, incraseQty } =
    useContext(CartContext);

  const removeFromCart = async (product_Id) => {
    const res = await removeItemContext(product_Id);
    if (res.message == "success") {
      setCart(
        cart.filter((product) => {
          return product.productId != product_Id;
        })
      );
    }
    return res;
  };

  const decrementQty = async (productId) => {
    if (itemQty <= 1) {
      toast.success("Quantity can't be less than 1", {
        position: "top-left",
        autoClose: true,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    const res = await decraseQty(productId);
    const newProduct = res.cart.products.filter((product) => {
      return product.productId == productId;
    });
    setItemQty(newProduct[0].quantity);
  };

  const incrementQty = async (productId) => {
    const res = await incraseQty(productId);
    const newProduct = res.cart.products.filter((product) => {
      return product.productId == productId;
    });
    setItemQty(newProduct[0].quantity);
  };

  return (
    <div className="item">
      <div className="product-info">
        <img
          src={product.details.mainImage.secure_url}
          alt="product image"
          className="img-fluid"
        />
        <div className="product-details">
          <h2>{product.details.name}</h2>
          <span>Color:black</span>
          <a href="#" onClick={() => removeFromCart(product.details._id)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={25}
              viewBox="0 0 24 25"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.29289 5.79289C5.68342 5.40237 6.31658 5.40237 6.70711 5.79289L12 11.0858L17.2929 5.79289C17.6834 5.40237 18.3166 5.40237 18.7071 5.79289C19.0976 6.18342 19.0976 6.81658 18.7071 7.20711L13.4142 12.5L18.7071 17.7929C19.0976 18.1834 19.0976 18.8166 18.7071 19.2071C18.3166 19.5976 17.6834 19.5976 17.2929 19.2071L12 13.9142L6.70711 19.2071C6.31658 19.5976 5.68342 19.5976 5.29289 19.2071C4.90237 18.8166 4.90237 18.1834 5.29289 17.7929L10.5858 12.5L5.29289 7.20711C4.90237 6.81658 4.90237 6.18342 5.29289 5.79289Z"
                fill="#6C7275"
              />
            </svg>
            remove
          </a>
        </div>
      </div>
      <div className="quantity">
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={17}
            viewBox="0 0 16 17"
            fill="none"
            onClick={() => {
              decrementQty(product.details._id);
            }}
          >
            <path
              d="M3.22852 8.5H12.5618"
              stroke="#121212"
              strokeWidth="0.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <span>{itemQty}</span>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={17}
            viewBox="0 0 16 17"
            fill="none"
            onClick={() => {
              incrementQty(product.details._id);
            }}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.37565 3.83333C8.37565 3.62622 8.20776 3.45833 8.00065 3.45833C7.79354 3.45833 7.62565 3.62622 7.62565 3.83333V8.125H3.33398C3.12688 8.125 2.95898 8.29289 2.95898 8.5C2.95898 8.7071 3.12688 8.875 3.33398 8.875H7.62565V13.1667C7.62565 13.3738 7.79354 13.5417 8.00065 13.5417C8.20776 13.5417 8.37565 13.3738 8.37565 13.1667V8.875H12.6673C12.8744 8.875 13.0423 8.7071 13.0423 8.5C13.0423 8.29289 12.8744 8.125 12.6673 8.125H8.37565V3.83333Z"
              fill="#121212"
            />
          </svg>
        </button>
      </div>
      <div className="price">${product.details.price}</div>
      <div className="subtotal">${itemQty * product.details.price}</div>
    </div>
  );
}

export default CartItem;
