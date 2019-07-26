import React from 'react';
import { Avatar as AntAvatar, Popover } from 'antd';

const Avatar = ({ loginUser = { }, dispatch }) => {
  const username = (loginUser && loginUser.username) || '';
  return (
    <Popover
      placement="bottom"
      content={<a onClick={() => dispatch({ type: 'user/logout' })}>退出</a>}
    >
      <AntAvatar style={{
          backgroundColor: '#FFF',
          color: '#F56A00',
          verticalAlign: 'middle',
          float: 'right',
          marginTop: '10px',
        }}
        size="large"
      >
        { username && username[0].toUpperCase() }
      </AntAvatar>
    </Popover>
  );
};

export default Avatar;
