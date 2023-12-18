import React, { useContext } from "react";
import Input from "../../pages/Input.jsx";
import { useFormik } from "formik";
import { loginSchema } from "../validation/validation.js";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/user.jsx";
import Loader from "../../pages/Loader.jsx";
import style from '../../../assets/css/bgImage.module.css';

function Login() {
  let { setUserToken, loading } = useContext(UserContext);
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (user) => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/signin`,
      user
    );
    if (data.message == "success") {
      localStorage.setItem("userToken", data.token);
      setUserToken(data.token);
      formik.resetForm();
      toast.success("Login successful", {
        position: "top-left",
        autoClose: true,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/");
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: loginSchema,
  });

  const inputs = [
    {
      id: "email",
      type: "email",
      name: "email",
      title: "Email",
      value: formik.values.email,
    },
    {
      id: "password",
      type: "password",
      name: "password",
      title: "Password",
      value: formik.values.password,
    },
  ];

  const renderInputs = inputs.map((input, index) => (
    <Input
      id={input.id}
      type={input.type}
      name={input.name}
      title={input.title}
      key={index}
      errors={formik.errors}
      touched={formik.touched}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
    />
  ));
  if(loading){
    return <Loader />
  }


  return (
    <div className={`${style.mainBg}`}>
      <div className={`${style.overlay}`}>
      <div className="bg-success bg-gradient p-5 rounded-5">
        <h2 className="text-center">Login</h2>
        <form onSubmit={formik.handleSubmit}>
          {renderInputs}
          <div className="d-flex justify-content-between align-items-center">
            <button className="btn btn-light" disabled={!formik.isValid} type="submit">
              Login
            </button>
            <Link
              className="text-decoration-none text-white me-2"
              to={"/user/sendcode"}
            >
              Forget Password ?
            </Link>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
}

export default Login;
