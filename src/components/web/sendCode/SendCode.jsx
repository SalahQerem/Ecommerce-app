import React from "react";
import "../register/register.css";
import Input from "../../pages/Input.jsx";
import { useFormik } from "formik";
import { sendCodeSchema } from "../validation/validation.js";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function SendCode() {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
  };

  const onSubmit = async () => {
    const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/auth/sendcode`,{email: formik.values.email});
    if ((data.message = "success")) {
      toast.success("Please check your Email", {
        position: "top-left",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/user/resetpassword");
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit,
    validationSchema: sendCodeSchema,
  });

  const inputs = [
    {
      id: "email",
      type: "email",
      name: "email",
      title: "Email",
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
    <div className="content container d-flex align-items-center justify-content-center">
      <div className="bg-primary-subtle w-50 p-5 rounded-5">
        <h2 className="text-center">Send Code</h2>
        <form onSubmit={formik.handleSubmit}>
          {renderInputs}
          <div className="d-flex justify-content-between align-items-center">
            <button className="btn btn-primary" type="submit" disabled={!formik.isValid}>
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SendCode;
