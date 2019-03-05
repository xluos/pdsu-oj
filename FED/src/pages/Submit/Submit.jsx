
import React, { Component }from 'react';
import { Breadcrumb, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import './Submit.scss';
import SubmitTable from '../../components/SubmitTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const TabPane = Tabs.TabPane;

function mock() {
  let id = parseInt(Math.random() * 1000)
  return {
    id,
    submitId: 4564,
    problrmName: id%2 ? '测试题目' : '假装真题',
    problrmId: id++,
    userName: id%2 ? '江湖路人' : '逍遥散人',
    userId: id++,
    language: 'C++11 - G++ 6.4.0',
    createdAt: '2019-03-03 15:57:29',
    time: '4565',
    result: 'AC'
  }
}

const allMockData = Array.from({length: 10}).map(mock)
const myMockData = Array.from({length: 10}).map(mock)

export default class Submit extends Component {
  constructor (props) {
    super(props);
  }
  callback = (index) => {
    console.log(index)
  }
  showSubmit = (id) => {
    console.log(id);
  }
  render () {
    return (
      <div className="submit-page page" >
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item><Link to="/problem">Submit</Link></Breadcrumb.Item>
        </Breadcrumb>
        <div className="submit-content">
          <h3 className="title"><FontAwesomeIcon icon={["far", "paper-plane"]} size="1x"/> 提交列表</h3>
          <Tabs 
            defaultActiveKey="1" 
            onChange={this.callback} 
            >
            <TabPane tab="全部提交" key="1">
              <SubmitTable dataSource={allMockData}/>
            </TabPane>
            <TabPane tab="我的提交" key="2">
              <SubmitTable dataSource={myMockData}/>
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

