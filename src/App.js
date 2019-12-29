import React from 'react';
import logo from './logo.svg';
import './App.css';
import firebaseConfig from './config/firebase'
import Navigation from './config/router';
import { BrowserRouter, Route } from "react-router-dom";
import Example from './screens/mainPage'
import UserDashboard from './screens/User View/UserDashboard';
import User from './Register Forms/UserRegister'
import Admin from './Register Forms/AdminRegister'
import ResturantDashboard from './screens/Resturant View/ResturantDashboard';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from "./redux-config/index"

// import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

class App extends React.Component {

  // constructor(props){
  //   super()

  // }



  render() {

    return (

      <div>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Navigation />
                </PersistGate>
            </Provider>
        

       

      </div>


    );
  }

}

export default App;
