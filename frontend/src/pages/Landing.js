import React, { useEffect } from 'react';

import isAuthenticated from '../services/isAuthenticated';
import history from '../history';

import { Row, Col } from 'antd';

import SearchBar from '../components/search/bar/Bar';
import SearchResults from '../components/search/results/Results';
import Favourites from '../components/favourites/Favourites';

const Landing = (props) => {
  useEffect(() => {
    if (!isAuthenticated()) {
      history.push('/login');
    }
  }, []);

  return (
    <React.Fragment>
      <Row justify="center" style={{ paddingTop: '50px' }}>
        <Col span={24}>
          <SearchBar />
          <SearchResults />
          <Favourites />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Landing;
