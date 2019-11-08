import React from 'react';
import CopyBlock from '@/components/CopyBlock';
import styles from './BasicLayout.less';

const Layout = ({ children, location }) => (
  <>
    <div className={location.pathname === '/index' ? styles.headerContainer : ''}>{children}</div>
    <CopyBlock id={Date.now()} />
  </>
);

export default Layout;
