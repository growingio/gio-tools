import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Layout } from 'antd';
import Avatar from 'cmt/avatar';
import Styles from './index.scss';

const { Header } = Layout;

class ApiAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { dispatch } = this.props;

    return (
      <div className={Styles.apiAuth}>
        <Header className="header">
          <a onClick={() => { dispatch(routerRedux.push({ pathname: '/' })); }}>GrowingIO Tools &gt; API 认证</a>
          <Avatar {...this.props} />
        </Header>
        TODO
      </div>
    );
  }
}

export default connect()(ApiAuth);
