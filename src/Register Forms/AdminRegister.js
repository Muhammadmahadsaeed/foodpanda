import React from 'react';
import 'antd/dist/antd.css';
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  Upload,
  message,
  AutoComplete,
} from 'antd';
import * as firebase from "firebase/app";
import "firebase/auth";
// import "firebase/storage"

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const residences = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];
// function getBase64(img, callback) {
//   const reader = new FileReader();
//   reader.addEventListener('load', () => callback(reader.result));
//   reader.readAsDataURL(img);
// }

// function beforeUpload(file) {
//   const isJPG = file.type === 'image/png';
//   if (!isJPG) {
//       message.error('You can only upload JPG file!');
//   }
//   const isLt2M = file.size / 1024 / 1024 < 2;
//   if (!isLt2M) {
//       message.error('Image must smaller than 2MB!');
//   }
//   return isJPG && isLt2M;
// }
class AdminRegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          let obj = {
            error : '',
            lastModifiedDate : '',
            name : '',
            originFileObj : ''
          }
          // values.upload.map((item)=>{
          //   obj.error = item.error
          //   obj.lastModifiedDate = item.lastModifiedDate
          //   obj.name = item.name
          //   obj.originFileObj = item.originFileObj
          // })
          // values.upload = obj
          console.log(values.upload)
          // firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
          // .then((res)=>{
          
          //  var storageRef = firebase.storage().ref('/');
          //  var imagesRef = storageRef.child(`Resturant Admin/${obj.name}`);
   
          //  imagesRef.put(values.upload)
          //  .then((snapshot) => {
          //    snapshot.ref.getDownloadURL()
          //    .then((snap) => {  
              // firebase.firestore().collection('resturant').doc(res.user.uid)
              // .set({ ...values, type: 'restaurant' })
              // .then(() => {
              //     this.props.history.push('/Header')

              // })
  //        })
        //  .catch(function(error) {
        //    console.error("Error adding document: ", error);
        //   });
            
    //  })
  //    .catch(function(error) {
  //     console.error("Error adding document: ", error);
       
  //  });
      
  //      })
  //      .catch(function(error) {
  //       console.error("Error adding document: ", error);
         
  //    });
    
        }
    });
};
// handleChangeimage = info => {
//     if (info.file.status === 'uploading') {
//         this.setState({ loading: true });
//         return;
//     }
//     if (info.file.status === 'done') {
//         // Get this url from response in real world.
//         getBase64(info.file.originFileObj, imageUrl =>
//             this.setState({
//                 imageUrl,
//                 loading: false,
//             }),
//             console.log(this.state.imageUrl)
//         );
//     }
// };

  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };


  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  };

  render() {
    // console.log(this.props)
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 12 },
        sm: { span: 8 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>,
    );

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <div className="container" style={{marginTop:'2%'}}>
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
      <Form.Item
          label={
            <span>
              Full Name
            
            </span>
          }
        >
          {getFieldDecorator('nickname', {
            rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
          })(<Input />)}
        </Form.Item>
        <Form.Item
          label={
            <span>
              Resturant Name
            
            </span>
          }
        >
          {getFieldDecorator('resturantName', {
            rules: [{ required: true, message: 'Please input your Resturant Name!', whitespace: true }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="E-mail">
          {getFieldDecorator('email', {
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
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Country">
       
        
          <Input />
        
        </Form.Item>
        <Form.Item label="City">
       
        
          <Input />
        
        </Form.Item>
        <Form.Item label="Password" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item label="Confirm Password" hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
        </Form.Item>
        <Form.Item label="Upload" extra="Your Pic">
          {getFieldDecorator('upload', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
            <Upload name="logo" action="/upload.do" listType="picture">
              <Button>
                <Icon type="upload" /> Click to upload
              </Button>
            </Upload>,
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          {getFieldDecorator('agreement', {
            valuePropName: 'checked',
          })(
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>,
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
      </div>
    );
  }
}

const Admin = Form.create({ name: 'register' })(AdminRegistrationForm);

export default Admin