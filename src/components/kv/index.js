import React from 'react';
import { Input } from 'antd';

const changeHandler = (e, props, onChange) => {
  if (!e || !e.target) {
    return e;
  }
  const { id, value, dataset } = e.target;
  const { kvid } = dataset;
  let k;
  let v;
  if (id.startsWith('key')) {
    k = value;
    v = props.form.getFieldValue(`value${kvid}`);
  } else {
    k = props.form.getFieldValue(`key${kvid}`);
    v = value;
  }
  if (onChange) {
    onChange(kvid, k, v);
  }
};

const KV = ({ id, k, v, onChange, ...restProps }) => {
  const { getFieldDecorator } = restProps.form;

  return [
    getFieldDecorator(`key${id}`, {
      rules: [],
      initialValue: k || '',
      onChange: e => changeHandler(e, restProps, onChange),
    })(
      <Input className="key" placeholder="key" key={`key${id}`} data-kvid={id} />
    ),
    getFieldDecorator(`value${id}`, {
      rules: [],
      initialValue: v || '',
      onChange: e => changeHandler(e, restProps, onChange),
    })(
      <Input className="value" placeholder="value" key={`value${id}`} data-kvid={id} />
    ),
  ];
};

KV.propTypes = { };

export default KV;
