/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout, { SettingDrawer } from '@ant-design/pro-layout';
import React, { useEffect } from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import { Divider, Result, Button } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import { isAntDesignPro, getAuthorityFromRouter } from '@/utils/utils';
import logo from '../assets/logo.png';
import styles from './BasicLayout.less';

const noMatch = (
  <Result
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Button type="primary">
        <Link to="/user/login">Go Login</Link>
      </Button>
    }
  />
);
/**
 * use Authorized check all menu item
 */
// 请求获取菜单
// const [menuData, setMenuData] = useState([]);
//
// useEffect(() => {
//   // 这里是一个演示用法
//   // 真实项目中建议使用 dva dispatch 或者 umi-request
//   fetch('/api/example.json')
//     .then(response => response.json())
//     .then(data => {
//       setMenuData(data || []);
//     });
// }, []);

// 原路由菜单
const menuDataRender = menuList =>
  menuList.map(item => {
    const localItem = { ...item, children: item.children ? menuDataRender(item.children) : [] };
    return Authorized.check(item.authority, localItem, null);
  });

const defaultFooterDom = (
  <div className={styles.footContainer}>
    <a href="#">链接名称</a>
    <Divider type="vertical" />
    <a href="#">链接名称</a>
    <Divider type="vertical" />
    <a href="#">链接名称</a>
    <Divider type="vertical" />
    <a href="#">链接名称</a>
    <Divider type="vertical" />
    <a href="#">链接名称</a>
    <Divider type="vertical" />
    <a href="#">链接名称</a>
    <Divider type="vertical" />
    <a href="#">链接名称</a>
    <Divider type="vertical" />
    <a href="#">链接名称</a>
    <Divider type="vertical" />
    <a href="#">链接名称</a>
  </div>
);
// const defaultFooterDom = (
//   <DefaultFooter
//     copyright="2019 蚂蚁金服体验技术部出品"
//     links={[
//       {
//         key: 'Ant Design Pro',
//         title: 'Ant Design Pro',
//         href: 'https://pro.ant.design',
//         blankTarget: true,
//       },
//       {
//         key: 'github',
//         title: <Icon type="github" />,
//         href: 'https://github.com/ant-design/ant-design-pro',
//         blankTarget: true,
//       },
//       {
//         key: 'Ant Design',
//         title: 'Ant Design',
//         href: 'https://ant.design',
//         blankTarget: true,
//       },
//     ]}
//   />
// );

const footerRender = () => {
  if (!isAntDesignPro()) {
    return defaultFooterDom;
  }

  return (
    <>
      {defaultFooterDom}
      <div
        style={{
          padding: '0px 24px 24px',
          textAlign: 'center',
        }}
      >
        <a href="https://www.netlify.com" target="_blank" rel="noopener noreferrer">
          <img
            src="https://www.netlify.com/img/global/badges/netlify-color-bg.svg"
            width="82px"
            alt="netlify logo"
          />
        </a>
      </div>
    </>
  );
};

const BasicLayout = props => {
  const {
    dispatch,
    children,
    settings,
    location = {
      pathname: '/',
    },
    menu,
  } = props;
  /**
   * constructor
   */
  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
      dispatch({
        type: 'settings/getSetting',
      });
      dispatch({
        type: 'menu/fetchMenu',
      });
    }
  }, []);
  /**
   * init variables
   */
  console.log(props);

  const handleMenuCollapse = payload => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  }; // get children authority

  const authorized = getAuthorityFromRouter(props.route.routes, location.pathname || '/') || {
    authority: undefined,
  };
  return (
    <>
      <ProLayout
        logo={logo}
        onCollapse={handleMenuCollapse}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (menuItemProps.isUrl) {
            return defaultDom;
          }
          const menuPath = (menuItemProps.path === '/tool/unifyResourceCode') ?
            `${menuItemProps.path}?id=${menuItemProps.id}&menuCode=${menuItemProps.menuCode}`
            : menuItemProps.path;
          return <Link to={menuPath}>{defaultDom}</Link>;
        }}
        breadcrumbRender={(routers = []) => [
          {
            path: '/',
            breadcrumbName: formatMessage({
              id: 'menu.home',
              defaultMessage: 'Home',
            }),
          },
          ...routers,
        ]}
        itemRender={(route, params, routes, paths) => {
          const first = routes.indexOf(route) === 0;
          return first ? (
            <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
          ) : (
            <span>{route.breadcrumbName}</span>
          );
        }}
        footerRender={footerRender}
        menuDataRender={() => menu.menuCopy} // 开发时注释，请求的路由数据menu.menuCopy放入这里
        // menuDataRender={menuDataRender} // 上线时注释，此处menuDataRender是router.config.js文件里的路由
        formatMessage={formatMessage}
        rightContentRender={rightProps => <RightContent {...rightProps} />}
        {...props}
        {...settings}
      >
        <Authorized authority={authorized.authority} noMatch={noMatch}>
          {children}
        </Authorized>
      </ProLayout>
      <SettingDrawer
        settings={settings}
        onSettingChange={config =>
          dispatch({
            type: 'settings/changeSetting',
            payload: config,
          })
        }
      />
    </>
  );
};

export default connect(({ global, settings, menu }) => ({
  collapsed: global.collapsed,
  settings,
  menu,
}))(BasicLayout);
