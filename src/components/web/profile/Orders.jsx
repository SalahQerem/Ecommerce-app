import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import Loader from "../../pages/Loader.jsx";
import style from "./profile.module.css";
import { toast } from "react-toastify";

function Orders() {
  const userToken = localStorage.getItem("userToken");
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/order`,
        { headers: { Authorization: `Tariq__${userToken}` } }
      );
      return data.orders;
    } catch (error) {
      console.log(error);
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/order/cancel/${orderId}`, {},
        { headers: { Authorization: `Tariq__${userToken}` } }
      );
      if(data.message == 'success'){
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { data, isLoading } = useQuery("getOrders", getOrders);
  console.log(data);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <table className={`${style.table} w-100 text-center`}>
        <thead>
          <tr>
            <th>#</th>
            <th>Address</th>
            <th>Products</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Coupon Name</th>
            <th>Total Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((order, index) => {
            return (
              <React.Fragment key={index}>
                <tr>
                  <td>{index}</td>
                  <td>{order.address}</td>
                  <td>{order.products.length}</td>
                  <td>{order.status}</td>
                  <td>{order.createdAt}</td>
                  <td>{order.couponName ? order.couponName : "without"}</td>
                  <td>{order.finalPrice}</td>
                  <td>
                    <button onClick={() => {cancelOrder(order._id)}} className="btn btn-danger">Cancel Order</button>
                  </td>
                </tr>
              </React.Fragment>
            );
          })}
          <tr>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
