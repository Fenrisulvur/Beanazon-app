import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
            <div>
                <a className="brand" href="/">Beanazon</a>
            </div>
            <div>
                <a href="/cart">Cart</a>
                <a href="/signing">Sign in</a>
            </div>
        </header>
        <main>
          <Route path="/product/:id" component={ProductScreen}></Route>
          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer className="row center"> All beans reserved </footer>
    </div>
  </BrowserRouter>
  );
}

export default App;
