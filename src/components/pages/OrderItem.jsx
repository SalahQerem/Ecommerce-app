import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

function OrderItem({ order, index }) {
  let [orderStatus, setOrderStatus] = useState(order.status);

  const cancelOrder = async (orderId) => {
    try {
      const userToken = localStorage.getItem("userToken");
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/order/cancel/${orderId}`,
        {},
        { headers: { Authorization: `Tariq__${userToken}` } }
      );
      if (data.message == "success") {
        toast.success("Order Canceled", {
          position: "top-left",
          autoClose: true,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setOrderStatus("cancelled");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <tr>
        <td>{index}</td>
        <td>{order.address}</td>
        <td>{order.products.length}</td>
        <td>{orderStatus}</td>
        <td>{order.createdAt}</td>
        <td>{order.couponName ? order.couponName : "without"}</td>
        <td>{order.finalPrice}</td>
        <td>
          <button
            onClick={() => {
              cancelOrder(order._id);
            }}
            className="btn btn-warning"
            disabled={orderStatus == 'cancelled' || orderStatus == 'deliverd'}
          >
            Cancel Order
          </button>
        </td>
      </tr>
    </React.Fragment>
  );
}

export default OrderItem;
