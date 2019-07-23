import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import produce from 'immer';
import * as _ from 'underscore';
import moment from 'moment';
import JSON5 from 'json5';
import { Layout, Form, Table, Input, Button, Icon, Modal, Row, Col, message } from 'antd';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import { Diff2Html } from 'diff2html';
import 'diff2html/dist/diff2html.min.css';
import AddCaseForm from './addCase';

import Styles from './index.scss';

const FormItem = Form.Item;
const { Header, Content } = Layout;

@connect(({ loading, qs }) => ({
  testSample: qs.testSample,
  cases: qs.cases,
  loading: loading.global,
}))
class QsTester extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSampleDiffModal: false,
      showAddCaseModal: false,
      sampleModal: {
        qsHost1: '',
        qsHost2: '',
        qsPath: '',
        qsBody: '{}',
      },
    };
    this.qsBodyEditor = null;
    this.submitTestSample = this.submitTestSample.bind(this);
    this.sampleModalInputChange = this.sampleModalInputChange.bind(this);
    this.sampleModalBodyChange = this.sampleModalBodyChange.bind(this);
  }

  componentDidMount() {
    this.fetchCases();
  }

  fetchCases() {
    const { dispatch } = this.props;
    dispatch({
      type: 'qs/listAllCases',
    });
  }

  prettyHtml = () => {
    const { testSample } = this.props;
    return Diff2Html.getPrettyHtml(testSample.diff || '', {
      inputFormat: 'diff',
      showFiles: false,
      outputFormat: 'side-by-side',
      matching: 'none', // lines || words || none
      synchronisedScroll: false,
      matchWordsThreshold: 0.25,
      matchingMaxComparisons: 2500,
    });
  }

  submitTestSample() {
    const { qsHost1, qsHost2, qsPath, qsBody } = this.state.sampleModal;
    // 校验输入
    if (_.isEmpty(qsHost1) && _.isEmpty(qsHost2)) {
      message.error('至少输入一个qs的地址');
      return;
    }
    if (_.isEmpty(qsPath)) {
      message.error('请输入一个qs的路径');
      return;
    }
    try {
      JSON5.parse(qsBody);
    } catch (e) {
      message.error('请输入正确的请求body');
      return;
    }
    this.props.dispatch({
      type: 'qs/testSample',
      payload: {
        qsHost1,
        qsHost2,
        qsPath,
        qsBody,
      },
    });
  }

  sampleModalInputChange(e) {
    const { value, id } = e.target;
    this.setState(
      produce((d) => {
        d.sampleModal[id] = value;
      })
    );
  }

  sampleModalBodyChange(editor, data, value) {
    this.setState(
      produce((d) => {
        d.sampleModal.qsBody = value;
      })
    );
  }

  render() {
    const { dispatch, loading, cases = [] } = this.props;
    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '所属人',
        dataIndex: 'owner',
        key: 'owner',
      },
      {
        title: '描述',
        dataIndex: 'description',
        key: 'description',
      },
      {
        title: '创建时间',
        dataIndex: 'createAt',
        key: 'createAt',
        render: t => moment(t).format('YYYY-MM-DD HH:mm:ss'),
      },
    ];

    return (
      <div className={Styles.qsTester}>
        <Header className="header">
          <a onClick={() => { dispatch(routerRedux.push({ pathname: '/' })); }}>GrowingIO Tools &gt; QS 测试</a>
        </Header>
        <Content className="content">
          <div className="form">
            <Form layout="inline">
              <FormItem label="">
                <Button type="default" onClick={() => this.setState({ showSampleDiffModal: true })}>简单测试</Button>
              </FormItem>
              <FormItem label="">
                <Button type="primary" onClick={() => this.setState({ showAddCaseModal: true })}><Icon type="plus" />
                  新建用例
                </Button>
              </FormItem>
            </Form>
          </div>
          <Table {...this.state}
            columns={columns}
            dataSource={cases}
            loading={loading}
            rowKey="_id"
            bordered
          />
          <Modal
            className={Styles.qsTesterModal}
            visible={this.state.showSampleDiffModal}
            title="简单测试"
            keyboard={false}
            maskClosable={false}
            width={1200}
            onOk={this.handleOk}
            onCancel={() => this.setState({ showSampleDiffModal: false })}
            footer={null}
          >
            <Form>
              <Row type="flex" justify="space-around" align="middle">
                <Col span={5}>
                  <FormItem label="" style={{ height: '20px' }} >
                    <Input id="qsHost1" placeholder="输入qs1地址, 如: qs1:6060" onChange={this.sampleModalInputChange} />
                  </FormItem>
                  <FormItem label="" style={{ height: '20px' }} >
                    <Input id="qsHost2" placeholder="输入qs2地址, 如: qs2:6060" onChange={this.sampleModalInputChange} />
                  </FormItem>
                </Col>
                <Col span={18}>
                  <FormItem label="" style={{ height: '20px' }} >
                    <Input id="qsPath" placeholder="输入qs路径, 如: /stat/metric/v2/table" onChange={this.sampleModalInputChange} />
                  </FormItem>
                </Col>
              </Row>
            </Form>
            <Row type="flex" justify="space-around" align="middle">
              <Col className="req" span={6}>
                <CodeMirror
                  id="qsBody"
                  editorDidMount={(editor) => { this.qsBodyEditor = editor; }}
                  value={this.state.sampleModal.qsBody}
                  onBeforeChange={this.sampleModalBodyChange}
                  options={{ mode: 'javascript', tabSize: 2 }}
                />
              </Col>
              <Col className="go" span={2}>
                <Button type="dashed" onClick={this.submitTestSample}> 提交 <Icon type="right" /></Button>
              </Col>
              <Col className="res" span={16}>
                <div dangerouslySetInnerHTML={{ __html: this.prettyHtml() }} />
              </Col>
            </Row>
          </Modal>
        </Content>
        <AddCaseForm visible={this.state.showAddCaseModal} onClose={() => this.setState({ showAddCaseModal: false })} />
      </div>
    );
  }
}

export default connect()(QsTester);
