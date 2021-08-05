import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import logo from "./welcomelogo.png";
import './NavMenu.css';

export default class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  closeMenu () {
    if (!this.state.collapsed) {
      this.toggleNavbar();
    }
  }

  render () {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={RRNavLink} to="/">
              <img className="navbar-brand" src={logo} alt="StateFarm" style={{maxWidth: 250}} />
            </NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink onClick={this.closeMenu} tag={RRNavLink} className="text-dark navLink-custom me-4" activeClassName="custom-active" exact to="/">
                    <span className="menu-item">Home</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={this.closeMenu} tag={RRNavLink} className="text-dark navLink-custom me-4" activeClassName="custom-active" to="/login">
                    <span className="menu-item">Login</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={this.closeMenu} tag={RRNavLink} className="text-dark navLink-custom me-4" activeClassName="custom-active" to="/about">
                    <span className="menu-item">About Us</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={this.closeMenu} tag={RRNavLink} className="text-white btn btn-danger" to="/signup">Sign Up</NavLink>
                </NavItem>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}