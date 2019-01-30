import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Preview from './Preview';
import NotFound from './components/NotFound';
import Post from './components/Post';
import BlogHome from './components/BlogHome';

const App = (props) => (
  <Router>
    <Switch>
      <Redirect exact from="/blog/" to="/" />
      <Route exact path="/" render={routeProps => <BlogHome{...routeProps} prismicCtx={props.prismicCtx} />} />
      <Route exact path="/preview" render={routeProps => <Preview {...routeProps} prismicCtx={props.prismicCtx} />} />
      <Route exact path="/blog/:uid" render={routeProps => <Post {...routeProps} prismicCtx={props.prismicCtx} />} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default App;
