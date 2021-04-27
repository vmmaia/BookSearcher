import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../../redux/actions/authActions';
import { Form, Input, Button, Divider } from 'antd';
import Box from '../box/Box';

import './signup.css';

const Signup = (props) => {
  return (
    <Box>
      <h1 className="signup-title">Sign up</h1>
      <Divider />
      <Form
        layout="vertical"
        name="signupForm"
        onFinish={(values) => props.signup(values)}
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

        <Form.Item
          label="Confirm Password"
          name="confirm-password"
          rules={[
            {
              required: true,
              message: 'Please confirm your password.'
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error('The two passwords that you entered do not match.')
                );
              }
            })
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Link className="login-link" to="/login">
            I have an account
          </Link>
        </Form.Item>

        <Form.Item>
          <Button className="signup-button" type="primary" htmlType="submit">
            Create account
          </Button>
        </Form.Item>
      </Form>
    </Box>
  );
};

export default connect(null, { signup })(Signup);
