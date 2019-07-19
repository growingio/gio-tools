import React, { Component } from 'react';
import { Form, Drawer, Row, Col, Input, Select, Button } from 'antd';

const Option = Select.Option;

class AddCase extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Drawer
        title="创建一个新的测试用例"
        width={720}
        onClose={this.props.onClose}
        visible={this.props.visible}
        maskClosable={false}
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="名称">
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: '请输入测试用例名称' }],
                })(<Input placeholder="请输入测试用例名称" />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="所属人">
                {getFieldDecorator('owner', {
                  rules: [{ required: true, message: '请输入所属人名字' }],
                })(<Input placeholder="请输入所属人名字" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="qs1地址">
                {getFieldDecorator('qsHost1', {
                  rules: [{ required: true, message: '输入qs1地址, 如: qs1:6060' }],
                })(
                  <Input
                    style={{ width: '100%' }}
                    addonBefore="http://"
                    placeholder="输入qs1地址, 如: qs1:6060"
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="qs2地址">
                {getFieldDecorator('qsHost2', {
                  rules: [{ required: true, message: '输入qs2地址, 如: qs2:6060' }],
                })(
                  <Input
                    style={{ width: '100%' }}
                    addonBefore="http://"
                    placeholder="输入qs2地址, 如: qs2:6060"
                  />,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="接口类型">
                {getFieldDecorator('type', {
                  initialValue: 'table',
                  rules: [
                    { required: true, message: '请选择请求接口类型' },
                  ],
                })(
                  <Select placeholder="请选择请求接口类型">
                    <Option value="table">table</Option>
                    <Option value="line">line</Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="描述">
                {getFieldDecorator('description', {
                  rules: [],
                })(
                  <Input.TextArea
                    rows={4}
                  />,
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <div
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e9e9e9',
            padding: '10px 16px',
            background: '#fff',
            textAlign: 'right',
          }}
        >
          <Button onClick={this.submit} type="primary">
            新建
          </Button>
        </div>
      </Drawer>
    );
  }
}

export default Form.create()(AddCase);
