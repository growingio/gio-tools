import { testSample } from '../services/qs';

export default {

  namespace: 'qs',

  state: {
    testSample: '',
  },

  effects: {
    * testSample({ payload }, { call, put }) {
      const response = yield call(testSample, payload);
      yield put({
        type: 'reduceTestSample',
        payload: {
          testSample: response.data.data,
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
