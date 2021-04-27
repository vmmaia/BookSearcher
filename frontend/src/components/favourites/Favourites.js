import React, { useEffect } from 'react';

import isAuthenticated from '../../services/isAuthenticated';
import history from '../../history';

import { Button, Tooltip, Drawer, Spin, Row, Col, Empty, List } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import BookResult from '../book/BookResult';

import { connect } from 'react-redux';
import {
  openFavourites,
  closeFavourites,
  getFavourites
} from '../../redux/actions/favouritesActions';

import './favourites.css';

const Favourites = (props) => {
  const { getFavourites } = props;

  useEffect(() => {
    if (!isAuthenticated()) {
      history.push('/login');
    }
    getFavourites();
  }, [getFavourites]);

  const openDrawer = () => {
    props.openFavourites();
  };

  const closeDrawer = () => {
    props.closeFavourites();
  };

  return (
    <React.Fragment>
      <Tooltip title="Favourites">
        <Button
          className="favourites-button"
          type="primary"
          shape="circle"
          icon={<StarOutlined />}
          onClick={openDrawer}
        />
      </Tooltip>
      <Drawer
        title="Favourites"
        placement="right"
        width={350}
        onClose={closeDrawer}
        visible={props.favouritesProps.open}
      >
        {props.favouritesProps.loading ? (
          <Row className="favourites-layout">
            <Col>
              <Spin />
            </Col>
          </Row>
        ) : props.favouritesProps.books.length === 0 ? (
          <Row className="favourites-layout">
            <Col>
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={'No favourites'}
              />
            </Col>
          </Row>
        ) : (
          <List
            itemLayout="horizontal"
            size="small"
            dataSource={props.favouritesProps.books}
            renderItem={(item) => (
              <BookResult book={item} onClick={closeDrawer} />
            )}
          />
        )}
      </Drawer>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    favouritesProps: state.favourites
  };
};

export default connect(mapStateToProps, {
  openFavourites,
  closeFavourites,
  getFavourites
})(Favourites);
