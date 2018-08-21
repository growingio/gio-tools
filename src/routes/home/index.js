import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Layout, Icon, Row, Col } from 'antd';
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
          <Row gutter={16}>
            <Col span={6}>
              <Card
                title="JOB_TODO SQL GEN"
                style={{ width: 300 }}
                extra={<Icon type="file-text" />}
                hoverable="true"
                onClick={() => { dispatch(routerRedux.push({ pathname: '/tools/job_todo' })); }}
              >
                job_todo 表 insert sql 生成器
              </Card>
            </Col>
            <Col span={6}>
              <Card
                title="API 认证"
                style={{ width: 300 }}
                extra={<Icon type="link" />}
                hoverable="true"
                onClick={() => { dispatch(routerRedux.push({ pathname: '/tools/api_auth' })); }}
              >
                模拟 GrowingIO 的 API 认证接口
              </Card>
            </Col>
          </Row>
        </Content>
      </div>
    );
  }
}

export default connect()(Home);
