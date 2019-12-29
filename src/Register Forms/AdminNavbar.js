import React from 'react';
import logo from '../Images/logo.png'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import UserNavbar from './UserNavbar'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import Header from '../screens/mainPage';
import Admin from './AdminRegister'
export default class AdminHeader extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>


        <Navbar color="light" light expand="md">
          <NavbarBrand href="/"><img src={logo} style={{height:60,width:200}} /></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Registeration
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                  {/* <span onClick={()=> this.props.history.push('')}>User</span> */}
                  <Link to="/UserNavbar">User</Link>
                    
                  </DropdownItem>
                  <DropdownItem>
                    <Link to="/Header">Login</Link>
                  </DropdownItem>
                  
                  
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>

        <Admin  {...this.props}/>
      

      </div>
    );
  }
}