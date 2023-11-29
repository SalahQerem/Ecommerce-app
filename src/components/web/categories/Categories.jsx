import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../../pages/Loader.jsx";
import { useQuery } from "react-query";

function Categories() {

  const getCategories = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/categories`);
    return data;
  };

  const {data, isloading} = useQuery("wed_categories", getCategories);

  if (isloading) {
    return <Loader />;
  }

  return (
    <div className="row">
      {data?.categories.length ? (
        data?.categories.map((category) => (
          <div className="col-lg-4 text-center" key={category._id}>
            <img src={category.image.secure_url} alt="Product image" className="w-50"/>
            <h3>{category.name}</h3>
          </div>
        ))
      ) : (
        <h2>No category found</h2>
      )}
    </div>
  );
}

export default Categories;
