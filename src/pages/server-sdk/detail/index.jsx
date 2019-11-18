import React, { Component } from 'react';
import { connect } from 'dva';
import { Tabs, Card, Button, Avatar } from 'antd';
import Scheme from './components/Scheme';
import Record from './components/Record';
// import { FormattedMessage } from 'umi-plugin-react/locale';
// import styles from '../index.less';

const { TabPane } = Tabs;
const { Meta } = Card;

const namespace = 'server-sdk';
const mapStateToProps = state => ({
  // commonModulesList: state[namespace].list.commonModules,
  // loading: state.loading.effects[`${namespace}/fetchCommonModules`],
});
const mapDispatchToProps = dispatch => ({
  // fetchCommonModules: params =>
  //   dispatch({
  //     type: `${namespace}/fetchCommonModules`,
  //     payload: params,
  //   }),
  //
  // fetchCommonSiderList: params =>
  //   dispatch({
  //     type: `${namespace}/fetchCommonSiderList`,
  //     payload: params,
  //   }),
});

@connect(
  mapStateToProps,
  mapDispatchToProps,
)

export class index extends Component {
  componentDidMount() {
    // const { fetchCommonModules, fetchCommonSiderList } = this.props;
    // const { menuCode } = this.props.location.query;
    // fetchCommonModules({ componentType: 'SERVICE' }); // 'OCTOPUS'
    // fetchCommonSiderList({ needChild: true, resourceCode: menuCode, systemCode: 'SYSTEM_ROOT', userId: 1 });
  }

  render() {
    // const { commonModulesList, loading } = this.props;
    return (
      <>
        <Tabs tabPosition="left" style={{ background: '#FFF' }}>
          <TabPane tab="实现方案" key="1">
            <Scheme />
          </TabPane>
          <TabPane tab="项目接入记录" key="2">
            <Record />
          </TabPane>
          <TabPane tab="文档" key="3">
            <Card style={{ width: 240 }}>
              <Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title="组件名称"
              />
              <p>这是一条简介内容的显示这是一条简介内容的</p>
              <Button type="primary">点击查看</Button>
            </Card>
          </TabPane>
        </Tabs>
      </>
    )
  }
}

export default index;
