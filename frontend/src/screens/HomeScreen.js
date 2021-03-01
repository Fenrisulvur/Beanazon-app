import React from 'react'
import data from '../../../backend/data';
import Product from '../components/product';

export default function HomeScreen() {
    return (
        <div className="row center">
            {
            data.products.map((product) =>(
                <Product key={product._id} product={product}></Product>
            ))
            }
        </div>
    )
}
