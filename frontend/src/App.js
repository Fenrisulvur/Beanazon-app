import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import { useSelector } from 'react-redux';
import CompleteScreen from './screens/CompleteScreen';
import AboutScreen from './screens/AboutScreen';

function App() {

  const cart = useSelector( state => state.cart);
  const { cartItems } = cart;
  const [scrollPosition, setScrollPosition] = useState(0);
  
  const topFunction = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  
  const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
  };

  useEffect(() => {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
  }, []);
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
            <div className="row">
                <Link className="brand" to="/">Beanazon</Link>
                <img src="/images/bean.png" className="small-logo" alt="logo"></img>
            </div>
            <div className="row">
                <Link className="" to="/cart">Cart
                  {cartItems.length > 0 && (<span className="badge">{cartItems.length}</span>)}
                </Link>
                <Link to="/about">About</Link>
            </div>
        </header>
        <main>
          <Route path="/about" component={AboutScreen}></Route>
          <Route path="/orderconfirmation" component={CompleteScreen}></Route>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen}></Route>
          <Route path="/" component={HomeScreen} exact></Route>
          { (scrollPosition > 20 || scrollPosition > 20) ? 
            (
              <span className="row center"><button className="card max-width" onClick={() => topFunction()}  title="Go to top">Top</button></span> 
            ) : <span></span>
          }
          
        </main>
        
        <footer className="row center"> 
          <div><p >All beans reserved</p></div> 
        </footer>
    </div>
  </BrowserRouter>
  );
}

export default App;
