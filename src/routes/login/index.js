import React, { Component } from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import LoginForm from './loginForm';
import Styles from './index.scss';

const { Content } = Layout;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { };
    this.submit = this.submit.bind(this);
  }

  submit(values) {
    const { dispatch } = this.props;
    const { username, password } = values;
    dispatch({
      type: 'user/login',
      payload: {
        username,
        password,
      },
    });
  }

  render() {
    return (
      <div className={Styles.login}>
        <Content className="content">
          <LoginForm submit={this.submit} />
        </Content>
      </div>
    );
  }
}

export default connect()(Login);
