import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Layout } from 'antd';
import Styles from './index.scss';

const { Header } = Layout;

class RunJobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { dispatch } = this.props;

    return (
      <div className={Styles.runJobs}>
        <Header className="header">
          <a onClick={() => { dispatch(routerRedux.push({ pathname: '/' })); }}>GrowingIO Tools &gt; QueryService Monitor</a>
        </Header>
        QS TODO
      </div>
    );
  }
}

export default connect()(RunJobs);
