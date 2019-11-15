// import { message } from 'antd';
import { menuService } from '@/services/system/menus/menus';

const sortMenu = order => (a, b) => a[order] - b[order];

const changeMenus = menusRoot => {
  const menu = menusRoot.sort(sortMenu('order')); // 根据menusRoot中的order进行排序
  return Array.isArray(menu) && menu.length >= 1 && menu.map(menus => {
    function changeMenu(childMenus) {
      if (Array.isArray(childMenus)) {
        /* eslint-disable */
        childMenus = childMenus[0];
        /* eslint-enable */
      }
      const newMenu = {};
      newMenu.path = childMenus.url;
      newMenu.name = childMenus.menuName;
      newMenu.order = childMenus.order;
      newMenu.menuCode = childMenus.menuCode;
      newMenu.id = childMenus.id;
      if (Array.isArray(childMenus.childrenMenuViewList) && childMenus.childrenMenuViewList.length >= 1) { // 如果子菜单是数组且长度>=1那么循环调用值赋值
        newMenu.children = [changeMenu(childMenus.childrenMenuViewList)];
      } else { // 直接值赋值
        newMenu.children = childMenus.childrenMenuViewList;
      }
      return newMenu;
    }

    return changeMenu(menus);
  });
};

export default {
  namespace: 'menu',

  state: {
    menuList: [],
    menuCopy: [{}],
    selectedMenu: null,
  },

  effects: {
    *fetchMenu(_, { call, put }) {
      const res = yield call(menuService, { userId: 1, systemCode: 'SYSTEM_ROOT' });
      if (res && res.success) {
        yield put({
          type: 'updateMenuList',
          payload: res.value && res.value.menuViewList,
        });
      }
    },
  },

  reducers: {
    updateMenuList(state, { payload }) {
      const menuCopy = changeMenus(payload);
      return {
        ...state,
        menuList: payload || [],
        menuCopy,
      };
    },
  },
};
