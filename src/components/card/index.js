import React from 'react';
import { Card as AndCard } from 'antd';

const Card = ({ title, children, ...restProps }) => {
  return (
    <AndCard title={title} {...restProps}>
      {children}
    </AndCard>
  );
};

Card.propTypes = {
};

export default Card;
