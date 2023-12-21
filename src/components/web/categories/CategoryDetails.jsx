import axios from "axios";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import Loader from "../../pages/Loader.jsx";
import style from "./category.module.css";
import { Rating } from "@mui/material";
import { toast } from "react-toastify";
import discountImg from "../../../assets/img/discountLogo.png";
import { CartContext } from "../context/Cart.jsx";

function CategoryDatails() {
  const { categoryId } = useParams();
  const userToken = localStorage.getItem("userToken");
  const { addToCartContext } = useContext(CartContext);

  const getCategoryProducts = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/products/category/${categoryId}`
    );
    return data.products;
  };

  const addToCart = async (productId) => {
    if (userToken) {
      const res = await addToCartContext(productId);
      console.log(res);
      return res;
    } else {
      toast.success("You must have an Account", {
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
  };

  const { data, isLoading } = useQuery("categoryProducts", getCategoryProducts);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={`${style.category} container`}>
      <div className="row mt-4 text-center">
        {data.length ? (
          data.map((product) => (
            <div className={`col-lg-3`} key={product._id}>
              <div className={`${style.product} m-auto border p-3`}>
                <div className={``}>
                  <Link
                    to={`/product/${product._id}`}
                    className="text-decoration-none"
                  >
                    <div className={`${style.img}`}>
                      <img
                        src={product.mainImage.secure_url}
                        alt="product image"
                        className="img-fluid w-75"
                      />
                    </div>

                    <h2 className="fs-5 text-black pt-2">{product.name}</h2>
                  </Link>
                </div>
                <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
                  <button
                    onClick={() => {
                      addToCart(product._id);
                    }}
                    className="btn btn-success px-3"
                  >
                    {" "}
                    +{" "}
                  </button>
                  <Rating
                    name="half-rating-read"
                    defaultValue={Number(product.avgRating)}
                    precision={0.5}
                    readOnly
                  />
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="m-0 fs-4 w-25 ">{product.finalPrice}$</p>
                  <p className="m-0 fs-5 w-25 ">{product.stock} in Stock</p>
                </div>
                {product.discount ? (
                  <img src={discountImg} className={`${style.discountImg}`} />
                ) : (
                  ""
                )}
              </div>
            </div>
          ))
        ) : (
          <h2>No Products</h2>
        )}
      </div>
    </div>
  );
}

export default CategoryDatails;
