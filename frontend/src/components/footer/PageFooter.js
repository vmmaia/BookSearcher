import React from 'react';
import { Layout } from 'antd';
import { LinkedinOutlined, GithubOutlined } from '@ant-design/icons';

import './footer.css';

const PageFooter = (props) => {
  return (
    <Layout.Footer className="app-footer">
      <p>
        {`Vasco Maia - April 2021 - `}
        <LinkedinOutlined />{' '}
        <a href="https://www.linkedin.com/in/vasco-maia-451616170/">
          LinkedIn
        </a>{' '}
        <GithubOutlined /> <a href="https://github.com/vmmaia">Github</a>
        <br />
        Powered by{' '}
        <a href="https://openlibrary.org/developers/api">openlibrary.org</a>
      </p>
    </Layout.Footer>
  );
};

export default PageFooter;
