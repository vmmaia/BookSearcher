import React from 'react';
import { Route, Switch } from 'react-router-dom';

import 'antd/dist/antd.css';
import './app.css';

import { Layout } from 'antd';

import Header from './header/Header';
import Footer from './footer/PageFooter';

import LandingPage from '../pages/Landing';
import SignupPage from '../pages/Signup';
import LoginPage from '../pages/Login';
import PageNotFound from '../pages/404';
import BookPage from '../pages/Book';

const App = (props) => {
  return (
    <Layout>
      <Header />
      <Layout.Content className="site-layout-content">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={SignupPage} />
          <Route exact path="/book/:bookId" component={BookPage} />
          <Route component={PageNotFound} />
        </Switch>
      </Layout.Content>
      <Footer />
    </Layout>
  );
};

export default App;
