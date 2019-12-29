import React from 'react';
import { Card } from 'antd';
import * as firebase from "firebase/app";
import "firebase/auth";
import { Avatar,Button,Rate, List ,Icon} from 'antd';

import { connect } from 'react-redux'

class ResturantAllRequests extends React.Component {
  state = {
    data : []
  };

  componentDidMount() {
    this.fetchData()
    
  }
  fetchData(){
      let data = []
    let resturantData = []
    let userId = []
    const obj = {
      res: '',
      cus : ''
    }
    // console.log(this.props.userLoginData.firebaseLoginData.uid)
    firebase.firestore().collection('resturant').doc(this.props.userLoginData.firebaseLoginData.uid)
      .collection('requests').get()
      .then((doc) => {
        
        doc.forEach((requestData) => {
        obj.res = requestData.data().customer
        obj.cus = requestData.data().resturant.content
        data.push(obj)
                
        })
      this.setState({data})
      console.log("res==============>",data)

      })
    //   let newItem = data.map((itm)=>{
    //       return itm.content.userId
    //   })
    //   console.log("==============>res",resturantData)
    //   console.log("iddddddd=======>",userId)
    //   for(var i = 0; i < userId.length; i++){
    //     firebase.firestore().collection('users').doc(userId[i]).get()
    //     .then((doc)=>{
    //         doc.forEach((userRequestData)=>{
    //           data.push(userRequestData.data())
    //         })
    //         this.setState({data})
    //     })
    //   }
      

  }
changePrefixToSendRequest(item){
      item.content.foods.prefix = "progress"
      console.log(item.userId)
        console.log(item)
    //   firebase.firestore().collection('resturant').doc(firebase.auth().currentUser.uid)
    //   .collection('requests').update(item)
      firebase.firestore().collection('users').doc(item.userId).collection('requests').update(item)
      .then((snapshot)=>{
        snapshot.forEach((resturantData) => {
          console.log('===============>',resturantData.data().Customer.content)
      })
    })


}
  render() {
    // console.log("requests=======>",this.state.data)

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
          title={<a href="#">Customer Name: {item.cus.resturantName}</a>}
          description={item.cus.foods.foodItems}
        />
        Ordered By: 
                {item.res.email}
        <br/>
        <br/>
        
        <Button type="primary" onClick={()=> this.changePrefixToSendRequest(item)}>Approve</Button>
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

export default ResturantAllRequests