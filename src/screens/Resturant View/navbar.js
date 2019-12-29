import { connect } from 'react-redux';
import * as firebase from "firebase/app";
import "firebase/auth";
import React from 'react';
import logo from '../../Images/logo.png'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
   } from 'reactstrap';
import Header from '../mainPage'

class ResturantNavbar extends React.Component {
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
  
  signOut() {
    
    firebase.auth().signOut()
    .then((succ)=> {
      this.props.history.push('/Header')
      console.log("sign out")
      
    }).catch(function(error) {
      console.log(error)
    });
  }
  render() {
    console.log(this.props)
    return (
      <div>


        <Navbar color="light" light expand="md">
          <NavbarBrand href="#"><img src={logo} style={{height:60,width:200}} /></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              
            <NavItem>
                <NavLink><Link to="/AddCategories">Add Categories</Link></NavLink>
            </NavItem>
            <NavItem>
              <NavLink style={{cursor:'pointer'}} onClick={()=>this.signOut()}>Log Out</NavLink>
            </NavItem>
            </Nav>
          </Collapse>
        </Navbar>

        
      

      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    userLoginData: null,
  }
}

export default connect(mapStateToProps, null)(ResturantNavbar);