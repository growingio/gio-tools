import { queryRunJobs } from '../services/runJobs';

export default {

  namespace: 'runJobs',

  state: {
    jobs: [],
  },

  effects: {
    * fetchList(_, { call, put }) {
      const response = yield call(queryRunJobs);
      yield put({
        type: 'queryList',
        payload: {
          jobs: response.data,
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
