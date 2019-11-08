import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { FormattedMessage } from 'umi-plugin-react/locale';

export class index extends Component {
  componentDidMount() {}

  render() {
    return (
      <PageHeaderWrapper>
        <FormattedMessage
          id="menu.server-sdk"
          defaultMessage="服务&SDK"
        />
      </PageHeaderWrapper>
    )
  }
}

export default index;
