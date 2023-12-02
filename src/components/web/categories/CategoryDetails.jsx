import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom'
import Loader from '../../pages/Loader.jsx';
import './category.css'

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
    <div className='container'>
        <div className='row products'>
            {data.length ? data.map((product) => 
            <div className='product col-lg-2' key={product._id}>
                <Link to={`/product/${product._id}`}>
                    <img src={product.mainImage.secure_url} alt="product image" />
                    <h2 className='fs-5'>{product.name}</h2>
                </Link>
            </div>
            ) : <h2>No Products</h2>}
        </div>
    </div>
  )
}

export default CategoryDatails