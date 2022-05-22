import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LoginComponent from './screens/Login';
import Register from './screens/Register';

import Header from './components/Header';
import Footer from './components/Footer';
const Layout = () => {
    return (
        <>
            <Router>
                <Header />
                <Switch>
                    <Route exact path="/" component={LoginComponent} />
                    <Route exact path="/register" component={Register} />
                </Switch>
                <Footer />
            </Router>
        </>
    )
}

export default Layout