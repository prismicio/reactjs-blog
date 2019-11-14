import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { BlogHome, NotFound, Post, Preview } from './pages';
import { apiEndpoint } from './prismic-configuration';

/**
 * Main app component
 */
const App = () => {
  const repoNameArray = /([^/]+)\.cdn.prismic\.io\/api/.exec(apiEndpoint);
  const repoName = repoNameArray[1];

  return (
    <Fragment>
      <Helmet>
        <script async defer src={`//static.cdn.prismic.io/prismic.js?repo=${repoName}&new=true`} />
      </Helmet>
      <BrowserRouter>
        <Switch>
          <Redirect exact from='/blog/' to='/' />
          <Route exact path='/' component={BlogHome} />
          <Route exact path='/preview' component={Preview} />
          <Route exact path='/blog/:uid' component={Post} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
