import React from 'react';
import { connect } from 'react-redux';

import { Row, Col, Divider, Spin, Empty, List } from 'antd';
import BookResult from '../../book/BookResult';

import './results.css';

const Results = (props) => {
  return (
    <Row
      className={`searchResults-box ${
        props.searchProps.searchResultsHidden ? 'searchResults-hide' : ''
      }`}
      gutter={16}
    >
      <Col span={24} style={{ textAlign: 'center' }}>
        <Divider orientation="left" style={{ fontSize: '1.5em' }}>
          Search results
        </Divider>
        {props.searchProps.searching === true ? (
          <Spin size="large" tip="Searching" />
        ) : props.searchProps.results.length === 0 ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={'No books found'}
          />
        ) : (
          <List
            itemLayout="horizontal"
            size="small"
            dataSource={props.searchProps.results}
            renderItem={(item) => <BookResult book={item} />}
          />
        )}
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => {
  return {
    searchProps: state.search
  };
};

export default connect(mapStateToProps, {})(Results);
