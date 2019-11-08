import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { FormattedMessage } from 'umi-plugin-react/locale';

export class index extends Component {
  componentDidMount() {}

  render() {
    return (
      <PageHeaderWrapper>
        <FormattedMessage
          id="menu.tech-support"
          defaultMessage="技术支持"
        />
      </PageHeaderWrapper>
    )
  }
}

export default index;
