import React from 'react'
import {Route, BrowserRouter, Switch} from 'react-router-dom';

import LoginComponent from './screens/Login';
import Register from './screens/Register';

import Header from './components/Header';
import Footer from './components/Footer';
const Layout = () => {
    return (
        <>
            <Header />
            <BrowserRouter>
            <Switch>
                    <Route exact path="/" component={LoginComponent} />
                    <Route exact path="/register" component={Register} />
                </Switch>
            </BrowserRouter>
            
               
               
            
            <Footer />
        </>
    )
}

export default Layout