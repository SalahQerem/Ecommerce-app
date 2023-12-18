import React from "react";
import Input from "../../pages/Input.jsx";
import { useFormik } from "formik";
import { registerSchema } from "../validation/validation.js";
import axios from "axios";
import { toast } from "react-toastify";
import style from "../../../assets/css/bgImage.module.css";

function Register() {
  const initialValues = {
    userName: "",
    email: "",
    password: "",
    image: "",
  };

  const onSubmit = async (user) => {
    const formData = new FormData();
    formData.append("userName", user.userName);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("image", user.image);
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/signup`,
      formData
    );
    if (data.message == "success") {
      formik.resetForm();
      toast.success("Account created successfully, please varify your email", {
        position: "top-left",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: registerSchema,
  });

  const handleImageChange = (event) => {
    formik.setFieldValue("image", event.target.files[0]);
  };

  const inputs = [
    {
      id: "userName",
      type: "text",
      name: "userName",
      title: "Username",
      value: formik.values.userName,
    },
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
    {
      id: "image",
      type: "file",
      name: "image",
      title: "user image",
      onChange: handleImageChange,
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
      onChange={input.onChange || formik.handleChange}
      onBlur={formik.handleBlur}
    />
  ));

  return (
    <div className={`${style.mainBg}`}>
      <div className={`${style.overlay}`}>
        <div className="bg-success bg-gradient p-5 rounded-5">
          <h2 className="text-center">Create Account</h2>
          <form onSubmit={formik.handleSubmit} encType="multipart/from-data">
            {renderInputs}
            <button className="btn btn-light" disabled={!formik.isValid}>
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
