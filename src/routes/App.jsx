import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Layout from '../components/Layout';

import NotFound from '../containers/NotFound';

import routes from './index';

import { getInitialState } from '../actions';

const App = ({ getInitialState }) => {

  useEffect(() => {
    getInitialState();
  }, [getInitialState]);

  return (
    <Router>
      <Layout>
        <Switch>
          {routes.map((route, idx) => (
            <Route key={idx} {...route} />
          ))}
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </Router>
  )
};

const mapDispatchToProps = {
  getInitialState,
}

export default connect(null, mapDispatchToProps)(App);
