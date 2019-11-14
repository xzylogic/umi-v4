import React, { Component } from 'react';
import { Button, Form, Icon, Input, message, Select, Upload, Layout } from 'antd';

const { Content } = Layout;
const { Option } = Select;

export class FreeString extends Component {
  state = {
    fileList: [],
  };

  handleReset = () => {
    this.props.form.resetFields();
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      form: { validateFieldsAndScroll },
      dispatch,
    } = this.props;
    validateFieldsAndScroll((error, values) => {
      if (!error) {
        console.log(values);
        // dispatch({
        //   type: 'form/submitAdvancedForm',
        //   payload: values,
        // });
      }
    });
  };

  normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  render() {
    const that = this;
    const uploadProps = {
      name: 'file',
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      multiple: true,
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          let fileList = [...info.fileList];
          fileList = fileList.map(file => {
            if (file.response) {
              file.url = file.response.url;
            }
            return file;
          });
          that.setState({ fileList });
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
    };
    const { getFieldDecorator } = this.props.form;
    const { fileList } = this.state;

    return (
      <Content style={{ padding: '24px 24px', minHeight: 280 }}>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="18n数据源AppName">
            {getFieldDecorator('dataSource', {
              rules: [{ required: true, message: '请输入' }],
            })(
              <Input placeholder="请输入" />,
            )}
          </Form.Item>
          <Form.Item label="语言">
            {getFieldDecorator('language', {
              rules: [{ required: true, message: '请选择语言' }],
            })(
              <Select placeholder="请选择语言">
                <Option value="cn">中文</Option>
                <Option value="en">英文</Option>
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="热词列表">
            {getFieldDecorator('hotList', {
              rules: [{ required: true, message: '请选择热词列表' }],
            })(
              <Select placeholder="请选择热词列表">
                <Option value="0">未选择</Option>
                <Option value="1">已有选择</Option>
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="文件附件">
            {getFieldDecorator('files', {
              initialValue: fileList,
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile,
              rules: [{ required: true, message: '请上传文件' }],
            })(
              <Upload {...uploadProps}>
                <Button>
                  <Icon type="upload" /> Click to Upload
                </Button>
              </Upload>,
            )}
          </Form.Item>
          {
            fileList && fileList.length <= 6 ? (
              <Form.Item
                wrapperCol={{
                  xs: { span: 24, offset: 0 },
                  sm: { span: 16, offset: 4 },
                }}
              >
                <Button onClick={this.handleReset} style={{ marginRight: '30px' }} >
                  Clearn
                </Button>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            ) : null
          }
        </Form>
      </Content>
    )
  }
}

export default FreeString;
