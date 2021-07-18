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
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={RRNavLink} to="/">
              <img className="navbar-brand" src={logo} alt="StateFarm" style={{maxWidth: 250}} />
            </NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink onClick={this.closeMenu} tag={RRNavLink} className="text-dark navLink-custom" to="/dashboard" activeClassName="custom-active">Dashboard</NavLink>
                </NavItem>
                &ensp; 
                &ensp;
                &ensp; 
                &ensp;
                <NavItem>
                  <NavLink onClick={this.closeMenu} tag={RRNavLink} className="text-dark navLink-custom" activeClassName="custom-active" to="/contactagent">Contact Agent</NavLink>
                </NavItem>
                &ensp; 
                &ensp;
                &ensp; 
                &ensp;
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle className="text-dark border" nav>
                    Logged in: {this.props.user_name}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <NavItem>
                        <NavLink onClick={this.closeMenu} tag={RRNavLink} className="text-dark" activeClassName="custom-active" to="/profile">View Profile</NavLink>
                      </NavItem>
                    </DropdownItem>
                    <DropdownItem>
                      <NavItem>
                        <NavLink onClick={this.closeMenu} tag={RRNavLink} className="text-dark" activeClassName="custom-active" to="/changepassword">Change Password</NavLink>
                      </NavItem>
                    </DropdownItem>
                    <DropdownItem>
                      <NavItem>
                        <NavLink onClick={this.closeMenu} tag={RRNavLink} className="text-dark" activeClassName="custom-active" to="/syncfitbit">Sync Fitbit</NavLink>
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