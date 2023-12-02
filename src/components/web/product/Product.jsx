import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import Loader from '../../pages/Loader.jsx';
import ReactImageMagnify from 'react-image-magnify';
import './product.css'

function product() {
    const {productId} = useParams();

    const getProduct = async() => {
        const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/products/${productId}`);
        return data.product;
    }

    const {data, isLoading} = useQuery('Product info', getProduct);

    if(isLoading){
        return <Loader />;
    }
    console.log(data)
  return (
    <div className='container'>
        <div className='row mt-5'>
            <div className='images col-lg-3 text-center'>
                <ReactImageMagnify {...{
                    smallImage: {
                        alt: 'product image',
                        isFluidWidth: true,
                        src: `${data.mainImage.secure_url}`
                    },
                    largeImage: {
                        src: `${data.mainImage.secure_url}`,
                        width: 1200,
                        height: 1800
                    },
                    isHintEnabled:'ture',
                    enlargedImagePosition:'over'
                }} />
            </div>
            <div className='info col-lg-9'>
                <h2>{data.name}</h2>
                <p className={data.status == "Active" ? 'avaliable fs-4' : 'text-danger fs-4'}>{data.status}</p>
                <h3>{`${data.price}$`}</h3>
                <p className='fs-5'>{data.description}</p>
            </div>
        </div>
        <div className='row mt-5'>
        {data.subImages.map((image) => 
        <div className='col-lg-4 text-center'>
            <ReactImageMagnify {...{
                    smallImage: {
                        alt: 'product image',
                        isFluidWidth: true,
                        src: `${image.secure_url}`
                    },
                    largeImage: {
                        src: `${image.secure_url}`,
                        width: 1200,
                        height: 1800
                    },
                    isHintEnabled:'ture',
                    enlargedImagePosition:'over'
                }} />
        </div>)}
        </div>
    </div>
  )
}

export default product