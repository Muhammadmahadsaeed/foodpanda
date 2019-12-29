import React from 'react';
import WrappedNormalLoginForm from '../Login/login';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Header from '../screens/mainPage'
import UserDashboard from '../screens/User View/UserDashboard';
import UserNavbar from '../Register Forms/UserNavbar'
import AdminHeader from '../Register Forms/AdminNavbar'
import ResturantDashboard from '../screens/Resturant View/ResturantDashboard'
import Chat from '../screens/Chat';
import AddCategories from '../screens/Resturant View/AddCateogories'
import ResturantNavbar from '../screens/Resturant View/navbar';
import DetailScreen from '../screens/User View/DetailScreen'
// BrowserRouter ko use krenge Router k tor p islye aisa kiya
// nickname alias
// agr do text ek jse hon to diff krne k lye alias use hota h
// import {text } from 'react-Native'
// import {text as NativeText} from 'react-Native'

// import all components
function Navigation() {
    return (
         <Router>
            <>
                <Route exact path="/" render={(props) => <Header {...props}  />} />
                {/* <Route exact path="/" render={(props) => <WrappedNormalLoginForm {...props}  />} /> */}
                <Route path="/UserDashboard" component={UserDashboard} />
                <Route path="/UserNavbar" component={UserNavbar}/>
                <Route path="/AdminHeader" component={AdminHeader} />
                <Route path="/WrappedNormalLoginForm" component={WrappedNormalLoginForm}/>
                {/* <Route path="/AdminHeader" component={AdminHeader} /> */}
                <Route path="/Header" component={Header} />
                <Route  path="/ResturantDashboard" component={ResturantDashboard} />
                <Route  path="/Chat/:id" component={Chat} />
                <Route path="/AddCategories" component={AddCategories}/>
                <Route path="/DetailScreen" component={DetailScreen}/>


                {/* <Route exact path="/profile" component={Profile} />
                <Route path="/profile/:username" component={IndividualProfile} /> */}
                {/* this.props.match.params.username */}
            </>
        </Router>  
    );
  }
  

  export default Navigation;
//   import app.js
  