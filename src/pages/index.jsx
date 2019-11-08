import React, { Component } from 'react';
import { Carousel } from 'antd';
import styles from './index.less'

export class index extends Component {
  componentDidMount() {
    if (/.*Firefox.*/.test(navigator.userAgent)) {
      document.addEventListener('DOMMouseScroll', (e) => {
        e = e || window.event;
        if (e.detail > 0) {
          this.slider.next();
          // console.log('鼠标向下滚动');
        } else {
          this.slider.prev();
          // console.log('鼠标向上滚动');
        }
      });
    } else {
      document.onmousewheel = (e) => {
        e = e || window.event;
        if (e.wheelDelta > 0) {
          this.slider.prev();
          // console.log('鼠标向上滚动');
        } else {
          this.slider.next();
          // console.log('鼠标向下滚动');
        }
      }
    }
  }

  componentWillUnmount() {
    document.onmousewheel = null;
    document.removeEventListener('DOMMouseScroll', () => null);
  }

  render() {
    return (
      <div className={styles.indexImg}>
        <Carousel dotPosition="right" ref={ el => { this.slider = el } }>
          <div className={styles.pic1}>&nbsp;</div>
          <div className={styles.pic2}>&nbsp;</div>
          <div className={styles.pic3}>&nbsp;</div>
          <div className={styles.pic4}>&nbsp;</div>
        </Carousel>
      </div>
    )
  }
}

export default index;
