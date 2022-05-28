import React from 'react'
import {Route, BrowserRouter, Switch, Router} from 'react-router-dom';

import LoginComponent from './screens/Login';
import Register from './screens/Register';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './screens/HomePage';
import SellProduct from './screens/SellProduct';
const Layout = () => {
    return (
        <>
            <Header />
            <BrowserRouter>
            
            <Switch>
                    <Route exact path="/login" component={LoginComponent} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/sell" component={SellProduct} />
                    <Route exact path="/" component={Home} />
                </Switch>
        
          
            </BrowserRouter>
            
               
               
            
            <Footer />
        </>
    )
}

export default Layout