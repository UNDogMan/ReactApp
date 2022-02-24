import React from 'react';
import '../App.css';
import {Container, Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";

function Header() {
    return (
        <Navbar bg='light' expand='lg'>
            <Container>
                <Navbar.Brand>StudentsCRM</Navbar.Brand>

                <LinkContainer to={"/students"}>
                    <Nav.Link>Students</Nav.Link>
                </LinkContainer>

                <LinkContainer to={"/companies"}>
                    <Nav.Link>Companies</Nav.Link>
                </LinkContainer>

                <LinkContainer to={"/events"}>
                    <Nav.Link>Events</Nav.Link>
                </LinkContainer>
            </Container>
        </Navbar>
    );
}

export default Header;
