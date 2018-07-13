import React, { Component } from 'react';
import { Form, Icon, Input, Button, AutoComplete, DatePicker, InputNumber, Checkbox } from 'antd';
import KV from 'cmt/kv';
import moment from 'moment';
import { dataSource } from './datasource';

const FormItem = Form.Item;

class JobTodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyValues: [{}],
    };
  }

  renderKeyValue(index, { key, value }) {
    return [
      <KV key={`KV${index}`} id={index} k={key} v={value} onChange={this.changeHandler.bind(this)} {...this.props} />,
      index === this.state.keyValues.length - 1 ?
        <Icon key={`plus${index}`} className="plus" type="plus" onClick={() => this.addKeyValue(index)} /> :
        <Icon key={`minus${index}`} className="minus" type="minus" onClick={() => this.minusKeyValue(index)} />,
    ];
  }

  addKeyValue() {
    this.state.keyValues.push({});
    this.setState({ keyValues: this.state.keyValues });
  }

  minusKeyValue(index) {
    if (this.state.keyValues.length === 1) {
      return;
    }
    this.state.keyValues = this.state.keyValues.filter((kv, i) => i !== index);
    this.setState({ keyValues: this.state.keyValues });
  }

  changeHandler(index, key, value) {
    const kv = this.state.keyValues[index];
    kv.key = key;
    kv.value = value;
    this.setState({ keyValues: this.state.keyValues });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: { xs: { span: 12 }, sm: { span: 10 } },
      wrapperCol: { xs: { span: 24 }, sm: { span: 12 } },
    };


    return (
      <Form onSubmit={this.props.handleSubmit}>
        <FormItem {...formItemLayout} label="class全名" className="class">
          {getFieldDecorator('class', {
            rules: [{ required: true, message: 'Please input your class!' }],
          })(
            <AutoComplete
              dataSource={dataSource}
              filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
              placeholder="请输入class全名"
            />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="根据startPos和endPos生成范围" className="posRange">
          {getFieldDecorator('posRange', {
            rules: [],
            initialValue: moment(),
          })(
            <DatePicker placeholder="请输入时间生成范围" />
          )}
          {getFieldDecorator('ifRange', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox className="ifRange">生成时间范围</Checkbox>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="其他配置参数" className="otherProps">
          {this.state.keyValues.map((kv, i) => this.renderKeyValue(i, kv))}
        </FormItem>
        <FormItem {...formItemLayout} label="权重" className="priority">
          {getFieldDecorator('priority', {
            rules: [],
            initialValue: -1,
          })(
            <InputNumber min={-100} max={100} placeholder="请输入权重" />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="初始状态" className="status">
          {getFieldDecorator('status', {
            rules: [],
            initialValue: 'CREATED',
          })(
            <Input className="status" placeholder="status" />
          )}
        </FormItem>
        <FormItem className="genButton">
          <Button type="primary" htmlType="submit" className="login-form-button sqlButton">
            生成SQL
          </Button>
          <Button type="primary" className="login-form-button encode" onClick={this.props.handleClick}>
            参数Encode
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(JobTodoForm);
