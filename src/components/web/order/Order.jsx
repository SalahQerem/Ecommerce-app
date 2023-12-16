import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/Cart.jsx";
import { useQuery } from "react-query";
import Loader from "../../pages/Loader.jsx";

function Order() {
  const { getCartContext, cartTotal, calculateTotal } = useContext(CartContext);

  const getItems = async () => {
    const res = await getCartContext();
    return res;
  };

  const { data, isLoading } = useQuery("getOrder", getItems);

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
              {data ? (
                data?.products.map((product) => {
                  return (
                    <div className="item" key={product.details._id}>
                      <div className="product-info">
                        <img
                          src={product.details.mainImage.secure_url}
                          alt="product image"
                          className="img-fluid"
                        />
                        <div className="product-details">
                          <h2>{product.details.name}</h2>
                          <span>Color:black</span>
                        </div>
                      </div>
                      <div className="quantity">
                        <button></button>
                        <span>{product.quantity}</span>
                        <button></button>
                      </div>
                      <div className="price">${product.details.price}</div>
                      <div className="subtotal">
                        ${product.quantity * product.details.price}
                      </div>
                    </div>
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
                  <Link to={"/order/confirm"} className="btn btn-success w-100">
                    Confirm
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
