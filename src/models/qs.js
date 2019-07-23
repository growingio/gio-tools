import { message } from 'antd';
import { testSample, listCases } from '../services/qs';

export default {

  namespace: 'qs',

  state: {
    testSample: { },
    cases: [],
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

    * listAllCases({ payload }, { call, put }) {
      const response = yield call(listCases, payload);
      yield put({
        type: 'reduceListAllCases',
        payload: {
          cases: response.data,
        },
      });
    },
  },

  reducers: {
    reduceTestSample(state, action) {
      return { ...state, ...action.payload };
    },
    reduceListAllCases(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
