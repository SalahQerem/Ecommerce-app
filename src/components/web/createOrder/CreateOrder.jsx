import React, { useContext } from "react";
import Input from "../../pages/Input.jsx";
import { useFormik } from "formik";
import { confirmOrderSchema } from "../validation/validation.js";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/Cart.jsx";
import style from "../../../assets/css/bgImage.module.css";

function CreateOrder() {
  const { clearCart } = useContext(CartContext);
  const userToken = localStorage.getItem("userToken");
  const navigate = useNavigate();
  const initialValues = {
    phone: "",
    address: "",
    couponName: "",
  };

  const onSubmit = async () => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/order`,
      {
        phone: formik.values.phone,
        address: formik.values.address,
        couponName: formik.values.couponName,
      },
      { headers: { Authorization: `Tariq__${userToken}` } }
    );
    if (data.message == "success") {
      toast.success("Your Order Confirmed", {
        position: "top-left",
        autoClose: true,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      clearCart();
      navigate("/");
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit,
    validationSchema: confirmOrderSchema,
  });

  const inputs = [
    {
      id: "phone",
      type: "number",
      name: "phone",
      title: "Phone",
      value: formik.values.phone,
    },
    {
      id: "address",
      type: "text",
      name: "address",
      title: "Address",
      value: formik.values.address,
    },
    {
      id: "couponName",
      type: "text",
      name: "couponName",
      title: "CouponName",
      value: formik.values.couponName,
    },
  ];

  const renderInputs = inputs.map((input, index) => {
    return (
      <Input
        key={index}
        id={input.name}
        name={input.name}
        type={input.name}
        title={input.title}
        errors={formik.errors}
        touched={formik.touched}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
    );
  });
  return (
    <div className={`${style.mainBg}`}>
      <div className={`${style.overlay}`}>
        <div className="bg-success bg-gradient p-5 rounded-5">
          <h2 className="text-center">Confirm Order</h2>
          <form onSubmit={formik.handleSubmit}>
            {renderInputs}
            <div className="d-flex justify-content-between align-items-center">
              <button
                className="btn btn-light"
                type="submit"
                disabled={!formik.isValid}
              >
                Confirm
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateOrder;
