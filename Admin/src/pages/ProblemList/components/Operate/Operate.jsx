import React, { Component } from 'react';
import { Button, Dialog, Radio, Upload, Grid, Message } from "@alifd/next";
import { getUserInfo } from '../../../../lib/Storage';
import api from '../../../../api';
import _ from 'lodash';
const RadioGroup = Radio.Group;
const { Row, Col } = Grid;

class InstallFrom extends Component {

  constructor (props) {
    super(props);
    const userInfo = getUserInfo()
    this.state = {
      type: '0',
      createUserName: userInfo.name,
      createUserId: userInfo.id,
      files: []
    }
  }
  handleRadio = (value) => {
    this.setState({
      ...this.state,
      type: value,
    }, () => {
      this.props.onChange && this.props.onChange(this.state)
    })
  }
  handleUpload = async (value) => {
    this.setState({
      ...this.state,
      files: value.map(item => item.originFileObj)
    }, () => {
      this.props.onChange && this.props.onChange(this.state)
    })
  }
  render () {
    return (
      <div style={{width: 500}}>
        <Row gutter={16} style={{margin: 24}}>
          <Col span={6} style={{textAlign: 'right'}}>文件类型：</Col>
          <Col span={12}>
            <RadioGroup defaultValue="0" onChange={this.handleRadio} >
              <Radio value="0">PDSUOJ</Radio>
              <Radio value="1">HUSTOJ</Radio>
            </RadioGroup>
          </Col>
        </Row>
        <Row gutter={16} style={{margin: 24}}>
          <Col span={6} style={{textAlign: 'right'}}>文件：</Col>
          <Col span={12}>
            <Upload
              listType="text"
              accept=".xml,.json"
              limit={10}
              autoUpload={false}
              onSelect={this.handleUpload}
              onRemove={this.handleUpload}
            >
              <Button type="primary" style={{margin: '0 0 10px'}}>Upload File</Button>
            </Upload>
          </Col>
        </Row>
      </div>
    )
  }
}

export default class Operate extends Component {

  state = {
    showInstall: false,
    installFromValue: {},
    okProps: {},
  }
  installDialogUpload = async () => {
    if (_.isEqual(this.state.installFromValue, {})
    || _.get(this.state, 'installFromValue.files.length', 0) === 0 ) {
      Message.error('请选择文件')
      return ;
    }
    this.setState({
      ...this.state,
      okProps: {
        loading: true
      }
    })
    try {

      const data = await api.problem.uploadProblemList(this.state.installFromValue)

      Message.success(`成功添加${_.get(data, 'data.result', -1)}个题目`)
      this.installDialogToggle()
    } catch (error) {
      Message.error(error.message)
    } finally {
      this.setState({
        ...this.state,
        okProps: {
          loading: false
        }
      })
    }
  }
  installDialogToggle = () => {
    this.setState({showInstall: !this.state.showInstall})
  }
  handleInstallFrom = (value) => {
    this.setState({
      installFromValue: value
    })
  }
  render () {
    return (
      <div style={styles.formItem}>
        <Dialog
            title="批量导入"
            onClose={this.installDialogToggle}
            onCancel={this.installDialogToggle}
            visible={this.state.showInstall}
            onOk={this.installDialogUpload}
            okProps={this.state.okProps}
            autoFocus={true}
            >
          <InstallFrom onChange={this.handleInstallFrom}/>
        </Dialog>
        <span style={styles.formLabel}>操作：</span>
        <Button onClick={this.installDialogToggle}>批量导入</Button>
      </div>
    )
  }
}

const styles = {
  formItem: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0',
  },
  formLabel: {
    minWidth: '80px',
  },
};
