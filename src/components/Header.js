import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import logo from '../asset/logo_fpt.jpg';

const Header = () => {
    return (
        <Navbar expand="lg" variant="dark" className="custom-header shadow-sm py-2">
            <Container>
                <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
                    <img
                        src={logo}
                        alt="Logo"
                        style={{ width: '45px', height: '45px', marginRight: '10px' }}
                    />
                    <span className="brand-text h3 mb-0">ChatRoom App</span>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={NavLink} to="/" end className="px-3">Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/chat" className="px-3">Chat Room</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
export default Header;