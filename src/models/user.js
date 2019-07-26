import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { current, login, logout } from '../services/user';

export default {

  namespace: 'user',

  state: {
    loginUser: null,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(() => {
        dispatch({
          type: 'current',
        });
      });
    },
  },

  effects: {
    * login({ payload }, { call, put }) {
      const { err, data } = yield call(login, payload.username, payload.password);
      if (err) {
        const errRes = yield err.response.json();
        if (errRes.message === 'LoginError') {
          message.error('账号或密码错误.');
        }
        return;
      }
      if (data) {
        yield put({
          type: 'reduceLogin',
          payload: {
            loginUser: data,
          },
        });
        yield put(routerRedux.push('/'));
      }
    },

    * current({ redirect }, { call, put }) {
      const { err, data } = yield call(current);
      if (err && err.message === 'Unauthorized') {
        // message.error('登录失效, 请重新登录');
        if (redirect) {
          yield put(routerRedux.push(redirect));
        }
        return;
      }
      if (data) {
        yield put({
          type: 'reduceLogin',
          payload: {
            loginUser: data,
          },
        });
      }
    },

    * logout(_, { call, put }) {
      const { err } = yield call(logout);
      if (err) {
        message.error('服务器异常.');
        return;
      }
      yield put({
        type: 'reduceLogin',
        payload: {
          loginUser: null,
        },
      });
      yield put(routerRedux.push('/login'));
    },

  },

  reducers: {
    reduceLogin(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
