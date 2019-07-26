import React from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import PropTypes from 'prop-types';

import AuthorizedRoute from './routes/AuthorizedRoute';
import NotFound from './routes/others/notFound';
import Login from './routes/login';

const { ConnectedRouter } = routerRedux;

function RouterConfig({ history }) {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/" component={AuthorizedRoute} />
        <Route path="*" exact component={NotFound} />
      </Switch>
    </ConnectedRouter>
  );
}

RouterConfig.propTypes = {
  history: PropTypes.object.isRequired,
};

export default RouterConfig;
