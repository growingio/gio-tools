import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/mode/sql/sql';
import 'codemirror/lib/codemirror.css';
import WrappedJobTodoFrom from './jobTodoForm';
import Styles from './index.scss';

class JobTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sql: '',
    };
  }

  /** 处理表单数据 */
  handleSubmit = (e) => {
    e.preventDefault();
    this.formObj.getForm().validateFields((err, values) => {
      if (!err) {
        // 获取值
        const { class: clazz, posRange, status, priority } = values;
        // 获取 kv
        const kvs = this.getKV(values);
        // 生成sql
        const sql = this.generateSql(clazz, posRange, status, priority, kvs);
        this.setState({ sql });
      }
    });
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
  generateSql = (clazz, posRange, status, priority, kvs = []) => {
    // kvs生成string
    const kvStrs = kvs.length === 0 ? '' : `,${kvs.map(v => `"${v.key}":"${v.value}"`).join(',')}`;
    // 根据时间生成
    const strs = [];
    let now = posRange.startOf('day').utc();
    for (let i = 0; i < 24; i++) {
      const startPos = now.format('YYYYMMDDHHmm');
      now = now.add(1, 'h');
      const stopPos = now.format('YYYYMMDDHHmm');
      const str = `('${clazz}','{"startPos":"${startPos}","stopPos":"${stopPos}"${kvStrs}}', ${priority}, '${status}', now())`;
      strs.push(str);
    }
    return `INSERT INTO job_todo (clz, param, priority, status, created_at) VALUES \n${strs.join(',\n')};`;
  }

  render() {
    return (
      <div className={Styles.jobTodo}>
        <Row>
          <Col className="form" span={10}>
            <WrappedJobTodoFrom
              ref={ref => this.formObj = ref}
              handleSubmit={this.handleSubmit}
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
