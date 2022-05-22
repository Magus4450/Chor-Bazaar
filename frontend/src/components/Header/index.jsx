import React from 'react';
// import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'

import { Nav, Navbar, NavDropdown, Image } from 'react-bootstrap';
import './Header.css'

// import { logout } from './../../actions/userActions'

const Header = () => {

    // const dispatch = useDispatch()

    // const userLogin = useSelector(state => state.userLogin)
    // const { userInfo } = userLogin

    // const logoutHandler = () => {
    //     dispatch(logout())
    // }

    return (
        <Navbar collapseOnSelect expand="lg" fixed="top">
        
                <Navbar.Brand className="nav-cal" >
                    <Image width="80px"src="/logo.png" />
                </Navbar.Brand>
            
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto ">
                    
                        <Nav.Link className="nav-cal">HOME</Nav.Link>
       
                        <Nav.Link className="nav-cal">SHOP</Nav.Link>
                   
                        <Nav.Link className="nav-cal">DEALS</Nav.Link>
                
                        <Nav.Link className="remove-space1">
                        <div className="search">
      <div className="searchInputs" >
        <input
          type="text"
          placeholder="Search"
        style={{width: '300px'}}
        />
        <div className="searchIcon">

    
        
        </div>
      </div>
      </div>
                        </Nav.Link>
          
                
                  
                
                        <Nav.Link className="remove-space add-space cart nav-cal">
                            <i className="fas fa-shopping-cart"></i>
                            CART
                        </Nav.Link>
                        <Nav.Link className="nav-cal">LOGIN</Nav.Link>
              
                           
            
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header
