import React, { Component } from 'react';
import { connect } from 'dva';
import { Layout, Menu, Form } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { FreeString } from './freeString';
import styles from '../index.less';

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

const namespace = 'unifyResourceCode';
const mapStateToProps = state => ({
  resourceCodeList: state[namespace].list.resourceCode,
});
const mapDispatchToProps = dispatch => ({
  fetchResource: params =>
    dispatch({
      type: `${namespace}/fetchResource`,
      payload: params,
    }),
});

@connect(
  mapStateToProps,
  mapDispatchToProps,
)

export class index extends Component {

  state = {
    content: (
      <Content style={{ padding: '0 24px', minHeight: 280 }}>
        <div>简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介</div>
        <div>简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介</div>
        <div>简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介</div>
        <div>简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介</div>
        <div>简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介</div>
        <div>简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介</div>
      </Content>
    ),
  };

  componentDidMount() {
    const { fetchResource } = this.props;
    const { menuCode } = this.props.location.query;
    fetchResource({ needChild: true, resourceCode: menuCode, systemCode: 'SYSTEM_ROOT', userId: 1 });
  }

  render() {
    // const resourceCodeList = [
    //   { extendValue: 'Y', parentResourceId: 7, resourceId: 8, description: '统一资源码中心' },
    //   { extendValue: 'Y', parentResourceId: 7, resourceId: 9, description: '自由String自动生成' },
    //   { extendValue: 'Y', parentResourceId: 8, resourceId: 10, description: '发货人所肩负的' },
    //   { extendValue: 'Y', parentResourceId: 8, resourceId: 11, description: '1111111111' },
    //   { extendValue: '', parentResourceId: 10, resourceId: 12, description: '222222222222' },
    //   { extendValue: '', parentResourceId: 10, resourceId: 13, description: '33333333333' },
    // ];
    const { resourceCodeList } = this.props;
    const { id } = this.props.location.query;
    const siderFirst = resourceCodeList.filter(val => val.parentResourceId === +id) || [];

    /* eslint-disable */
    siderFirst.map(first => {
      first.children = resourceCodeList.filter(second => (second.parentResourceId === first.resourceId)) || [];
      first.children.length >= 1 && first.children.map(second => {
        second.children = resourceCodeList.filter(third => (third.parentResourceId === second.resourceId)) || [];
      })
    });
    /* eslint-enable */

    const siderHandler = data => {
      console.log(data);
      switch (data.extendValue) {
        case 'FOLDER':
          break;
        case 'OUTER_LINK':
          window.open(data.url, '_blank');
          break;
        case 'NEST_LINK':
          this.setState({
            content: (
              <iframe title={data.description} src={data.url} style={{ width: '100vw', height: '70vh' }} />
            ),
          });
          break;
        case 'INNER_LINK':
          this.setState({
            content: <FreeString form={this.props.form}/>,
          });
          // this.setState({
          //   content: (
          //     <Content style={{ padding: '0 24px', minHeight: 280 }}>
          //       <Row gutter={20} className={styles.resourceCode}>
          //         {
          //           [1, 2, 3, 4, 5, 6, 7, 8, 9].map(val => (
          //             <Col span={3} key={val}>
          //               <Card
          //                 hoverable
          //                 cover={<img alt="资源码" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          //               >
          //                 <Meta title="Europe Street beat" description="www.instagram.com" />
          //               </Card>
          //             </Col>
          //           ))
          //         }
          //       </Row>
          //     </Content>
          //   ),
          // });
          break;
        default:
          break;
      }
    };

    const siderBar = (
      <Menu
        mode="inline"
        style={{ overflow: 'hidden auto', maxHeight: '85vh' }}
      >
        {
          siderFirst.map(first => {
            if (first.children.length < 1) {
              return (
                <Menu.Item key={first.resourceId} onClick={() => siderHandler(first)}>{first.description}</Menu.Item>
              )
            }
            return (
              <SubMenu key={first.resourceId} title={<span>{first.description}</span>}>
                {
                  first.children.map(second => {
                    if (second.children.length < 1) {
                      return <Menu.Item key={second.resourceId} onClick={() => siderHandler(second)}>{second.description}</Menu.Item>
                    }
                    return (
                      <SubMenu key={second.resourceId} title={<span>{second.description}</span>}>
                        {
                          second.children.map(third => <Menu.Item key={third.resourceId} onClick={() => siderHandler(third)}>{third.description}</Menu.Item>)
                        }
                      </SubMenu>
                    )
                  })
                }
              </SubMenu>
            )
          })
        }
      </Menu>
    );

    return (
      <PageHeaderWrapper>
        <div className={styles.resource}>
          {
            siderFirst.length >= 1 ? (
              <Layout style={{ background: '#FFF' }}>
                <Sider width={200} style={{ background: 'none' }}>
                  {siderBar}
                </Sider>
                {this.state.content}
              </Layout>
            ) : ''
          }
        </div>
      </PageHeaderWrapper>
    )
  }
}

export default Form.create()(index);
