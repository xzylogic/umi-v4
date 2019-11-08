import React, { Component } from 'react';
import { Tabs, Card, Button, Avatar, Row, Col } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
// import { FormattedMessage } from 'umi-plugin-react/locale';
import styles from '../index.less';

const { TabPane } = Tabs;
const { Meta } = Card;
export class index extends Component {
  componentDidMount() {}

  render() {
    return (
      <PageHeaderWrapper>
        <Tabs tabPosition="left" tabBarStyle={{ background: '#FFF' }}>
            <TabPane tab="资源码管理" key="1">
              <Row gutter={20} className={styles.resourceCode}>
                {
                  [1, 2, 3, 4, 5, 6, 7, 8, 9].map(val => (
                    <Col span={3} key={val}>
                      <Card
                        hoverable
                        style={{ width: 80 }}
                        cover={<img alt="资源码" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                      >
                        <Meta title="Europe Street beat" description="www.instagram.com" />
                      </Card>
                    </Col>
                  ))
                }
              </Row>
            </TabPane>
            <TabPane tab="资源码分组管理" key="2">
              <Card style={{ width: 240 }}>
                <Meta
                  avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  title="组件名称"
                />
                <p>这是一条简介内容的显示这是一条简介内容的</p>
                <Button type="primary">点击查看</Button>
              </Card>
            </TabPane>
            <TabPane tab="自由String自动生成" key="3">
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
