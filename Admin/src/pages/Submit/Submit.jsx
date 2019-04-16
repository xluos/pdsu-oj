
import React, { Component }from 'react';
import { Breadcrumb, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import './Submit.scss';
import SubmitTable from '../../components/SubmitTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const TabPane = Tabs.TabPane;


export default class Submit extends Component {
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
              <SubmitTable />
            </TabPane>
            <TabPane tab="我的提交" key="2">
              <SubmitTable />
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

