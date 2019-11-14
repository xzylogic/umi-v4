import { resourceService } from '@/services/tool/tool';

export default {
  namespace: 'unifyResourceCode',

  state: {
    list: {
      resourceCode: [],
    },
  },

  effects: {
    *fetchResource({ payload }, { call, put }) {
      const res = yield call(resourceService, payload);
      if (res && res.success) {
        yield put({
          type: 'updateList',
          payload: {
            key: 'resourceCode',
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
