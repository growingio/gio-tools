import React from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import PropTypes from 'prop-types';

import HomePage from './routes/home';

const { ConnectedRouter } = routerRedux;

function RouterConfig({ history }) {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" exact component={HomePage} />
        {/* <Route path="/me" exact component={MePage} />
        <Route path="/account" exact component={AccountPage} />
        <Route path="/address" exact component={AddressPage} />
        <Route path="/addresseidt" exact component={AddressEditPage} />
        */}
      </Switch>
    </ConnectedRouter>
  );
}

RouterConfig.propTypes = {
  history: PropTypes.object.isRequired,
};

export default RouterConfig;
