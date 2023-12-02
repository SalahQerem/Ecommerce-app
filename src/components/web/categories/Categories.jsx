import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../../pages/Loader.jsx";
import { useQuery } from "react-query";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay  } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './categories.css'
import { Link } from "react-router-dom";

function Categories() {

  const getCategories = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/categories`);
    return data;
  };

  const { data, isLoading } = useQuery("wed_categories", getCategories);
  if (isLoading) {
    return <Loader />;
  }

  return (
      <div className="container">
      <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={10}
      slidesPerView={6.5}
      navigation
      loop={true}
      autoplay={{
        delay:3000
      }}
      pagination={{ 
        clickable: true, 
        el:".swiper-pagination"
      }}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {data?.categories.length ? (data?.categories.map((category) => (
        <SwiperSlide key={category._id}>
          <Link to={`/products/category/${category._id}`}>
            <div className="category">
              <img src={category.image.secure_url} alt="Category image" />
              <h2 className="fs-5">{category.name}</h2>
            </div>
          </Link>
        </SwiperSlide>
      ))) : <h2>No Category founed</h2>}
    </Swiper>
    <div className="swiper-pagination"></div>
    </div>
  );
}

export default Categories;
