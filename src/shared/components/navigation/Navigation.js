import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import { logOffUser } from "../../redux/actions/auth";

const Navigation = ({ auth, logOffUser }) => {
  return (
    <Navbar bg="primary" variant="dark" expand="md">
      <Navbar.Brand href="#home">BIRL!</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={NavLink} exact to="/">
            Home
          </Nav.Link>

          {!auth.isLoggedIn && (
            <Nav.Link as={NavLink} exact to="/login">
              Login
            </Nav.Link>
          )}

          {auth.isLoggedIn && (
            <Nav.Link as={NavLink} exact to="/dashboard">
              Dashboard
            </Nav.Link>
          )}

          {auth.isLoggedIn && (
            <Nav.Link as={NavLink} exact to="/clientes-inadimplentes">
              Clientes
            </Nav.Link>
          )}

          {auth.isLoggedIn && <Nav.Link onClick={logOffUser}>Logout</Nav.Link>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

Navigation.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = ({ auth }) => ({
  auth,
  logOffUser: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, {
  logOffUser,
})(Navigation);
