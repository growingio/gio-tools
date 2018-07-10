import React from 'react';
import Styles from './index.scss';

const TYPES = {
  // logo: require('icons/logo.png'),
  // tabbar 的图标
  home: require('icons/home.png'),
  homed: require('icons/homed.png'),
  work: require('icons/work.png'),
  worked: require('icons/worked.png'),
  art: require('icons/art.png'),
  arted: require('icons/arted.png'),
  dynamic: require('icons/dynamic.png'),
  dynamiced: require('icons/dynamiced.png'),
  me: require('icons/me.png'),
  med: require('icons/med.png'),
  // 其他图标
  like: require('icons/like.png'),
  liked: require('icons/liked.png'),
  likew: require('icons/like-white.png'),
  location: require('icons/location.png'),
  // plus
  plus: require('icons/plus-inactive.png'),
  plused: require('icons/plus-active.png'),
  plusing: require('icons/plus-white.png'),
  // group
  group: require('icons/group.png'),
  // down
  down: require('icons/down.png'),
  // warning
  warning: require('icons/warning.png'),
  // share
  share: require('icons/share.png'),
  // chat
  chat: require('icons/chat.png'),
  // agree / agreed
  agree: require('icons/agree.png'),
  agreed: require('icons/agreed.png'),
  // edit
  edit: require('icons/edit.png'),
  // remove
  remove: require('icons/remove.png'),
  // star
  star: require('icons/star.png'),
  // arrow
  arrowdown: require('icons/arrow-down.png'),
  // time
  time: require('icons/time.png'),
  // checked
  checked: require('icons/checked.png'),
  // earth
  earth: require('icons/earth.png'),
  // eye
  eye: require('icons/eye.png'),
  // pencil
  pencil: require('icons/pencil.png'),
  // delete
  delete: require('icons/delete.png'),
  // check
  check: require('icons/check.png'),
  // export
  export: require('icons/export.png'),
  // tag
  tag: require('icons/tag.png'),
  // smile
  smile: require('icons/smile.png'),
  // cart
  cart: require('icons/cart.png'),
  // star-white
  starw: require('icons/star-white.png'),
};

const Icons = ({ type, icon, className = '', ...restProps }) => (
  <div className={`${Styles.saIcon} ${Styles[type]} ${className}`} {...restProps} >
    { icon.indexOf('icon-') === -1 ? <img src={TYPES[icon]} alt="" /> : <i className={`iconfont ${icon}`} /> }
  </div>
);
Icons.defaultProps = {
  type: 'icon',
};
export default Icons;
