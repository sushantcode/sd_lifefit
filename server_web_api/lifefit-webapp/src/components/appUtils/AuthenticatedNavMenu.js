import React, { Component } from 'react';
import { Collapse, Container, Navbar, 
  NavbarBrand, NavbarToggler, NavItem, NavLink, UncontrolledDropdown,
  DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import logo from "./welcomelogo.png";
import Logout from "../appAuth/Logout";
import "./NavMenu.css";

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
        <Navbar className="navbar-expand-md navbar-toggleable-md ng-white border-bottom box-shadow mb-1" light>
          <Container>
            <NavbarBrand tag={RRNavLink} to="/">
              <img className="navbar-brand" src={logo} alt="StateFarm" style={{maxWidth: 250}} />
            </NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-md-inline-flex flex-md-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink onClick={this.closeMenu} tag={RRNavLink} className="text-dark navLink-custom me-4" activeClassName="custom-active" to="/dashboard">
                    <span className="menu-item">Dashboard</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={this.closeMenu} tag={RRNavLink} className="text-dark navLink-custom me-4" activeClassName="custom-active" to="/contactagent">
                    <span className="menu-item">Contact Agent</span>
                  </NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle className="text-light border bg-danger" nav>
                    Logged in: {this.props.user_name}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <NavItem>
                        <NavLink onClick={this.closeMenu} tag={RRNavLink} className="text-dark" activeClassName="custom-active" to="/profile">
                          <span className="menu-item">View Profile</span>
                        </NavLink>
                      </NavItem>
                    </DropdownItem>
                    <DropdownItem>
                      <NavItem>
                        <NavLink onClick={this.closeMenu} tag={RRNavLink} className="text-dark" activeClassName="custom-active" to="/syncfitbit">
                          <span className="menu-item">Sync Fitbit</span>
                        </NavLink>
                      </NavItem>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                      <Logout />
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}