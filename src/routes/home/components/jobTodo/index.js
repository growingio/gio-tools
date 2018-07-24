import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Layout, Row, Col } from 'antd';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/mode/sql/sql';
import 'codemirror/lib/codemirror.css';
import WrappedJobTodoFrom from './jobTodoForm';
import Styles from './index.scss';

import { dataSourceObj } from './datasource';

const { Header } = Layout;

class JobTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sql: '',
    };
  }

  /** 处理表单数据 */
  handleSubmit = (e, encode = false) => {
    e.preventDefault();
    this.formObj.getForm().validateFields((err, values) => {
      if (!err) {
        // 获取值
        const { class: clazz, posRange, status, priority, ifRange } = values;
        // 获取 kv
        const kvs = this.getKV(values);
        // 生成sql
        const sql = this.generateSql(clazz, posRange, status, priority, kvs, ifRange, encode);
        this.setState({ sql });
      }
    });
  }

  handleClick = (e) => {
    this.handleSubmit(e, true);
  }

  getKV = (values) => {
    const kvs = [];
    Object.keys(values || {}).forEach((k) => {
      if (k.startsWith('key')) {
        const id = k.slice(3);
        const key = values[k];
        const value = values[`value${id}`];
        if (!!key || !!value) {
          kvs.push({ key, value });
        }
      }
    });
    return kvs;
  };

  /** 生成 insert 的 sql */
  generateSql = (clazz, posRange, status, priority, kvs = [], ifRange, encode) => {
    // kvs生成string
    const kvStrs = kvs.length === 0 ? '' : `,${kvs.map(v => `"${v.key}":"${v.value}"`).join(',')}`;
    // 根据时间生成
    const strs = [];
    let now = posRange.startOf('day').clone().utc();
    if (ifRange === true) {
      for (let i = 0; i < 24; i++) {
        const startPos = now.format('YYYYMMDDHHmm');
        now = now.add(1, 'h');
        const stopPos = now.format('YYYYMMDDHHmm');
        const confStr = `{"startPos":"${startPos}","stopPos":"${stopPos}"${kvStrs}}`;
        const str = `('${dataSourceObj[clazz]}', '${encode ? encodeURIComponent(confStr) : confStr}', ${priority}, '${status}', now())`;
        strs.push(str);
      }
    } else { // 否则生成天范围
      const startPos = now.format('YYYYMMDDHHmm');
      now = now.add(1, 'd');
      const stopPos = now.format('YYYYMMDDHHmm');
      const confStr = `{"startPos":"${startPos}","stopPos":"${stopPos}"${kvStrs}}`;
      const str = `('${dataSourceObj[clazz]}', '${encode ? encodeURIComponent(confStr) : confStr}', ${priority}, '${status}', now())`;
      strs.push(str);
    }

    return `INSERT INTO job_todo (clz, param, priority, status, created_at) VALUES \n${strs.join(',\n')};`;
  }

  render() {
    const { dispatch } = this.props;

    return (
      <div className={Styles.jobTodo}>
        <Header className="header">
          <a onClick={() => { dispatch(routerRedux.push({ pathname: '/' })); }}>GrowingIO Tools &gt; JOB_TODO SQL GEN</a>
        </Header>
        <Row>
          <Col className="form" span={10}>
            <WrappedJobTodoFrom
              ref={ref => this.formObj = ref}
              handleSubmit={this.handleSubmit}
              handleClick={this.handleClick}
              {...this.props}
            />
          </Col>
          <Col className="gen" span={14}>
            <CodeMirror
              value={this.state.sql}
              onChange={this.codeChange}
              options={{ mode: 'sql' }}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect()(JobTodo);
