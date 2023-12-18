import axios from "axios";
import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Loader from "../../pages/Loader.jsx";
import { CartContext } from "../context/Cart.jsx";
import style from "./product.module.css";
import { Rating } from "@mui/material";
import { useFormik } from "formik";
import { reviewSchema } from "../validation/validation.js";
import { toast } from "react-toastify";

function product() {
  const { productId } = useParams();
  const userToken = localStorage.getItem("userToken");
  const { addToCartContext } = useContext(CartContext);
  let [error, setError] = useState("");
  const initialValues = {
    rating: "0",
    comment: "",
  };

  const onSubmit = async (review) => {
    if (review.rate == "0") {
      setError("Rate is required");
      return;
    } else {
      setError("");
    }
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/products/${productId}/review`,
        review,
        {
          headers: { Authorization: `Tariq__${userToken}` },
        }
      );
      if(data.message == 'success') {
        formik.resetForm();
        toast.success("Thanks for your Review", {
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
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: reviewSchema,
  });

  const getProduct = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/products/${productId}`
    );
    return data.product;
  };
  const addToCart = async (productId) => {
    const res = await addToCartContext(productId);
    return res;
  };

  const { data, isLoading } = useQuery("Product-info", getProduct);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="images col-lg-3 text-center">
          <img
            src={data.mainImage.secure_url}
            alt="product image"
            className="img-fluid w-100"
          />
        </div>
        <div className="info col-lg-9 pt-4">
          <h2>{data.name}</h2>
          <p
            className={
              data.status == "Active"
                ? `${style.avaliable} fs-4`
                : "text-danger fs-4"
            }
          >
            {data.status}
          </p>
          <h3>{`${data.price}$`}</h3>
          <p className="fs-5">{data.description}</p>
          <div className="d-flex justify-content-between">
            <div className={`${style.rate} text-center mb-2 ms-5`}>
              <h3 className="fs-1">{data.ratingNumbers}</h3>
              <Rating
                name="read-only"
                value={Number(data.ratingNumbers)}
                readOnly
              />
            </div>
            <div className="d-flex align-items-center">
              <button
                className="btn btn-success me-5"
                onClick={() => {
                  addToCart(data._id);
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="subImages row my-5">
        {data.subImages.map((image) => (
          <div className="col-lg-4 text-center" key={image.public_id}>
            <img
              src={image.secure_url}
              alt="product image"
              className="img-fluid w-100"
            />
          </div>
        ))}
      </div>
      <div className={`addReview my-4`}>
        <h3>My Review</h3>
        <form onSubmit={formik.handleSubmit}>
          <div className="my-4">
            <h4>Rate our Product</h4>
            <Rating
              id="rating"
              name="rating"
              value={Number(formik.values.rating)}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div>
            <h4>Comment</h4>
            <textarea
              id="comment"
              name="comment"
              cols="60"
              rows="5"
              className={`${style.shadow} ${style.comment} border-0 fs-4 p-2`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.comment}
            ></textarea>
          </div>
          <div className="d-flex align-items-center">
            <button
              type="submit"
              className="btn btn-success mt-2"
              disabled={!formik.isValid}
            >
              Add Review
            </button>
            <p className="text-danger mb-0 ms-2">{error}</p>
          </div>
        </form>
      </div>
      {data.reviews.length ? (
        <div className="reviews">
          <h2 className="text-center">Customers Reviews</h2>
          <div className="row">
            {data.reviews.map((review) => {
              return (
                <div className="col-lg-4 p-4" key={review._id}>
                  <div className={`${style.shadow} p-4`}>
                    <div className="d-flex justify-content-center align-items-center">
                      <img
                        src={review.createdBy.image.secure_url}
                        alt="personal image"
                        className="w-25 rounded-circle"
                      />
                      <h3 className="fs-4 text-capitalize ms-4">
                        {review.createdBy.userName}
                      </h3>
                    </div>
                    <div className={`text-center my-3`}>
                      <h3 className="fs-1">{review.rating}</h3>
                      <Rating name="read-only" value={review.rating} readOnly />
                    </div>
                    <div className={`text-center`}>
                      <p className="fs-5">{review.comment}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default product;
