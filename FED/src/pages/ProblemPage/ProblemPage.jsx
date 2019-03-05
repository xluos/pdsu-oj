
import React, { Component }from 'react';
import { Breadcrumb, Tabs, Button, Modal } from 'antd';
import { Link } from 'react-router-dom';
import Placeholder from '../../components/Placeholder';
import './ProblemPage.scss';
import ProblemContent from './components/ProblemContent';
import SubmitTable from '../../components/SubmitTable';
import SunmitPanel from './components/SubmitPanel';

const TabPane = Tabs.TabPane;

const mockData = {
  title: '石头收藏家',
  info: {},
  content: [
    {
      title: '描述',
      content: `石头收藏家小明在徒步登山的时候发现了一堆美丽的石头。这些石头价值不菲，但是都很重，小明自身的力气有限，一次只能拿他拿得动的一部分。每块石头的重量不同，价值也不同。问小明在力所能及的情况下能拿走价值多少的石头。

      说明：小明只能搬运一次。
      
      例如：小明只能拿得动 10 kg，每块石头的重量分别为2kg，3kg，5kg，7kg，对应的价值分别为 1万，5万，2万，4万。小明能拿的是 3kg 以及 7kg 的石头，价值 9 万。`,
    },
    {
      title: '输入',
      content: `单组输入，每组输入分 3 行：

      第 1 行是一个整数，表示小明一次能搬运的最大重量。
      第 2 行是一组数，表示每块石头的重量。
      第 3 行是一组数，表示每块石头的对应的价值。
      石头总数不大于 60.`
    },
    {
      title: '输出',
      content: `一个整数，表示小明这次能带回去的石头的总价。`
    },
    {
      title: '输入样例',
      content: (<Placeholder content="in"/>)
    },
    {
      title: '输出样例',
      content: (<Placeholder content="out"/>)
    }
  ]
}

export default class ProblemPage extends Component {
  constructor (props) {
    window.pp = props
    super(props);
    this.props = props;
    this.state = {
      showSubmitModal: false,
    }
  }
  callback = (index) => {
    console.log(index)
  }
  showSubmit = (show) => {
    this.setState({showSubmitModal: show})
  }
  render () {
    return (
      <div className="ProblemPage-page page" >
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item><Link to="/problem">Problem</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to={this.props.match.url}>{mockData.title + this.props.match.params.id}</Link></Breadcrumb.Item>
        </Breadcrumb>
        <div className="ProblemPage-content">
          <Tabs 
            defaultActiveKey="1" 
            onChange={this.callback} 
            tabBarExtraContent={(<Button type="primary" shape="round"  onClick={() => this.showSubmit(true)}>提交</Button>)}
            >
            <TabPane tab="题目" key="1">
              <ProblemContent {...mockData}/>
            </TabPane>
            <TabPane tab="我的提交" key="2">
              <SubmitTable/>
              <Placeholder content="我的提交"/>
            </TabPane>
            <TabPane tab="所有提交" key="3">
              <SubmitTable/>
              <Placeholder content="所有提交"/>
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
            <SunmitPanel/>
          </Modal>
        </div>
      </div>
    );
  }
}

