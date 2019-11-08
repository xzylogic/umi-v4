import React, { Component } from 'react';
import { connect } from 'dva';
import { Tabs, Card, Button, Avatar, Row, Col } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
// import { FormattedMessage } from 'umi-plugin-react/locale';
import styles from '../../index.less'

const { TabPane } = Tabs;
const { Meta } = Card;

const namespace = 'server-sdk';
const mapStateToProps = state => ({
  commonModulesList: state[namespace].list.commonModules,
});
const mapDispatchToProps = dispatch => ({
  fetchCommonModules: params =>
    dispatch({
      type: `${namespace}/fetchCommonModules`,
      payload: params,
    }),
});

@connect(
  mapStateToProps,
  mapDispatchToProps,
)

export class index extends Component {
  componentDidMount() {
    this.props.fetchCommonModules({ componentType: 'SERVICE' }); // 'OCTOPUS'
  }

  render() {
    const { commonModulesList } = this.props;
    return (
      <PageHeaderWrapper>
        <Tabs tabPosition="left" tabBarStyle={{ background: '#FFF' }}>
          <TabPane tab="组件类型一" key="1">
            <Row gutter={20} className={styles.componentType}>
              {
                commonModulesList.length >= 1 && commonModulesList.map(val => (
                  <Col span={6} key={val.id}>
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
      </PageHeaderWrapper>
    )
  }
}

export default index;
