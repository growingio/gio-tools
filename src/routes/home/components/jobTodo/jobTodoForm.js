import React, { Component } from 'react';
import { Form, Icon, Input, Button, AutoComplete, DatePicker, InputNumber } from 'antd';

const FormItem = Form.Item;

class JobTodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyValues: [0],
    };
  }

  renderKeyValue(index) {
    const { getFieldDecorator } = this.props.form;

    return [
      getFieldDecorator(`key${index}`, {
        rules: [],
      })(
        <Input className="key" placeholder="key" key={`key${index}`} />
      ),
      getFieldDecorator(`value${index}`, {
        rules: [],
      })(
        <Input className="value" placeholder="value" key={`value${index}`} />
      ),
      index === this.state.keyValues.length - 1 ?
        <Icon key={`plus${index}`} className="plus" type="plus" onClick={() => this.addKeyValue(index)} /> :
        <Icon key={`minus${index}`} className="minus" type="minus" onClick={() => this.minusKeyValue(index)} />,
    ];
  }

  addKeyValue(index) {
    const last = this.state.keyValues[index] || 0;
    this.state.keyValues.push(last + 1);
    this.setState({ keyValues: this.state.keyValues });
  }

  minusKeyValue(index) {
    if (this.state.keyValues.length === 1) {
      return;
    }
    this.state.keyValues = this.state.keyValues.filter((v, i) => i !== index);
    this.setState({ keyValues: this.state.keyValues });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: { xs: { span: 24 }, sm: { span: 12 } },
      wrapperCol: { xs: { span: 24 }, sm: { span: 12 } },
    };
    const keyValueItemLayout = {
      labelCol: { xs: { span: 24 }, sm: { span: 12 } },
      wrapperCol: { xs: { span: 24 }, sm: { span: 12 } },
    };

    const dataSource = ['Burns Bay Road', 'Downing Street', 'Wall Street'];

    return (
      <Form onSubmit={this.props.handleSubmit}>
        <FormItem {...formItemLayout} label="class全名">
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
          })(
            <DatePicker placeholder="请输入时间生成范围" />
          )}
        </FormItem>
        <FormItem {...keyValueItemLayout} label="其他配置参数" className="otherProps">
          {this.state.keyValues.map((v, i) => this.renderKeyValue(i))}
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
          <Button type="primary" htmlType="submit" className="login-form-button">
            生成SQL
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(JobTodoForm);
