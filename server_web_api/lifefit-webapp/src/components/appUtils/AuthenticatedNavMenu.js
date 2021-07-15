import React, { Component } from 'react';
import { Collapse, Container, Navbar, 
  NavbarBrand, NavbarToggler, NavItem, NavLink, UncontrolledDropdown,
  DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import logo from "./welcomelogo.png";
import Logout from "../appAuth/Logout";
//import { LoginMenu } from './api-authorization/LoginMenu';
import './NavMenu.css';

export default class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render () {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={Link} to="/">
              <img className="navbar-brand" src={logo} alt="StateFarm" style={{maxWidth: 250}} />
            </NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink onClick={this.toggleNavbar} tag={Link} className="text-dark" to="/dashboard">Dashboard</NavLink>
                </NavItem>
                &ensp; 
                &ensp;
                &ensp; 
                &ensp;
                <NavItem>
                  <NavLink onClick={this.toggleNavbar} tag={Link} className="text-dark" to="/syncfitbit">Sync Fitbit</NavLink>
                </NavItem>
                &ensp; 
                &ensp;
                &ensp; 
                &ensp;
                <NavItem>
                  <NavLink onClick={this.toggleNavbar} tag={Link} className="text-white btn btn-primary" to="/contactagent">Contact Agent</NavLink>
                </NavItem>
                &ensp; 
                &ensp;
                &ensp; 
                &ensp;
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav>
                    Logged in: {this.props.user_name}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <NavItem>
                        <NavLink onClick={this.toggleNavbar} tag={Link} className="text-dark" to="/profile">View Profile</NavLink>
                      </NavItem>
                    </DropdownItem>
                    <DropdownItem>
                      <NavItem>
                        <NavLink onClick={this.toggleNavbar} tag={Link} className="text-dark" to="/changepassword">Change Password</NavLink>
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