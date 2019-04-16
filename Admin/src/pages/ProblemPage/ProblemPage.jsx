
import React, { Component }from 'react';
import { Breadcrumb, Tabs, Button, Modal } from 'antd';
import { Link } from 'react-router-dom';
import Placeholder from '../../components/Placeholder';
import './ProblemPage.scss';
import ProblemContent from './components/ProblemContent';
import SubmitTable from '../../components/SubmitTable';
import SunmitPanel from './components/SubmitPanel';
import CodeBlock from './components/CodeBlock';

import _ from 'lodash';
import DataBinder from '@icedesign/data-binder';
import api from '../../api/api';

const TabPane = Tabs.TabPane;

function filterData (problem) {
  console.log(problem);

  return {
    id: problem.id,
    title: problem.title,
    info: {
      no: `${problem.problemId}`,
      level: problem.integral < 2 ? '简单' : problem.integral < 4 ? '中等' : '困难',
      time: problem.limitTime,
      memory: problem.limitMemory,
    },
    content: [
      {
        title: '描述',
        content: problem.describe,
      },
      {
        title: '输入',
        content: problem.inDescribe,
      },
      {
        title: '输出',
        content: problem.outDescribe,
      },
      {
        title: '输入样例',
        content: (<CodeBlock content={problem.inExample}/>)
      },
      {
        title: '输出样例',
        content: (<CodeBlock content={problem.outExample}/>)
      }
    ]
  }
}

@DataBinder({
  problemInfo: {
    url: '/problem/info/',
    method: 'get',
    data: {
    },
    defaultBindingData: {
      problemInfo: {}
    }
  }
}, {requestClient: api})
export default class ProblemPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      showSubmitModal: false,
      id: _.get(props, 'match.params.id', '')
    }
  }
  componentDidMount () {
    this.props.updateBindingData('problemInfo', { url: `/problem/info/${this.state.id}`})
  }
  callback = (index) => {
    console.log(index)
  }
  showSubmit = (show) => {
    this.setState({showSubmitModal: show})
  }
  render () {
    let { problemInfo } = this.props.bindingData;
    problemInfo = filterData(problemInfo.problemInfo)
    return (
      <div className="ProblemPage-page page" >
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item><Link to="/problem">Problem</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to={this.props.match.url}>{problemInfo.title}</Link></Breadcrumb.Item>
        </Breadcrumb>
        <div className="ProblemPage-content">
          <Tabs
            defaultActiveKey="1"
            onChange={this.callback}
            tabBarExtraContent={(<Button type="primary" shape="round"  onClick={() => this.showSubmit(true)}>提交</Button>)}
            >
            <TabPane tab="题目" key="1">
              <ProblemContent {...problemInfo}/>
            </TabPane>
            <TabPane tab="我的提交" key="2">
              <SubmitTable/>
            </TabPane>
            <TabPane tab="所有提交" key="3">
              <SubmitTable/>
            </TabPane>
            <TabPane tab="题目信息" key="4">
              <Placeholder content="题目信息"/>
            </TabPane>
          </Tabs>
          <Modal
            title="提交"
            style={{
              top: 20
            }}
            width="80%"
            visible={this.state.showSubmitModal}
            footer={null}
            onCancel={() => this.showSubmit(false)}
          >
            <SunmitPanel pid={this.state.id}/>
          </Modal>
        </div>
      </div>
    );
  }
}

