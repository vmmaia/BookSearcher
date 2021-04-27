import React, { useEffect } from 'react';
import Signup from '../components/signup/Signup';

import isAuthenticated from '../services/isAuthenticated';
import history from '../history';

import { Row, Col } from 'antd';

const SignupPage = (props) => {
  useEffect(() => {
    if (isAuthenticated()) {
      history.push('/');
    }
  }, []);

  return (
    <Row
      justify="center"
      align="middle"
      style={{ minHeight: 'calc(100vh - 64px - 48px - 106px)' }}
    >
      <Col>
        <Signup />
      </Col>
    </Row>
  );
};

export default SignupPage;
