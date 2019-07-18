import { message } from 'antd';
import { testSample } from '../services/qs';

export default {

  namespace: 'qs',

  state: {
    testSample: { },
  },

  effects: {
    * testSample({ payload }, { call, put }) {
      const response = yield call(testSample, payload);
      if (response.err) {
        message.error('请求异常!!! 请检查输入参数。');
        return;
      }
      yield put({
        type: 'reduceTestSample',
        payload: {
          testSample: response.data,
        },
      });
    },
  },

  reducers: {
    reduceTestSample(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
