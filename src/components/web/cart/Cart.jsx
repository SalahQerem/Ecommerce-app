import React, { useContext, useEffect } from "react";
import "./cart.css";
import { CartContext } from "../context/Cart.jsx";
import { useQuery } from "react-query";
import Loader from "../../pages/Loader.jsx";
import CartItem from "../../pages/CartItem.jsx";
import { Link } from "react-router-dom";

function Cart() {
  const {
    getCartContext,
    clearCart,
    cart,
    cartTotal,
    calculateTotal,
  } = useContext(CartContext);

  const getCart = async () => {
    const res = await getCartContext();
    return res;
  };

  const clearMyCart = async () => {
    await clearCart();
  };

  const { isLoading } = useQuery("get_cart", getCart);

  useEffect(() => {
    calculateTotal();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="cart">
      <div className="container">
        <div className="row">
          <div className="cart-items">
            <div className="products" id="products">
              <div className="item">
                <div className="product-info">
                  <h2>Product</h2>
                </div>
                <div className="quantity">
                  <h2>Quantity</h2>
                </div>
                <div className="price">
                  <h2>Price</h2>
                </div>
                <div className="subtotal">
                  <h2>Subtotal</h2>
                </div>
              </div>
              {cart ? (
                cart?.map((product) => {
                  return (
                    <CartItem product={product} key={product.details._id} />
                  );
                })
              ) : (
                <h2>Your Cart is Empty</h2>
              )}
            </div>
            <div className="cart-summary">
              <h2>Cart summary</h2>
              <div className="summery-items">
                <div className="summary-item">
                  <div className="form-group">
                    <input type="radio" /> <label>Free shipping</label>
                  </div>
                  <span>$0.00</span>
                </div>
                <div className="summary-item">
                  <div className="form-group">
                    <input type="radio" /> <label>Express shipping</label>
                  </div>
                  <span>+$15.00</span>
                </div>
                <div className="summary-item">
                  <div className="form-group">
                    <input type="radio" /> <label>Pick Up</label>
                  </div>
                  <span>%21.00</span>
                </div>
                <div className="summary-footer">
                  <label>Subtotal</label>
                  <span>{`$${cartTotal}`}</span>
                </div>
                <div className="summary-footer">
                  <label className="total">Total</label>
                  <span>{`$${cartTotal}`}</span>
                </div>
                <div className="checkout">
                  <Link to={"/order"} className="btn btn-success w-100">
                    Checkout
                  </Link>
                  <button
                    className="btn btn-success mt-2"
                    onClick={clearMyCart}
                  >
                    Clear my Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
