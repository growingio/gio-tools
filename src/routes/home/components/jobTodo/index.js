import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import WrappedJobTodoFrom from './jobTodoForm';
import Styles from './index.scss';

class JobTodo extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  /** 处理表单数据 */
  handleSubmit = (e) => {
    e.preventDefault();
    this.formObj.getForm().validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
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
          <Col className="gen" span={14}>aaaaa</Col>
        </Row>
      </div>
    );
  }
}

export default connect()(JobTodo);
