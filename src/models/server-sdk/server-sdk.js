import { commonModulesService, commonSiderListService } from '@/services/server-sdk/server-sdk';

export default {
  namespace: 'server-sdk',

  state: {
    list: {
      commonModules: [],
      commonList: [],
    },
  },

  effects: {
    *fetchCommonModules({ payload }, { call, put }) {
      const res = yield call(commonModulesService, payload);
      if (res && res.success) {
        yield put({
          type: 'updateList',
          payload: {
            key: 'commonModules',
            list: res.value,
          },
        });
      }
    },

    *fetchCommonSiderList({ payload }, { call, put }) {
      const res = yield call(commonSiderListService, payload);
      if (res && res.success) {
        yield put({
          type: 'updateList',
          payload: {
            key: 'commonList',
            list: res.value,
          },
        });
      }
    },
  },

  reducers: {
    updateList(state, { payload }) {
      return {
        ...state,
        list: {
          ...state.list,
          [payload.key]: payload.list,
        },
      };
    },
  },
};
