import React from 'react';
import logo from '../../Images/logo.png'
import { connect } from 'react-redux';
import * as firebase from "firebase/app";
import "firebase/auth";
// import {browserHistory} from 'react-router'

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

 class UserNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      modal: false
    };
    this.toggle = this.toggle.bind(this);
   
    // this.toggleModal = this.toggleModal.bind(this);

  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
 

  
  signOut() {
    console.log("signout janu")
    console.log(this.props)
    firebase.auth().signOut()
    .then((succ)=> {
      this.props.history.push('/Header')
    }).catch(function(error) {
      // An error happened.
    });
  }
  render() {
    const { modal} = this.state
    console.log(modal)
    return (
      <div>


        <Navbar color="light" light expand="md">
          <NavbarBrand href="/"><img src={logo} style={{height:60,width:200}} /></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
            <NavItem>
                <NavLink style={{cursor:'pointer'}}>Find Your Location</NavLink>
            </NavItem>
            {/* <NavItem  onClick={()=>this.signOut()}>
              
            </NavItem> */}
            <NavItem style={{cursor:'pointer'}} onClick={()=>this.signOut()}>
              <NavLink>Log Out</NavLink>
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

export default connect(mapStateToProps, null)(UserNavbar);
