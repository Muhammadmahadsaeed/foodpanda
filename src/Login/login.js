import React from 'react';
import 'antd/dist/antd.css';
import { Form, Icon, Input, Button, Checkbox,Row,Col } from 'antd';
import loading from '../Images/loading.gif'
import UserDashboard from '../screens/User View/UserDashboard'
import { connect } from 'react-redux'
import { saveLoginData } from '../redux-config/action'
import * as firebase from "firebase/app";
import "firebase/auth";
import ResturantDashboard from '../screens/Resturant View/ResturantDashboard'
import backgroundImage from '../Images/bg.jpg'


class Login extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
      }
    });
  };
  constructor(props){
    super()
    this.state = {
      email : null,
      pwd : null,
      isLoading : false
    }
    this.userDashboard =  this.userDashboard.bind(this)

  }
  userDashboard(){
    let data = []
    firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.pwd)
      .then((res) => {   
        firebase.firestore().collection('users').where('email' ,"==" , res.user.email).get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
              data.push(doc.data())


          });
          // console.log(' => ', data);

      });       
       this.props.saveLoginData({ firebaseLoginData: res.user, data })
       this.props.history.push('/UserDashboard')

    // console.log('this.props ==> ', this.props)

      })
       .catch((err) => {
            console.log("erooorrr",err)
        })
    firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.pwd)
      .then((res) => {   
        firebase.firestore().collection('resturant').where('email' ,"==" , res.user.email).get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
              // console.log(doc.id, ' => ', doc.data());
              data.push(doc.data())

          });

      });
          this.props.saveLoginData({ firebaseLoginData: res.user, data })

          this.props.history.push('/ResturantDashboard')

      })

    
  }
  render() {
    
    
    // console.log("login ka props",this.props)
    const { isLoading } =  this.state
    return (
      <div className="container" style={{marginTop:'5%'}}>
      <Form onSubmit={this.handleSubmit} className="login-form" style={{padding:'10%'}}>
        <Form.Item row>
        {this.props.form.getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          })(
            <Col sm={10}>
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username" onChange={(e)=>this.setState({email:e.target.value})}
            /></Col>,
          )}
        </Form.Item >
        <Form.Item row>
          {this.props.form.getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Col sm={10}>
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password" onChange={(e)=>this.setState({pwd:e.target.value})}
            /></Col>,
          )}
        </Form.Item>
        {isLoading && <img src={loading} style={{height:'10%'}} />}
        <Form.Item>
         
          <Button type="primary" htmlType="submit" onClick={this.userDashboard}  className="login-form-button">
            Log in
          </Button>
          
        </Form.Item>
      </Form>
      </div>
    );
  }
}
const matchStateToProps = (state) => {
  return ({
      userLoginData: state.mainReducer.userLoginData,
  })
}

const matchDispatchToProps = (dispatch) => {
  return {
      saveLoginData: (data) => {
          dispatch(saveLoginData(data))
      }
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);

    
export default connect(matchStateToProps, matchDispatchToProps)(WrappedNormalLoginForm)