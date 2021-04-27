import React from 'react';
import { Link } from 'react-router-dom';

import { Typography, List } from 'antd';

import './bookResult.css';

const Book = (props) => {
  return (
    <Link to={`/book/${props.book.key}`} onClick={props.onClick}>
      <List.Item className="book-link">
        <div className="book-wrapper">
          <div className="book-image-wrapper">
            <img
              className="book-image"
              alt="book cover"
              src={props.book.cover_i}
            />
          </div>
          <div className="book-info">
            <Typography.Title
              level={4}
              ellipsis={{ tooltip: props.book.title }}
            >
              {props.book.title}
            </Typography.Title>

            <Typography.Text
              ellipsis={{ tooltip: props.book.author_name.join(', ') }}
            >
              {props.book.author_name.join(', ')}
            </Typography.Text>
          </div>
        </div>
      </List.Item>
    </Link>
  );
};

export default Book;
