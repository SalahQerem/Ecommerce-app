import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/Cart.jsx";
import { useQuery } from "react-query";
import Loader from "../../pages/Loader.jsx";
import OrderItem from "../../pages/OrderItem.jsx";

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
                    <OrderItem product={product} key={product.details._id} />
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
                  <Link to={"/order/confirm"} className="btn btn-primary w-100">
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
