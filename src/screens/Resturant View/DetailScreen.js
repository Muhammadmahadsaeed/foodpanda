import React from 'react';
import { Card,Button,Rate } from 'antd';
import * as firebase from "firebase/app";
import "firebase/auth";
import { connect } from 'react-redux'
import { checkAndCreatRoom} from '../../config/firebase'
import Chat from '../Chat'
const { Meta } = Card;
class DetailScreen extends React.Component{
  constructor(props){
    super()
    this.state={
      data : []
    }
    this.move = this.move.bind(this)
  }
  
  componentDidMount() {
    this.fetchData()
    
  }

  fetchData () {
    console.log(this.props.location.state)
    // firebase.firestore().collection('resturant').doc().get()
    // .then((doc) => {
    //   let data = []
    //   // snapshot.forEach((resturantData) => {
    //     // const res = resturantData.data()
        
    //     console.log(doc.data())
    //   //   data.push({id : resturantData.id,content:[res] })
        
    //   // })
    //   // this.setState({data:data})
    // })
  };
  async move(){
    const customerId = this.props.location.state.id
    
     const room = await checkAndCreatRoom(customerId)
    //  console.log("room======>",room)
    // console.log(e.id)
    this.props.history.push(`/Chat/${room.id}`)
    // window.location = '/Chat'
    
    }
    
render(){
  // console.log("detail =========>",this.props.location.state.id)
   return(

      <div className="container" style={{paddingTop:'5%'}}>
            <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
          >
            <Button type="primary" onClick={this.move} style={{backgroundColor:'green',border:'green'}}>Chat</Button>
            <div style={{paddingLeft:'12%',display:'inline-block'}}>
            <Button type="primary">Approve</Button>
            </div>
            <br/>
            <br/>
            <Rate />
          </Card>
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

