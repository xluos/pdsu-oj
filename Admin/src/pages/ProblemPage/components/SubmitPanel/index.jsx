import React, { Component } from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import FoundationSymbol from '@icedesign/foundation-symbol';
import { Select, Message } from "@alifd/next";
import { Button } from 'antd';
import { withRouter } from 'react-router-dom';
import produce from 'immer';
import api from '../../../../api';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import './index.scss';
import _ from 'lodash';
require('codemirror/mode/javascript/javascript');

@withRouter
export default class SubmitPanel extends Component {

  constructor (props) {
    super(props)

    this.state = {
      CodeMirrorData: {
        pid: _.get(props, 'match.params.id', ''),
        type: 0,
        value: '',
      },
      options: {
        mode: 'javascript',
        theme: 'material',
        lineNumbers: true,
        tabSize: '2',
      }
    }
  }

  onCodeMirrorChange = (editor, data, value) => {
    this.setState(produce(state => {
      state.CodeMirrorData.value = value
    }))
  }

  onLanguageSelectChange = (value) => {
    this.setState(produce(state => {
      state.CodeMirrorData.type = value
    }))
  }
  submit = async () => {
    Message.loading('正在提交')
    try {
      const data = await api.submit.upProblem(this.state.CodeMirrorData)
      Message.notice(data.data.message)
    } catch (error) {
      Message.error(error.message)
    }
  }
  render () {
    const { Option } = Select
    return (
      <div className="submit-panel">
        <h4 style={{fontSize: 18}}><FoundationSymbol type="skin_light"/> 语言环境</h4>
        <Select
          defaultValue={this.state.CodeMirrorData.type}
          size="large"
          style={{width: '100%'}}
          onChange={this.onLanguageSelectChange}>
          <Option value="0">C - GCC 6.4.0</Option>
          <Option value="1">C++11 - G++ 6.4.0</Option>
          <Option value="2">Java - OpenJDK 1.7.0</Option>
        </Select>
        <h4 style={{fontSize: 18}}><FoundationSymbol type="code"/> 提交代码</h4>
        <CodeMirror
          className="my-code-mirror"
          value=''
          options={this.state.options}
          onChange={this.onCodeMirrorChange}
        />
        <Button type="primary" shape="round" onClick={this.submit}>提交</Button>
      </div>
    );
  }
}
