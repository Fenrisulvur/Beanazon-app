import React, { useEffect, useState } from 'react'
import Product from '../components/product';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import { useSelector,useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';

export default function HomeScreen() {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, error, products }= productList
    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    const [search, setSearch] = useState('');
    const [searching, setSearching] = useState(false);
  
    const searchInput = (txt) => {
      if(txt === '') {
        setSearch(txt);
        setSearching(false)
      } else {
        setSearch(txt);
        setSearching(true)
      }
      
    }



                
    return (
        <div>
            <div className="row center">
                <input type="text" className="searchheader" onChange={e => searchInput(e.target.value)} placeholder="Search term"></input>
            </div>
            {loading? <LoadingBox></LoadingBox> : error?<MessageBox variant="error">{error}</MessageBox>:  
                <div className="row center">
                    { ///state.cartItems.filter((x) => x.product !== action.payload)
                    searching? products.filter((x) => x.name.toLowerCase().search(search.toLowerCase()) !==-1).map((product) =>(
                        <Product key={product._id} product={product}></Product>
                    ))
                    : 
                    products.map((product) =>(
                        <Product key={product._id} product={product}></Product>
                    ))
                    }
                </div>
            }

          
        </div>
    )
}
