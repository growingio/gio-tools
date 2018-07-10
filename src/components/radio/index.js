import React from 'react';
import RcCheckbox from 'rc-checkbox';
import Styles from './index.scss';

const Radio = ({ children, ...restProps }) => {
  return (
    <label className={Styles.shataRadio} >
      <RcCheckbox {...restProps} type="radio" />
      {children}
    </label>
  );
};

Radio.propTypes = {
};

export default Radio;
