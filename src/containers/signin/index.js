import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as authActions from '../../actions/authActions';
import { Form, Input, Button, Checkbox } from 'antd';
import { withRouter } from 'react-router-dom';
import Navbar from '../../components/navbar';
import './signin.css'

function Signin(props) {

   const layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
      },
    };
    const tailLayout = {
      wrapperCol: {
        offset: 8,
        span: 16,
      },
    };

   const onFinish = (values) => {
      console.log('Success:', values);
      props.authActions.signIn(values, props.history);
   };

   const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
   };

   return (
      <div>
         <Navbar />
         <div style={{display: `flex`, 
                     justifyContent: `center`, 
                     alignItems: `center`, 
                     width: `100%`, 
                     height: `100vh`,
                     position: `relative`,
                     }}>
            <div className="bg-image"></div>
            <div className="bg-opacity"></div>            
            <Form 
               className="form-signin"
               {...layout}
               name="basic"
               initialValues={{
               remember: true,
               }}
               onFinish={onFinish}
               onFinishFailed={onFinishFailed}
            >
            <Form.Item style={{
               margin: `30px`,
            }}
               name="email"
               rules={[
                  {
                     required: true,
                     message: 'Please input your username!',
                  },
               ]}
            >
            <Input placeholder="Email"/>
            </Form.Item>
            <Form.Item style={{
               margin: `30px`,
            }}
               name="password"
               rules={[
                  {
                     required: true,
                     message: 'Please input your password!',
                  },
               ]}
            >
            <Input.Password placeholder="Password"/>
            </Form.Item>

               <Form.Item {...tailLayout} name="remember" valuePropName="checked" >
               <Checkbox style={{ color: `white` }}>Remember me</Checkbox>
               </Form.Item>

               <Form.Item {...tailLayout} >
                  <Button type="primary" htmlType="submit" style={{padding: `0 30px`, borderRadius: `3px`}}>
                     SIGN IN
                  </Button>
               </Form.Item>
            </Form>
         </div>
      </div>
   )
}

const mapStateToProps = state => ({
   error: state.auth.error,
   isLoading: state.auth.isLoading
})

const mapDispatchToProps = dispatch => ({
   authActions: bindActionCreators(authActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(Signin));
