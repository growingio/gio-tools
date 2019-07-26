import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Layout, Icon, Row, Col } from 'antd';
import Card from 'cmt/card';
import Avatar from 'cmt/avatar';
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
          <Avatar {...this.props} />
        </Header>
        <Content className="content">
          <Row className="row" gutter={16}>
            <Col span={6}>
              <Card
                title="QS Monitor"
                style={{ width: 300 }}
                extra={<Icon type="fund" style={{ fontSize: '24px' }} />}
                hoverable="true"
                onClick={() => { dispatch(routerRedux.push({ pathname: '/tools/run_jobs' })); }}
              >
                Query Service 任务监控
              </Card>
            </Col>
            <Col span={6}>
              <Card
                title="QS Tester"
                style={{ width: 300 }}
                extra={<Icon type="diff" style={{ fontSize: '24px' }} />}
                hoverable="true"
                onClick={() => { dispatch(routerRedux.push({ pathname: '/tools/qs_tester' })); }}
              >
                Query Service 指标接口测试
              </Card>
            </Col>
            <Col span={6}>
              <Card
                title="JOB_TODO SQL GEN"
                style={{ width: 300 }}
                extra={<Icon type="file-text" style={{ fontSize: '24px' }} />}
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
                extra={<Icon type="link" style={{ fontSize: '24px' }} />}
                hoverable="true"
                onClick={() => { dispatch(routerRedux.push({ pathname: '/tools/api_auth' })); }}
              >
                模拟 GrowingIO 的 API 认证接口
              </Card>
            </Col>
          </Row>
          <Row className="row" gutter={16}>
            <Col span={6}>
              <Card
                title="原始数据导出（v2）"
                style={{ width: 300 }}
                extra={<Icon type="cloud-download" style={{ fontSize: '24px' }} />}
                hoverable="true"
                onClick={() => { dispatch(routerRedux.push({ pathname: '/tools/export_v2' })); }}
              >
                原始数据导出 v2 接口
              </Card>
            </Col>
          </Row>
        </Content>
      </div>
    );
  }
}

export default connect()(Home);
