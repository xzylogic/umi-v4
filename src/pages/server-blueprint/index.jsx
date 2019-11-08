import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
// import { FormattedMessage } from 'umi-plugin-react/locale';
import { Charts } from './component/Charts';
import { Notes } from './component/Notes';

export class index extends Component {
  componentDidMount() {}

  render() {
    return (
      <PageHeaderWrapper>
        <Charts />
        <Notes />
      </PageHeaderWrapper>
    )
  }
}

export default index;
