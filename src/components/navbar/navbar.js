import React from "react";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavItem from "react-bootstrap/NavItem";
import NavDropdown from "react-bootstrap/NavDropdown";

export default function CoinPurseNavbar(props) {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>
        <Link to="/">CoinPurse</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to="/paymentAccounts/list">
            <Nav.Link>Payment Accounts</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/cards/list">
            <Nav.Link>Cards</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/assets/list">
            <Nav.Link>Assets</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/debts/list">
            <Nav.Link>Debts</Nav.Link>
          </LinkContainer>
        </Nav>
        <Nav className="ml-auto">
          <LinkContainer to="/login">
            <Nav.Link>Login / Register</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
