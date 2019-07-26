import React from 'react';
import { Avatar as AntAvatar, Popover } from 'antd';

const Avatar = ({ loginUser = { }, dispatch }) => {
  const username = (loginUser && loginUser.username) || '';
  return (
    <Popover
      placement="bottom"
      content={<a onClick={() => dispatch({ type: 'user/logout' })}>退出</a>}
    >
      <div style={{ float: 'right', fontSize: '16px', color: '#FFF' }}>
        <AntAvatar style={{
          backgroundColor: '#FFF',
          color: '#F56A00',
          verticalAlign: 'middle',
          marginRight: '8px',
          }}
          size="large"
        >
          { username && username[0].toUpperCase() }
        </AntAvatar>
        <span>{ username }</span>
      </div>
    </Popover>
  );
};

export default Avatar;
