import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Layout, Icon } from 'antd';
import Card from 'cmt/card';
import Styles from './index.scss';

const { Header, Content } = Layout;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    const { dispatch } = this.props;

    return (
      <div className={Styles.home}>
        <Header className="header">
          <a onClick={() => { dispatch(routerRedux.push({ pathname: '/' })); }}>GrowingIO Tools</a>
        </Header>
        <Content className="content">
          <Card
            title="JOB_TODO SQL GEN"
            style={{ width: 300 }}
            extra={<Icon type="file-text" />}
            hoverable="true"
            onClick={() => { dispatch(routerRedux.push({ pathname: '/tools/job_todo' })); }}
          >
            job_todo 表 insert sql 生成器
          </Card>
        </Content>
      </div>
    );
  }
}

export default connect()(Home);
