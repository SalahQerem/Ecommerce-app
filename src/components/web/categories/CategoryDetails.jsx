import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom'
import Loader from '../../pages/Loader.jsx';
import style from './category.module.css'

function CategoryDatails() {

    const {categoryId} = useParams();

    const getCategoryProducts = async() => {
        const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/products/category/${categoryId}`);
        return data.products;
    }

    const {data, isLoading} = useQuery('categoryProducts', getCategoryProducts);

    if (isLoading) {
        return <Loader />
    }

  return (
    <div className={`${style.category} container`}>
        <div className='row mt-4 text-center'>
            {data.length ? data.map((product) => 
            <div className='product col-lg-2' key={product._id}>
                <Link to={`/product/${product._id}`} className='text-decoration-none'>
                    <img src={product.mainImage.secure_url} alt="product image" className='img-fluid'/>
                    <h2 className='fs-5 text-black pt-2'>{product.name}</h2>
                </Link>
            </div>
            ) : <h2>No Products</h2>}
        </div>
    </div>
  )
}

export default CategoryDatails