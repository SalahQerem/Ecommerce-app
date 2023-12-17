import axios from "axios";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Loader from "../../pages/Loader.jsx";
import { CartContext } from "../context/Cart.jsx";
import style from "./product.module.css";
import { Rating } from "@mui/material";

function product() {
  const { productId } = useParams();
  const { addToCartContext } = useContext(CartContext);

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
  console.log(data);
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
              <Rating name="read-only" value={data.ratingNumbers} readOnly />
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
      {data.reviews.length ? (
        <div className="reviews">
          <h2 className="text-center">Customers Reviews</h2>
          <div>
            {data.reviews.map((review) => {
              return (
                <div
                  className={`${style.review} row p-4 my-5`}
                  key={review._id}
                >
                  <div className={`col-lg-5 text-center`}>
                    <h3 className="fs-1">{review.rating}</h3>
                    <Rating name="read-only" value={review.rating} readOnly />
                  </div>
                  <div className={`col-lg-7 d-flex align-items-center`}>
                    <p className="fs-5">{review.comment}</p>
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
