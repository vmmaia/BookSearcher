import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signin } from '../../redux/actions/authActions';
import { Form, Input, Button, Divider } from 'antd';
import Box from '../box/Box';

import './login.css';

const Login = (props) => {
  return (
    <Box>
      <h1 className="login-title">Login</h1>
      <Divider />
      <Form
        layout="vertical"
        name="loginForm"
        onFinish={(values) => props.signin(values)}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please insert your email.'
            },
            {
              type: 'email',
              message: 'Please insert a valid email.'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please insert your password.'
            }
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Link className="login-link" to="/signup">
            Create account
          </Link>
        </Form.Item>

        <Form.Item>
          <Button className="login-button" type="primary" htmlType="submit">
            Log in
          </Button>
        </Form.Item>
      </Form>
    </Box>
  );
};

export default connect(null, { signin })(Login);
