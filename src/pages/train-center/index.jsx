import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { FormattedMessage } from 'umi-plugin-react/locale';

export class index extends Component {
  componentDidMount() {}

  render() {
    return (
      <PageHeaderWrapper>
        <FormattedMessage
          id="menu.train-center"
          defaultMessage="培训中心"
        />
      </PageHeaderWrapper>
    )
  }
}

export default index;
