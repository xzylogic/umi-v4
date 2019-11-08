import { componentUsedRecordsService, componentReleaseNotesService } from '@/services/server-blueprint/server-blueprint';

export default {
  namespace: 'server-blueprint',
  state: {
    list: {
      usedRecords: null,
      releaseNotes: [],
    },
    currentPage: {
      releaseNotes: 1,
    },
    totalElements: {
      releaseNotes: null,
    },
  },
  effects: {
    *fetchComponentUsedRecords({ payload }, { call, put }) {
      const { startValue, endValue } = payload;
      const res = yield call(componentUsedRecordsService, { startDate: startValue, endDate: endValue });
      if (res && res.success) {
        yield put({
          type: 'updateList',
          payload: {
            key: 'usedRecords',
            list: res.value,
            // currentPage: page,
            // totalElements: res.data.totalElements,
          },
        });
      }
    },
    *fetchComponentReleaseNotes({ payload }, { call, put }) {
      const { currentPage } = payload;
      const res = yield call(componentReleaseNotesService, { current: currentPage, size: 2 });
      console.log(res);
      if (res && res.success) {
        yield put({
          type: 'updateConcatList',
          payload: {
            key: 'releaseNotes',
            list: res.value.records,
            totalElements: res.value.total,
            currentPage,
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
        // currentPage: {
        //   ...state.currentPage,
        //   [payload.key]: payload.currentPage,
        // },
        // totalElements: {
        //   ...state.totalElements,
        //   [payload.key]: payload.totalElements,
        // },
      };
    },
    updateConcatList(state, { payload }) {
      return {
        ...state,
        list: {
          ...state.list,
          [payload.key]: state.list[payload.key].concat(payload.list),
        },
        currentPage: {
          ...state.currentPage,
          [payload.key]: payload.currentPage,
        },
        totalElements: {
          ...state.totalElements,
          [payload.key]: payload.totalElements,
        },
      };
    },
  },
};
