import React from "react";
import "../register/register.css";
import Input from "../../pages/Input.jsx";
import { useFormik } from "formik";
import { resetPasswordSchema } from "../validation/validation.js";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
    code: "",
  };

  const onSubmit = async () => {
    const { data } = await axios.patch(
      `${import.meta.env.VITE_API_URL}/auth/forgotPassword`,
      {
        email: formik.values.email,
        password: formik.values.password,
        code: formik.values.code,
      }
    );
    if (data.message == "success") {
      toast.success("Your Password changed", {
        position: "top-left",
        autoClose: true,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/login");
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit,
    validationSchema: resetPasswordSchema,
  });

  const inputs = [
    {
      id: "email",
      type: "email",
      name: "email",
      title: "Email",
      value: "formik.values.email",
    },
    {
      id: "password",
      type: "password",
      name: "password",
      title: "Password",
      value: "formik.values.password",
    },
    {
      id: "code",
      type: "text",
      name: "code",
      title: "Code",
      value: "formik.values.code",
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
        <h2 className="text-center">Reset Password</h2>
        <form onSubmit={formik.handleSubmit}>
          {renderInputs}
          <div className="d-flex justify-content-between align-items-center">
            <button
              className="btn btn-primary"
              type="submit"
              disabled={!formik.isValid}
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
