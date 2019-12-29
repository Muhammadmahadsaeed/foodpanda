import { Tabs } from 'antd';
import React from 'react';
import UserRequests from './UserRequestPage';
import AllRequests from './AllRequest';

const { TabPane } = Tabs;
class UserRequestTabs extends React.Component{
    constructor(props){
        super()
    }
    render(){
        return(
<div className="card-container" style={{marginTop:'3%'}}>
    <Tabs type="card" style={{marginTop:'5%'}}>
      <TabPane tab="All Requests" className="container" key="1">
        <UserRequests {...this.props}/>
      </TabPane>
      <TabPane tab="Pending" key="2">
      <UserRequests {...this.props}/>
        
      </TabPane>
      <TabPane tab="In Progress" key="3">
      <UserRequests {...this.props}/>
    
       
      </TabPane>
      <TabPane tab="Deliver" key="4">
      <UserRequests {...this.props}/>
      

      </TabPane>
    </Tabs>
  </div>
        )
    }
}
export default UserRequestTabs