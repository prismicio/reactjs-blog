import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Preview from './Preview';
import Help from './Help';
import NotFound from './NotFound';
import './App.css';
import Post from './Post';
import BlogHome from './BlogHome';

const App = (props) => (
  <Router>
    <Switch>
      {/*<Redirect exact from="/" to="/help"/>*/}
      <Redirect exact from="/blog/" to="/" />
      <Route exact path="/" render={routeProps => <BlogHome{...routeProps} prismicCtx={props.prismicCtx} />} />
      <Route exact path="/help" component={Help} />
      <Route exact path="/preview" render={routeProps => <Preview {...routeProps} prismicCtx={props.prismicCtx} />} />
      <Route exact path="/blog/:uid" render={routeProps => <Post {...routeProps} prismicCtx={props.prismicCtx} />} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default App;
