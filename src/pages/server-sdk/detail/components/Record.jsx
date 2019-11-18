import React, { Component } from 'react';
import { DatePicker, Typography, Input, Row, Col, Table, Divider } from 'antd';
import styles from '../../index.less';

const { Title } = Typography;
const { RangePicker } = DatePicker;

export class index extends Component {
  componentDidMount() {}

  onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  render() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
        <a>Invite {record.name}</a>
        <Divider type="vertical" />
        <a>Delete</a>
      </span>
        ),
      },
    ];

    const data = [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
      },
      {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
      },
    ];

    return (
      <div className={styles.record}>
        <Title level={2}>项目接入记录</Title>
        <Row>
          <Col md={2}>
            <span className={styles.label}>接入时间:</span>
          </Col>
          <Col md={8}>
            <RangePicker onChange={this.onChange} />
          </Col>
          <Col md={2}>&nbsp;</Col>
          <Col md={2}>
            <span className={styles.label}>项目组:</span>
          </Col>
          <Col md={8}>
            <Input />
          </Col>
        </Row>
        <Table columns={columns} dataSource={data} className={styles.recordTable} />
      </div>
    )
  }
}

export default index;
