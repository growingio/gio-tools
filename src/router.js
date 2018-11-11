import React from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import PropTypes from 'prop-types';

import HomePage from './routes/home';
import JobTodo from './routes/home/components/jobTodo';
import ApiAuth from './routes/home/components/apiAuth';
import RunJobs from './routes/home/components/runJobs';

const { ConnectedRouter } = routerRedux;

function RouterConfig({ history }) {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/tools/run_jobs" exact component={RunJobs} />
        <Route path="/tools/job_todo" exact component={JobTodo} />
        <Route path="/tools/api_auth" exact component={ApiAuth} />
      </Switch>
    </ConnectedRouter>
  );
}

RouterConfig.propTypes = {
  history: PropTypes.object.isRequired,
};

export default RouterConfig;
