import React, { Component } from 'react';
import { connect } from 'dva';
import { Tabs, Card, Button, Avatar, Row, Col } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import PageLoading from '@/components/PageLoading';
// import { FormattedMessage } from 'umi-plugin-react/locale';
import styles from './index.less';

const { TabPane } = Tabs;
const { Meta } = Card;

const namespace = 'server-sdk';
const mapStateToProps = state => ({
  commonModulesList: state[namespace].list.commonModules,
  loading: state.loading.effects[`${namespace}/fetchCommonModules`],
});
const mapDispatchToProps = dispatch => ({
  fetchCommonModules: params =>
    dispatch({
      type: `${namespace}/fetchCommonModules`,
      payload: params,
    }),

  fetchCommonSiderList: params =>
    dispatch({
      type: `${namespace}/fetchCommonSiderList`,
      payload: params,
    }),
});

@connect(
  mapStateToProps,
  mapDispatchToProps,
)

export class index extends Component {
  componentDidMount() {
    const { fetchCommonModules, fetchCommonSiderList } = this.props;
    // const { menuCode } = this.props.location.query;
    fetchCommonModules({ componentType: 'SERVICE' }); // 'OCTOPUS'
    // fetchCommonSiderList({ needChild: true, resourceCode: menuCode, systemCode: 'SYSTEM_ROOT', userId: 1 });
  }

  render() {
    const { commonModulesList, loading } = this.props;
    return (
      <PageHeaderWrapper>
        <Tabs tabPosition="left" tabBarStyle={{ background: '#FFF' }}>
          <TabPane tab="组件类型一" key="1">
            <Row gutter={20} className={styles.componentType}>
              {
                commonModulesList.length >= 1 && commonModulesList.map(val => (
                  <Col span={8} key={val.id}>
                    <Card
                      title={val.name}
                      bordered={false}
                      headStyle={{ background: `url(${val.headIcon}) 17px 7px / 20px 20px no-repeat` }}>
                      {val.description}
                    </Card>
                  </Col>
                ))
              }
            </Row>
          </TabPane>
          <TabPane tab="组件类型二" key="2">
            <Card style={{ width: 240 }}>
              <Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title="组件名称"
              />
              <p>这是一条简介内容的显示这是一条简介内容的</p>
              <Button type="primary">点击查看</Button>
            </Card>
          </TabPane>
          <TabPane tab="组件类型三" key="3">
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
        { loading ? <PageLoading/> : null }
      </PageHeaderWrapper>
    )
  }
}

export default index;
