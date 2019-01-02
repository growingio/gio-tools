import { queryRunJobs } from '../services/runJobs';

export default {

  namespace: 'runJobs',

  state: {
    jobResult: {},
  },

  effects: {
    * fetchList(_, { call, put }) {
      const response = yield call(queryRunJobs);
      yield put({
        type: 'queryList',
        payload: {
          jobResult: response.data,
        },
      });
    },
  },

  reducers: {
    queryList(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
