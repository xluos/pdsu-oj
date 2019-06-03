
import React, { Component }from 'react';
import { Progress, Tab, Table} from "@alifd/next";
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import './ContestPage.scss';
import produce from 'immer';
import api from '../../api/api';
import DataBinder from '@icedesign/data-binder';
import _ from 'lodash';

import moment from 'moment';
moment.locale('zh-cn');

@DataBinder({
  contestDetails: {
    url: '/contest/details',
    method: 'post',
    data: {
    },
    defaultBindingData: {
      info: {},
      problemList: [],
      problemDetails: []
    }
  }
}, {requestClient: api})
export default class ContestPage extends Component {

  constructor (props) {
    super(props);
    this.state = {
      id: _.get(props, 'match.params.id', ''),
    };
  }

  componentDidMount() {
    this.props.updateBindingData('contestDetails', {data: this.state})
  }

  setStateAsync = (state) => {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }
  handlePaginationChange = async (pageNo) => {
    await this.setStateAsync(produce(state => {
      state.value.pageNo = pageNo
    }))
    console.log(this.state.value, pageNo);
    this.props.updateBindingData('contestDetails', { data: this.state.value })
  };

  handlePageSizeChange = async (pageSize) => {
    await this.setState(produce(state => {
      state.value.pageSize = pageSize
    }))
    console.log(this.state.value, pageSize);
    this.props.updateBindingData('contestDetails', { data: this.state.value })
  };

  renderBar = (start, end) => {
    const startTime = new Date(start).getTime()
    const endTime = new Date(end).getTime()
    const nowTime = new Date().getTime()
    const percent = (nowTime - startTime) / (endTime - startTime) * 100

    let color = '#2eca9c'
    if (percent > 60 && percent < 85) {
      color = '#f1c826'
    }
    if (percent > 85) {
      color = '#ff3000'
    }
    return (
      <Progress percent={percent > 100 ? 100 : percent} size="large" color={color}/>
    );
  };

  render () {
    const { contestDetails } = this.props.bindingData;
    const {
      startTime,
      endTime,
      name,
      hint
    } = contestDetails.info
    return (
      <div className="contest-page page" >
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item><Link to="/contest">Contest</Link></Breadcrumb.Item>
        </Breadcrumb>
        <div className="container">
          <h2 className="contest-title">{name}</h2>
          <div className="contest-info">{moment(startTime).format('YYYY-MM-DD hh:mm')}——{moment(endTime).format('YYYY-MM-DD hh:mm')}</div>
          <div className="bar">
            { this.renderBar(startTime, endTime) }
          </div>
          <div className="hint">{hint}</div>
        </div>
        <div className="container">
          <Tab>
            <Tab.Item title="Overviewt" key="1">
              <Table dataSource={contestDetails.problemList}>
                <Table.Column title="Id" dataIndex="id"/>
                <Table.Column title="Title" dataIndex="name" />
                <Table.Column title="Ratio" dataIndex="Ratio"/>
              </Table>
            </Tab.Item>
            <Tab.Item title="Problem" key="2">

            </Tab.Item>
            <Tab.Item title="Submit" key="3">

            </Tab.Item>
            <Tab.Item title="Rank" key="4">

            </Tab.Item>
          </Tab>
        </div>
      </div>
    );
  }
}

