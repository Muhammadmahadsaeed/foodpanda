import React from 'react';
import { Card } from 'antd';
import AllRequests from './AllRequest'
import * as firebase from "firebase/app";
import "firebase/auth";
import { Avatar,Button,Rate, List ,Icon} from 'antd';

import { connect } from 'react-redux'

class UserRequests extends React.Component {
  state = {
    key: 'tab1',
    noTitleKey: 'app',
    data : []
  };

  // onTabChange = (key, type) => {
  //   console.log(key, type);
  //   this.setState({ [type]: key });
  // };
  componentDidMount() {
    this.fetchData()
    
  }
  fetchData(){
    // console.log(this.props.userLoginData.firebaseLoginData.uid)
    firebase.firestore().collection('users').doc(this.props.userLoginData.firebaseLoginData.uid)
      .collection('requests').get()
      .then((doc) => {
        let data = []
        doc.forEach((requestData) => {
          const res = requestData.data()
          console.log("customer============>",res.resturant.content)
          data.push(res.resturant.content)
  
          
        })
      this.setState({data})

      })
  }
  changePrefixToSendRequest(e){
    console.log(e)
  }
  render() {
    console.log("requests=======>",this.state.data)

    return (
      <div className="container" style={{paddingTop:'5%'}}>
        <Card
            style={{ width: '100%' }}
            
          >
<List
    itemLayout="vertical"
    size="large"
    
    dataSource={this.state.data}
    footer={
      <div>
        <b>ant design</b> footer part
      </div>
    }
    renderItem={item => (
      <List.Item
        key={item.id}
        
        extra={
          <img
            width={272}
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          />
        }
      >
      <List.Item.Meta
          avatar={<Avatar src={item.avatar} />}
          title={<a href="#">Resturant Name: {item.resturantName}</a>}
          description={item.foods.foodItems}
        />
        {item.email}
        <br/>
        <br/>
        
        <Button type="primary" id="${item.id}" onClick={()=> this.changePrefixToSendRequest(this)}>Request</Button>
        <div style={{paddingLeft:'5%',display:'inline-block'}}>
            <Button type="primary" onClick={this.move} style={{backgroundColor:'green',border:'green'}}>Chat</Button>

        </div>
        <br/>
        <br/>
        
        <Rate />
      </List.Item>
    )}
    />
  </Card>
      </div>
    );
  }
}

export default UserRequests