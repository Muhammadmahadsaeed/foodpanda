import React from 'react';
import { Card,Button,Rate, List } from 'antd';
import {  message, Avatar} from 'antd';
import * as firebase from "firebase/app";
import "firebase/auth";
import { connect } from 'react-redux'
import { checkAndCreatRoom} from '../../config/firebase'
import Chat from '../Chat'
import UserNavbar from './navbar';
// import Item from 'antd/lib/list/Item';
const { Meta } = Card;
class DetailScreen extends React.Component{
  constructor(props){
    super()
    this.state={
      data : []
    }
    this.move = this.move.bind(this)
    this.changePrefixToSendRequest = this.changePrefixToSendRequest.bind(this)
  }
  
  componentDidMount() {
    this.fetchData(this.props.location.state.id)
    
  }

  fetchData (id) {
    // console.log("resturant ki di",id)
    firebase.firestore().collection('resturant').doc(id).get()
    .then((doc) => {
      let data = []
      // snapshot.forEach((resturantData) => {
        const res = doc.data()
        
        data.push({content:res})

        
      // })
      this.setState({data:data})
    })
  };
  async move(){
    const customerId = this.props.location.state.id
    
     const room = await checkAndCreatRoom(customerId)
    
    this.props.history.push(`/Chat/${room.id}`)
    
    
    }
    changePrefixToSendRequest(item){
      item.userId = this.props.userLoginData.firebaseLoginData.uid
      const resObj = {
        resturant: item,
        customer:this.props.userLoginData.firebaseLoginData
      }
     
      firebase.firestore().collection('resturant').doc(this.props.location.state.id)
      .collection('requests').add(resObj)
      firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
      .collection('requests').add(resObj)
      this.props.history.push('/UserDashboard')
    }
render(){
  
  const {data} = this.state
     return(
<div>
  <UserNavbar/>

      <div className="container" style={{paddingTop:'5%'}}>
            <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
          >
            <List
            dataSource={this.state.data}
            renderItem={item => (
              <List.Item key={item.id}>
          
                 
                <List.Item.Meta key={item.id}
                  title={<a href="#">Resturant Name: {item.content.resturantName}</a>}
                  
                  description={item.content.foods.foodItems}
                />  
                <Button type="primary" onClick={()=> this.changePrefixToSendRequest(item)}>Order Now</Button>

           </List.Item>
           
            )}
            
          > 
            
          </List>
           
          <div style={{paddingLeft:'12%',display:'inline-block'}}>
                <Button type="primary" onClick={this.move} style={{backgroundColor:'green',border:'green'}}>Chat</Button>

            </div>
            <br/>
            <br/>
            <Rate />
          </Card>
          </div>
            
          </div>    
          )
    }
        
}
const mapStateToProps = state => {
  return {
      // user: state.user
      userLoginData: state.mainReducer.userLoginData,

  }
}
export default connect(mapStateToProps, null)(DetailScreen)

