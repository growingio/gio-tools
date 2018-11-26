import React, { Component } from 'react';
import { Form, Input, Icon, Select, Button, DatePicker } from 'antd';
import moment from 'moment';

const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

class ExportV2Form extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <FormItem
          className="ai"
          {...formItemLayout}
          label="项目AI"
        >
          {getFieldDecorator('ai', {
            rules: [{ required: true, message: '请输入AI' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="项目AI" />
          )}
        </FormItem>
        <FormItem
          className="export-type"
          {...formItemLayout}
          label="类型"
        >
          {getFieldDecorator('type', {
            initialValue: 'visit',
          })(
            <Select>
              <Option value="visit">visit</Option>
              <Option value="page">page</Option>
              <Option value="action">action</Option>
              <Option value="action_tag">action_tag</Option>
              <Option value="custom_attr">custom_attr</Option>
              <Option value="ads_track_click">ads_track_click</Option>
              <Option value="ads_track_activation">ads_track_activation</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          className="date"
          {...formItemLayout}
          label="时间"
        >
          {getFieldDecorator('date', {
            rules: [],
            initialValue: moment(),
          })(
            <DatePicker placeholder="请输入时间" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" onClick={this.props.handleClick}>查询</Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(ExportV2Form);
