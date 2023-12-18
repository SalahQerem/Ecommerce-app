import React from "react";
import Input from "../../pages/Input.jsx";
import { useFormik } from "formik";
import { sendCodeSchema } from "../validation/validation.js";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import style from "../../../assets/css/bgImage.module.css";

function SendCode() {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
  };

  const onSubmit = async (email) => {
    const { data } = await axios.patch(
      `${import.meta.env.VITE_API_URL}/auth/sendcode`,
      email,
    );
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
    <div className={`${style.mainBg}`}>
      <div className={`${style.overlay}`}>
        <div className="bg-success bg-gradient p-5 rounded-5">
          <h2 className="text-center">Send Code</h2>
          <form onSubmit={formik.handleSubmit}>
            {renderInputs}
            <div className="d-flex justify-content-between align-items-center">
              <button
                className="btn btn-light"
                type="submit"
                disabled={!formik.isValid}
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SendCode;
