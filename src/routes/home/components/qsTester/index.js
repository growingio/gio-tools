import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Layout } from 'antd';
import Styles from './index.scss';

const { Header } = Layout;

class QsTester extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { dispatch } = this.props;

    return (
      <div className={Styles.qsTester}>
        <Header className="header">
          <a onClick={() => { dispatch(routerRedux.push({ pathname: '/' })); }}>GrowingIO Tools &gt; QS 测试</a>
        </Header>
        TODO QS Tester
      </div>
    );
  }
}

export default connect()(QsTester);
