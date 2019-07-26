import React from 'react';
import { connect } from 'dva';
import { Switch, Route, Redirect } from 'dva/router';
import HomePage from './home';
import JobTodo from './home/components/jobTodo';
import ApiAuth from './home/components/apiAuth';
import RunJobs from './home/components/runJobs';
import ExportV2 from './home/components/exportV2';
import QsTester from './home/components/qsTester';

@connect(({ loading, user }) => ({
  loginUser: user.loginUser,
  loading: loading.global,
}))
class AuthorizedRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  componentWillMount() {
    this.props.dispatch({
      type: 'user/current',
      payload: {},
      redirect: '/login',
    });
  }

  isLogin() {
    const { loginUser } = this.props;
    return loginUser && loginUser.username;
  }

  render() {
    return (
      <div>
        { this.isLogin() ?
          <Switch>
            <Route path="/dashboard"
              exact
              render={rest => <HomePage {...rest} {...this.props} />}
            />
            <Route path="/tools/run_jobs"
              exact
              render={rest => <RunJobs {...rest} {...this.props} />}
            />
            <Route path="/tools/job_todo"
              exact
              render={rest => <JobTodo {...rest} {...this.props} />}
            />
            <Route path="/tools/api_auth"
              exact
              render={rest => <ApiAuth {...rest} {...this.props} />}
            />
            <Route path="/tools/export_v2"
              exact
              render={rest => <ExportV2 {...rest} {...this.props} />}
            />
            <Route path="/tools/qs_tester"
              exact
              render={rest => <QsTester {...rest} {...this.props} />}
            />
            <Redirect exact to="dashboard" />
          </Switch> : ''
        }
      </div>
    );
  }
}

export default connect()(AuthorizedRoute);
