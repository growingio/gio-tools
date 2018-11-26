import { exportLinksV2 } from '../services/exportLinks';

export default {

  namespace: 'exportLinks',

  state: {
    links: [],
  },

  effects: {
    * fetchLinks({ payload }, { call, put }) {
      const response = yield call(exportLinksV2, payload.ai, payload.type, payload.date);
      yield put({
        type: 'queryLinks',
        payload: {
          links: response.data,
        },
      });
    },
  },

  reducers: {
    queryLinks(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
