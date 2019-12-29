import React from 'react';
import ResturantView from './Resturant-view'
import { connect } from 'react-redux'
import UserNavbar from './navbar';
// import * as firebase from "firebase/app";
// import "firebase/auth";
import UserRequestTabs from './RequestsTabs';
import FooterPage from '../footer'
import { Tabs, Select } from 'antd';
const { TabPane } = Tabs;


class UserDashboard extends React.Component {
  render() {
    return (
      <div>
      <div>
           <UserNavbar  {...this.props}/>
     
       
        <Tabs defaultActiveKey="1" tabPosition="left" >

                <TabPane tab="Restaurants" key="1" >
                    <ResturantView {...this.props}/>
                    
                </TabPane>
                <TabPane tab="My Requests" key="2">
                    <UserRequestTabs {...this.props}/>
                    
                </TabPane>
            </Tabs>
            </div>
            
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
      // user: state.user
      userLoginData: state.mainReducer.userLoginData,

  }
}
export default connect(mapStateToProps, null)(UserDashboard)