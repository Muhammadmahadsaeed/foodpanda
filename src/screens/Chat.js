import { Input,Button} from 'antd';
import React from 'react'
import { ChatFeed, Message } from 'react-chat-ui'
import '../App.css'
import { connect } from 'react-redux'
import { getRoomInfo,sendMessageToDb} from '../config/firebase'
import * as firebase from "firebase/app";
import "firebase/auth";
import {getMessages} from '../redux-config/Chat/action'

class Chat extends React.Component{
    constructor(props){
        super()
        this.state = {
          //   messages: [
          //     new Message({
          //       id: 1,
          //       message: "I'm the recipient! (The person you're talking to)",
          //     }), // Gray bubble
          //     new Message({ id: 0, message: "I'm you -- the blue bubble!" }), // Blue bubble
          //   ],
          //   //...
          room : {}
          
          };
          this.sendMessage = this.sendMessage.bind(this)
    }
    componentDidMount(){
      this.getRoomInfo()
      this.props.getMessages(this.props.match.params.id)
    }
   async getRoomInfo(){
      try{

        const room = await getRoomInfo(this.props.match.params.id)
        this.setState({room})
      }catch(e){

      }

    }
    sendMessage(){
      const {text,room} = this.state
      sendMessageToDb(text,room.id)
    }
    render() {
      

        return (
       <div className="container">
        <div className="App ">
            
        {/* <ChatFeed
            messages={this.state.messages} // Boolean: list of message objects
            isTyping={this.state.is_typing} // Boolean: is the recipient typing
            hasInputField={false} // Boolean: use our input, or use your own
            showSenderName // show the name of the user who sent the message
            bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
            // JSON: Custom bubble styles
            bubbleStyles={
              {
                text: {
                  fontSize: 20
                },
                chatbubble: {
                  borderRadius: 10,
                  padding: 20
                }
              }
            }
          /> */}
          <Input placeholder="Type message here....." onChange={(e)=> this.setState({text: e.target.value})} />
          <Button type="primary" onClick={this.sendMessage}>Send</Button>
        </div>
        
       
       </div>
      
        )
       
      }
      
}
// Your code stuff...
const mapStateToProps = (state) => {
  console.log("bhai yr aja",state.chatReducer.messages)

  return {
      // user: state.user
      messages: state.chatReducer.messages,

  }
}
const mapDispatchToProps = (dispatch) => {

  return {
      // user: state.user
      getMessages: (roomId) => dispatch(getMessages(roomId))

  }

}
export default connect(mapStateToProps, mapDispatchToProps)(Chat)