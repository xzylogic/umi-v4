import React, { Component } from 'react';
import { connect } from 'dva';
import { List, Button, Tag, Typography } from 'antd';
import styles from '../index.less';

const namespace = 'server-blueprint';
const mapStateToProps = state => ({
  releaseNotesList: state[namespace].list.releaseNotes,
  releaseNotesPage: state[namespace].currentPage.releaseNotes,
  releaseNotesTotal: state[namespace].totalElements.releaseNotes,
  loading: state.loading.effects[`${namespace}/fetchComponentReleaseNotes`],
});
const mapDispatchToProps = dispatch => ({
  fetchComponentReleaseNotes: currentPage =>
    dispatch({
      type: `${namespace}/fetchComponentReleaseNotes`,
      payload: { current: currentPage, size: 2 },
    }),
});

@connect(
  mapStateToProps,
  mapDispatchToProps,
)

export class Notes extends Component {
  state = {
    size: 2,
  };

  componentDidMount() {
    this.props.fetchComponentReleaseNotes(1);
  }

  onLoadMore = () => {
    const { releaseNotesPage } = this.props;
    this.props.fetchComponentReleaseNotes(releaseNotesPage + 1);
    // await this.setState({ loading: false }, () => {
    //   window.dispatchEvent(new Event('resize'));
    // });
  };

  changeMonth = item => {
    const month = item.gmtCreated.split(' ')[0].split('-')[1];
    const day = item.gmtCreated.split(' ')[0].split('-')[2];
    switch (month) {
      case '01':
        return this.dateHandler(day, '一月');
      case '02':
        return this.dateHandler(day, '二月');
      case '03':
        return this.dateHandler(day, '三月');
      case '04':
        return this.dateHandler(day, '四月');
      case '05':
        return this.dateHandler(day, '五月');
      case '06':
        return this.dateHandler(day, '六月');
      case '07':
        return this.dateHandler(day, '七月');
      case '08':
        return this.dateHandler(day, '八月');
      case '09':
        return this.dateHandler(day, '九月');
      case '10':
        return this.dateHandler(day, '十月');
      case '11':
        return this.dateHandler(day, '十一月');
      case '12':
        return this.dateHandler(day, '十二月');
      default:
        return null;
    }
  };

  dateHandler = (_day, _month) => (
    <React.Fragment>
      <span>{_day}</span>
      <span>{_month}</span>
    </React.Fragment>
  );

  render() {
    const { releaseNotesList, releaseNotesPage, releaseNotesTotal, loading } = this.props;
    const loadMore =
      releaseNotesPage * this.state.size < releaseNotesTotal ? (
        <Button onClick={this.onLoadMore} className={styles.loadMore}>加载更多...</Button>
      ) : null;
    return (
      <List
        className={styles.releaseNotes}
        loading={loading}
        loadMore={loadMore}
        dataSource={releaseNotesList}
        itemLayout="vertical"
        renderItem={item => (
          <List.Item key={item.id}>
            <div className={styles.leftTitile}>
              {this.changeMonth(item)}
            </div>
            <div className={styles.listContent}>
              <h4>{ item.mainTitle }</h4>
              {item.subTitle && item.subTitle.split(',').map(val => (<Tag key={val}>{val}</Tag>))}
              <div className={styles.content}>
                <p>{item.linkedUrl}</p>
              </div>
              <Typography.Text type="secondary" style={{ background: 'url(https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png) 0 0 / 20px 20px no-repeat' }}>{item.creator} &nbsp;&nbsp;&nbsp; {item.gmtCreated}</Typography.Text>
            </div>
          </List.Item>
        )}
      />
    );
  }
}

export default Notes;
