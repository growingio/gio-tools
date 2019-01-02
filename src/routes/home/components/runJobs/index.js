import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Layout, Table, Alert } from 'antd';
import Styles from './index.scss';

const { Header, Content } = Layout;
const emptyImg = require('icons/empty.png');

const columns = [{
  title: '请求ID',
  dataIndex: 'requestId',
  key: 'requestId',
  render: value => (
    <span>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={`http://kibana.infra.growingio.com/app/kibana#/discover?_g=(refreshInterval:(pause:!t,value:0),time:(from:now-15m,mode:quick,to:now))&_a=(columns:!(_source),index:a4a557c0-ceb2-11e8-9d51-91ff741de901,interval:auto,query:(language:lucene,query:"${value}"),sort:!('@timestamp',desc))`}
      >
        { value }
      </a>
    </span>
  ),
}, {
  title: '项目ID',
  dataIndex: 'ai',
  key: 'ai',
}, {
  title: '运行时间',
  dataIndex: 'runningTime',
  key: 'runningTime',
}, {
  title: '任务ID',
  dataIndex: 'jobId',
  key: 'jobId',
}];

@connect(({ runJobs }) => ({
  jobResult: runJobs.jobResult,
}))
class RunJobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    // 定时刷新页面
    // setInterval(() => {
    //   this.props.dispatch({
    //     type: 'runJobs/fetchList',
    //   });
    // }, 4000);
  }

  componentDidMount() {
    this.fetchJobList();
  }

  fetchJobList() {
    const { dispatch } = this.props;
    dispatch({
      type: 'runJobs/fetchList',
    });
  }

  render() {
    const { dispatch, jobResult = {} } = this.props;
    const { jobs = [], errorServers = [] } = jobResult;
    const jobsPartition = { };
    jobs.forEach((job) => {
      const values = jobsPartition[job.server] || [];
      values.push(job);
      jobsPartition[job.server] = values;
    });

    return (
      <div className={Styles.runJobs}>
        <Header className="header">
          <a onClick={() => { dispatch(routerRedux.push({ pathname: '/' })); }}>GrowingIO Tools &gt; QueryService Monitor</a>
        </Header>
        <Content className="content">
          {
            errorServers.length === 0 ?
              '' : (<Alert className="error" message={`机器超时或挂了: ${errorServers.join()}`} type="error" showIcon />)
          }
          {
            jobs.length === 0 ?
            (
              <div className="empty">
                <img src={emptyImg} alt="" with="800" height="300" />
                <span>空空如也, <a href="javascript:;" onClick={() => this.fetchJobList()}>点我刷新</a></span>
              </div>
            ) :
            Object.keys(jobsPartition).map((key, i) => (
              <div key={`${key}_${i}`}>
                <span>{ key }</span>
                <Table
                  rowKey={record => record.requestId}
                  columns={columns}
                  dataSource={jobsPartition[key]}
                  size="small"
                />
              </div>
            ))
          }
        </Content>
      </div>
    );
  }
}

export default connect()(RunJobs);
