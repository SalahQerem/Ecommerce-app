import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../pages/Loader.jsx";
import style from "./Products.module.css";
import { Rating } from "@mui/material";
import { UserContext } from "../context/user.jsx";
import { CartContext } from "../context/Cart.jsx";
import { toast } from "react-toastify";
import discountImg from "../../../assets/img/discountLogo.png";

function products() {
  const userToken = localStorage.getItem("userToken");
  let [products, setProducts] = useState([]);
  let [pages, setPages] = useState([]);
  let [numOfProducts, setNumOfProducts] = useState(0);
  let [productsNumberOptions, setProductsNumberOptions] = useState(4);
  let [isLoading, setIsLoading] = useState(true);
  const { addToCartContext } = useContext(CartContext);
  let {
    productsPageIndex,
    setProductsPageIndex,
    productsPerPage,
    setProductsPerPage,
  } = useContext(UserContext);

  const getProducts = async (page, num) => {
    try {
      setIsLoading(true);
      if (numOfProducts > 0 && page > Math.ceil(numOfProducts / num)) {
        page = Math.ceil(numOfProducts / num);
      }
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/products?page=${page}&limit=${num}`
      );
      setNumOfProducts(data.total);
      renderPages(Math.ceil(data.total / num));
      renderProductNumberOptions(data.total, num);
      setProducts(data.products);
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (productId) => {
    if (userToken) {
      const res = await addToCartContext(productId);
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

  const renderPages = (num) => {
    const render = [];
    for (let i = 0; i < num; i++) {
      render.push(
        <li className={`${style.pointer} page-item`} key={i}>
          <a
            className={`page-link text-success`}
            onClick={() => {
              getProducts(i + 1, productsPerPage);
            }}
          >
            {i + 1}
          </a>
        </li>
      );
    }
    setPages(render);
  };

  const renderProductNumberOptions = (num, page) => {
    const render = [];
    for (let i = 1; i <= num; i++) {
      if (i == page) {
        render.push(
          <option value={i} selected key={i}>
            {i}
          </option>
        );
      } else {
        render.push(
          <option value={i} key={i}>
            {i}
          </option>
        );
      }
    }
    setProductsNumberOptions(render);
  };

  const displayWithNumber = (num) => {
    setProductsPageIndex(productsPageIndex);
    setProductsPerPage(num);
  };

  useEffect(() => {
    getProducts(productsPageIndex, productsPerPage);
  }, [productsPageIndex, productsPerPage]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={`container mt-3`}>
      <div>
        <select
          name="productsPerPage"
          id="productsPerPage"
          className={`${style.select} form-select border border-success`}
          onChange={(e) => {
            displayWithNumber(e.target.value);
          }}
        >
          {productsNumberOptions}
        </select>
        <div>
          <form></form>
        </div>
      </div>
      <div className="row my-1 text-center w-100">
        {products.length ? (
          products.map((product) => (
            <div className={`col-lg-3`} key={product._id}>
              <div className={`${style.product} m-auto border p-3 my-4`}>
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
      <div className="position-relative py-5">
        <nav aria-label="Page navigation example" className={`${style.nav}`}>
          <ul className="pagination">
            <li className={`${style.pointer} page-item`}>
              <a
                className="page-link text-success"
                onClick={() => {
                  if (productsPageIndex > 1) {
                    setProductsPageIndex(productsPageIndex - 1);
                  }
                }}
              >
                Previous
              </a>
            </li>
            {pages}
            <li className={`${style.pointer} page-item`}>
              <a
                className="page-link text-success"
                onClick={() => {
                  if (productsPageIndex < pages.length) {
                    setProductsPageIndex(productsPageIndex + 1);
                  }
                }}
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default products;
