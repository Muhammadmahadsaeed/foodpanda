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
import SweetAlert from 'sweetalert-react';
import * as firebase from "firebase/app";
import "firebase/auth";
import { connect } from 'react-redux'
import UserNavbar from '../User View/navbar'
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

class AddCategoriess extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
            console.log(this.props.userLoginData.firebaseLoginData.uid)
                let array = []
                // array.push()
                // const obj = {[array]:true}
                // console.log()
                firebase.firestore().collection('resturant').doc(this.props.userLoginData.firebaseLoginData.uid)
                .update({foods:{...values},resid:this.props.userLoginData.firebaseLoginData.uid})
                                         
                        .then(() => {
                          this.props.history.push('/ResturantDashboard')
                       
                        })
                        .catch((err) => {
                          console.log(err)
                      })
               
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
        xs: { span: 24 },
        sm: { span: 16 },
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
      initialValue: 'request',
    })(
      <Select style={{ width: 70 }}>
        <Option value="request">request</Option>
        <Option value="progress">progress</Option>
        <Option value="deliver">deliver</Option>
      </Select>,
    );

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));
    // console.log("yh wla props==========>",this.props.userLoginData)

    return (
      <div>
      <UserNavbar />
      
      <div className="container" style={{marginTop:'5%'}}>
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
      
        <Form.Item
          label={
            <span>
              Resturant Name
            
            </span>
          }
        >
          {getFieldDecorator('foodName', {
            rules: [{ required: true, message: 'Please input your Resturant Name!', whitespace: true }],
          })(<Input />)}
        </Form.Item>
        <Form.Item
          label={
            <span>
              Food Categories
            
            </span>
          }
        >
          {getFieldDecorator('foodCategories', {
            rules: [{ required: true, message: 'Please input Food Categories!', whitespace: true }],
          })(<Input />)}
        </Form.Item>
        <Form.Item
          label={
            <span>
              Food Items
            
            </span>
          }
        >
          {getFieldDecorator('foodItems', {
            rules: [{ required: true, message: 'Please input Food Items!', whitespace: true }],
          })(<Input />)}
        </Form.Item>
        {/* <Form.Item label="Upload" extra="Your Pic">
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
        </Form.Item> */}
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
          <Button type="primary" htmlType="submit" >
            Add
          </Button>
        </Form.Item>
      </Form>
      
      </div>
      </div>
    );
  }
}

const AddCategories = Form.create({ name: 'register' })(AddCategoriess);
const mapStateToProps = state => {
  return {
      // user: state.user
      userLoginData: state.mainReducer.userLoginData,

  }
}
export default connect(mapStateToProps, null)(AddCategories)
 