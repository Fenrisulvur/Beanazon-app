import React, { useEffect } from 'react'
import { addToCart, removeFromCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import MessageBox from '../components/MessageBox';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function CartScreen(props) {
    const productId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split('=')[1]) : 1;
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
    const dispatch = useDispatch();
    useEffect(() =>{
        if(productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);

    const removeFromCartHander = (id) =>{
        dispatch(removeFromCart(id));
    }
    

    const checkoutHandler = () =>{
        //props.history.push('/signin?redirct=shipping');
        var currentdate = new Date(); 

        var dateStringLegible = "" + currentdate.getDate() + "/"
                        + (currentdate.getMonth()+1)  + "/" 
                        + currentdate.getFullYear() + "@"  
                        + currentdate.getHours() + ":"  
                        + currentdate.getMinutes() + ":" 
                        + currentdate.getMinutes()

        

        const orderInfo = {
            orderId: Date.parse(currentdate),
            total: (cartItems.reduce((a,c) => a + c.price * c.qty, 0) + cartItems.reduce((a,c) => a + c.price * c.qty, 0)* .06).toFixed(2),
            dateOfPurchase: dateStringLegible,
            purchasedItems: cartItems,
        }

        axios.post('/api/create', orderInfo)
        .then(() => { cartItems.map(x => (removeFromCartHander(x.product))); props.history.push(`/orderconfirmation`); } )
        .catch(err => {
          console.error(err);
        });
    }

    return (
        <div className="row top">
            <div className="col-2">
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? 
                    <MessageBox> Cart is empty. <Link to="/">Return home</Link></MessageBox> :
                    (
                        <ul>
                            {
                                cartItems.map((item) => (
                                    <li key={item.product}>
                                        <div className="row">
                                            <img src={item.image} alt={item.name} className="small"></img>
                                        
                                            <div className="min-30">
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </div>
                                            <div>
                                                <select value={item.qty} onChange={e => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                                    {
                                                        [...Array(item.countInStock).keys()].map( x => (
                                                            <option key={x+1} value={x+1}>{x+1}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                            <div>${item.price}</div>
                                            <div>
                                                <button type="button" onClick={() => removeFromCartHander(item.product)}>Delete</button>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    )
                }
            </div>
            <div className="col-1">
                <div className="card card-body">
                    <ul>
                        <li>
                            <h2>
                                <p>Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items): ${cartItems.reduce((a,c) => a + c.price * c.qty, 0).toFixed(2)}</p>
                                <p>Sales tax: ${(cartItems.reduce((a,c) => a + c.price * c.qty, 0)* .06).toFixed(2)}</p>
                                <p>Total: ${(cartItems.reduce((a,c) => a + c.price * c.qty, 0) + cartItems.reduce((a,c) => a + c.price * c.qty, 0)* .06).toFixed(2)}</p>
                            </h2>
                        </li>
                        <li>
                            <button type="button" onClick={checkoutHandler} className="primary block" disabled={cartItems.length === 0}>Checkout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
