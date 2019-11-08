import React, { Component } from 'react';
import { DatePicker } from 'antd';
import { connect } from 'dva';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import moment from 'moment';
import styles from '../index.less';

const namespace = 'server-blueprint';
const mapStateToProps = state => ({
  usedRecordList: state[namespace].list.usedRecords,
  // currentPage: state.businessYilianWechatQuery.currentPage.group,
  // totalElements: state.businessYilianWechatQuery.totalElements.group,
  // searchParam: state.businessYilianWechatQuery.searchParam.group,
  // allGroupName: state.businessYilianWechatQuery.list.queryMessage,
  // loading:
  //   state.loading.effects[
  //     ('businessYilianWechatQuery/fetchGroupPerformance',
  //       'businessYilianWechatQuery/getQueryMessage')
  //     ],
});
const mapDispatchToProps = dispatch => ({
  fetchComponentUsedRecords: (startValue, endValue) =>
    dispatch({
      type: `${namespace}/fetchComponentUsedRecords`,
      payload: { startValue, endValue },
    }),
  // onFetchGroupListDebounce: debounce(
  //   (way, page) =>
  //     dispatch({
  //       type: 'businessYilianWechatQuery/fetchGroupPerformance',
  //       payload: { way, page },
  //     }),
  //   500
  // ),
  // onSearchParamChange: (key, value) =>
  //   dispatch({
  //     type: 'businessYilianWechatQuery/updateSearchParam',
  //     payload: { origin: 'group', key, value },
  //   }),
});

@connect(
  mapStateToProps,
  mapDispatchToProps,
)

export class Charts extends Component {
  state = {
    // startValue: null,
    // endValue: null,
    startValue: moment(new Date().valueOf() - 86400000 * 93),
    endValue: moment(new Date().valueOf() - 86400000),
  };

  componentDidMount() {
    const { startValue, endValue } = this.state;
    this.props.fetchComponentUsedRecords(startValue.format('YYYY-MM-DD 00:00:00'), endValue.format('YYYY-MM-DD 23:59:59'));
    // this.props.fetchComponentUsedRecords(moment(new Date().valueOf() - 86400000 * 93).format('YYYY-MM-DD 00:00:00'), moment(new Date().valueOf() - 86400000).format('YYYY-MM-DD 23:59:59'));
  }

  disabledStartDate = startValue => {
    const { endValue } = this.state;
    if (!startValue || !endValue) {
      return startValue && startValue < moment(new Date('2016-12-31')).endOf('day');
    }
    return startValue.valueOf() > endValue.valueOf() - 86400000 * 93 || startValue < moment(new Date('2016-12-31')).endOf('day');
  };

  disabledEndDate = endValue => {
    const { startValue } = this.state;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf() + 86400000 * 93;
  };

  changeDate = async(field, value) => {
    await this.setState({
      [field]: value,
    });
    const { startValue, endValue } = this.state;
    if (startValue && endValue) {
      const { fetchComponentUsedRecords } = this.props;
      fetchComponentUsedRecords(moment(startValue).format('YYYY-MM-DD 00:00:00'), moment(endValue).format('YYYY-MM-DD 23:59:59'));
    }
  };

  onStartChange = value => {
    this.changeDate('startValue', value);
  };

  onEndChange = value => {
    this.changeDate('endValue', value);
  };

  render() {
    const { startValue, endValue } = this.state;
    const { usedRecordList } = this.props;
    const cols = {
      datetime: {
        alias: '月份',
      },
      count: {
        alias: '数量',
      },
    };
    return (
      <div className={styles.resourceCodeChart}>
        <Chart padding={60} height={400} data={usedRecordList} scale={cols} background={{ fill: '#FFF' }} forceFit>
          <div className={styles.headerContent}>
            <p className={styles.header}>资源码管理</p>
            <span className={styles.time}>日期</span>
            <DatePicker
              disabledDate={this.disabledStartDate}
              format="YYYY-MM-DD 00:00:00"
              value={startValue}
              placeholder="Start"
              onChange={this.onStartChange}
              // minDate={moment(new Date('2017-01-01')).format('YYYY-MM-DD 00:00:00')}
              // maxDate={moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}
            />
            <DatePicker
              disabledDate={this.disabledEndDate}
              format="YYYY-MM-DD 23:59:59"
              value={endValue}
              placeholder="End"
              onChange={this.onEndChange}
            />
          </div>
          <Axis name="datetime" />
          <Axis name="count" />
          <Legend position="top" offsetY={-20} />
          <Tooltip />
          <Geom
            type="line"
            position="datetime*count"
            size={2}
            color="partnerName"
            tooltip={['partnerName*datetime*count', (partnerName, datetime, count) => ({
              name: `${partnerName}: `,
              title: datetime.split(' ')[0],
              value: count,
            })]}
          />
          <Geom
            type="point"
            position="datetime*count"
            size={4}
            shape="circle"
            color="partnerName"
            style={{
              stroke: '#fff',
              lineWidth: 1,
            }}
          />
        </Chart>
      </div>
    )
  }
}

export default Charts;
