import React, { useContext, useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import {BrowserRouter as Router,
    Link,
    Routes,
    Route,
  } from "react-router-dom";

const NavbarMenu = () => {
    return (
        <div>
            <Navbar bg="light" expand="lg">
                  <Container className="container-fluid">
                  <Nav.Link><Link className="text-dark" style={{textDecoration: 'none'}} to="/"><i className='fa fa'>Home</i></Link></Nav.Link>
                      <Navbar.Toggle aria-controls="basic-navbar-nav" />
                      <Navbar.Collapse id="basic-navbar-nav">
                      <Nav className="me-auto">
                      <Nav.Link><Link className="text-dark" style={{textDecoration: 'none'}} to="/blockchain"><i className='fa fa'>Blockchain</i></Link></Nav.Link>
                        
                     </Nav>
                        </Navbar.Collapse>
                            </Container>
                            </Navbar>
                   <br/><br/>
        </div>
    )
}
NavbarMenu.propTypes = {}

export default NavbarMenu;