import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signout } from '../../redux/actions/authActions';
import { Layout, Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

import './header.css';

const PageHeader = (props) => {
  const handleLogout = () => {
    props.signout();
  };

  return (
    <Layout.Header className="header-box">
      <h1 className="header-title">
        <Link to="/">Book Searcher</Link>
      </h1>
      {props.authProps.authenticated ? (
        <div>
          <Button
            className="header-button"
            onClick={handleLogout}
            type="text"
            icon={<LogoutOutlined />}
          >
            Log out
          </Button>
        </div>
      ) : (
        <React.Fragment />
      )}
    </Layout.Header>
  );
};

const mapStateToProps = (state) => {
  return {
    authProps: state.auth
  };
};

export default connect(mapStateToProps, { signout })(PageHeader);
