import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";


import { Nav, Navbar, NavDropdown, Image } from "react-bootstrap";
import "./Header.css";

import { logout, getUserDetails} from "../../actions/userAction";
import { Link, useHistory } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const {userInfo} = useSelector((state) => state.userLogin);

  
  const {user} = useSelector((state) => state.userDetails);


  useEffect( () => {

    dispatch(getUserDetails(userInfo?.user_id));
    
  },[userInfo]);
  console.log(userInfo,'userinfo');
  console.log(user,"user");


  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Navbar collapseOnSelect expand="lg" fixed="top">
      <Navbar.Brand className="nav-cal" href="/">
        <Image width="80px" src="/logo.png" />
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto ">
          <Nav.Link className="nav-cal" href="/">HOME</Nav.Link>
          
          {userInfo ? (
            <>
            <Nav.Link className="nav-cal" href="/sell">SELL PRODUCT</Nav.Link>
            </>
          ):(
            <Nav.Link className="nav-cal">SHOP</Nav.Link>
          )}
         

          <Nav.Link className="nav-cal" href='/products'>BUYER VIEW</Nav.Link>

          <Nav.Link className="remove-space1">
            <div className="search">
              <div className="searchInputs">
                <input
                  type="text"
                  placeholder="Search"
                  style={{ width: "300px" }}
                />
                <div className="searchIcon"></div>
              </div>
            </div>
          </Nav.Link>

          <Nav.Link className="remove-space add-space cart nav-cal">
            <i className="fas fa-shopping-cart"></i>
            CART
          </Nav.Link>
          {userInfo ? (
            <>
         
              <Nav.Link className="nav-cal" onClick={logoutHandler}>
                LOGOUT
              </Nav.Link>
            </>
          ) : (
           
          <Nav.Link className="nav-cal" href="/login">
              
              LOGIN
            
             
           </Nav.Link>
         
               
            
             
         
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
