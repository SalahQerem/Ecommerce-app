import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Loader from "../../pages/Loader.jsx";
import style from "./Products.module.css";

function products() {
  let [products, setProducts] = useState([]);
  let [pages, setPages] = useState([]);
  let [isLoading, setIsLoading] = useState(true);

  const getProducts = async (page) => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/products?page=${page}&limit=3`
      );
      renderPages(Math.ceil(data.total / 3));
      setProducts(data.products);
      setIsLoading(false);
      return data;
    } catch (error) {
      console.log(error);
      setIsLoading(false);
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
              getProducts(i + 1);
            }}
          >
            {i + 1}
          </a>
        </li>
      );
    }
    setPages(render);
  };

  useEffect(() => {
    getProducts(1);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={`${style.products} container`}>
      <div className="row my-4 text-center w-100">
        {products.length ? (
          products.map((product) => (
            <div className="product col-lg-2" key={product._id}>
              <Link
                to={`/product/${product._id}`}
                className="text-decoration-none"
              >
                <img
                  src={product.mainImage.secure_url}
                  alt="product image"
                  className="img-fluid"
                />
                <h2 className="fs-5 text-black pt-2">{product.name}</h2>
              </Link>
            </div>
          ))
        ) : (
          <h2>No Products</h2>
        )}
      </div>
      <nav aria-label="Page navigation example" className={`${style.nav}`}>
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link text-success" href="#">
              Previous
            </a>
          </li>
          {pages}
          <li className="page-item">
            <a className="page-link text-success" href="#">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default products;
