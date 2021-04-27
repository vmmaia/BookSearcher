import React, { useEffect } from 'react';
import Login from '../components/login/Login';

import isAuthenticated from '../services/isAuthenticated';
import history from '../history';

import { Row, Col } from 'antd';

const LoginPage = (props) => {
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
        <Login />
      </Col>
    </Row>
  );
};

export default LoginPage;
