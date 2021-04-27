import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { searchBook, resetSearch } from '../redux/actions/searchActions';
import {
  addToFavourites,
  removeFromFavourites
} from '../redux/actions/favouritesActions';
import { Redirect, useParams } from 'react-router-dom';

import isAuthenticated from '../services/isAuthenticated';
import history from '../history';

import {
  Row,
  Col,
  Spin,
  Typography,
  Space,
  Divider,
  Tag,
  Carousel,
  Button
} from 'antd';
import { StarOutlined } from '@ant-design/icons';
import Favourites from '../components/favourites/Favourites';

import './css/bookPage.css';

const Book = (props) => {
  const { bookId } = useParams();
  const { searchBook, resetSearch } = props;

  useEffect(() => {
    if (!isAuthenticated()) {
      history.push('/login');
    }
    searchBook(bookId);

    return () => resetSearch();
  }, [bookId, searchBook, resetSearch]);

  return (
    <React.Fragment>
      {props.searchProps.loadingBookPage ? (
        <Row gutter={16}>
          <Col className="bookPage-alignCenter" span={24}>
            <Spin size="large" tip="Loading" />
          </Col>
        </Row>
      ) : !props.searchProps.currentBook ? (
        <Redirect to="/404" />
      ) : (
        <Row gutter={16}>
          <Col className="bookPage-alignCenter" sm={24} md={12}>
            <Carousel autoplay>
              {props.searchProps.currentBook.covers.map((cover, i) => {
                return (
                  <img
                    key={i}
                    className="bookPage-image"
                    alt="book cover"
                    src={cover}
                  />
                );
              })}
            </Carousel>
          </Col>
          <Col sm={24} md={12}>
            <Space direction="vertical" size={25} style={{ width: '100%' }}>
              <div>
                <div className="bookPage-title-wrapper">
                  <Typography.Title level={1}>
                    {props.searchProps.currentBook.title}
                  </Typography.Title>

                  {props.favouritesProps.books.find(
                    (b) => b.key === props.searchProps.currentBook.key
                  ) ? (
                    <Button
                      type="primary"
                      icon={<StarOutlined />}
                      onClick={() =>
                        props.removeFromFavourites(
                          props.searchProps.currentBook.key
                        )
                      }
                    >
                      Remove from favourites
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      icon={<StarOutlined />}
                      onClick={() =>
                        props.addToFavourites(props.searchProps.currentBook)
                      }
                    >
                      Add to favourites
                    </Button>
                  )}
                </div>
                {props.searchProps.currentBook.subtitle ? (
                  <Typography.Title level={4}>
                    {props.searchProps.currentBook.subtitle}
                  </Typography.Title>
                ) : (
                  <React.Fragment />
                )}
              </div>

              <div>
                <Typography.Text>
                  <b>Author:</b>{' '}
                  {props.searchProps.currentBook.author_name.join(', ')}
                </Typography.Text>
              </div>

              <div>
                <Divider className="bookPage-divider" orientation="left">
                  Description
                </Divider>
                <Typography.Text>
                  {props.searchProps.currentBook.description}
                </Typography.Text>
              </div>

              {props.searchProps.currentBook.subjects ? (
                <div>
                  <Divider orientation="left">Subjects</Divider>
                  <div className="bookPage-tags">
                    {props.searchProps.currentBook.subjects.map(
                      (subject, i) => (
                        <Tag key={`subjects_${i}`}>{subject}</Tag>
                      )
                    )}
                  </div>
                </div>
              ) : (
                <React.Fragment />
              )}

              {props.searchProps.currentBook.subject_people ? (
                <div>
                  <Divider orientation="left">People</Divider>
                  <div className="bookPage-tags">
                    {props.searchProps.currentBook.subject_people.map(
                      (subject, i) => (
                        <Tag key={`subject_people_${i}`}>{subject}</Tag>
                      )
                    )}
                  </div>
                </div>
              ) : (
                <React.Fragment />
              )}

              {props.searchProps.currentBook.subject_places ? (
                <div className="bookPage-tags">
                  <Divider orientation="left">Places</Divider>
                  <div>
                    {props.searchProps.currentBook.subject_places.map(
                      (subject, i) => (
                        <Tag key={`subject_places_${i}`}>{subject}</Tag>
                      )
                    )}
                  </div>
                </div>
              ) : (
                <React.Fragment />
              )}
            </Space>
          </Col>
        </Row>
      )}
      <Favourites />
    </React.Fragment>
  );
};

const mapStoreToProps = (store) => {
  return {
    searchProps: store.search,
    favouritesProps: store.favourites,
    authProps: store.auth
  };
};

export default connect(mapStoreToProps, {
  searchBook,
  resetSearch,
  addToFavourites,
  removeFromFavourites
})(Book);
