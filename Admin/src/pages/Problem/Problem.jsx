import React, { Component } from 'react';
import { Breadcrumb, Pagination } from 'antd';
import { Link } from 'react-router-dom';
import ProblemItem from './components/ProblemItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FilterTag from '../ProblemList/components/FilterTag';
import FilterForm from '../ProblemList/components/FilterForm';
import DataBinder from '@icedesign/data-binder';
import api from '../../api/api';
import './Problem.scss';
import produce from "immer"

@DataBinder({
  problemTable: {
    url: '/problem/list',
    method: 'post',
    data: {
    },
    defaultBindingData: {
      pageNo: 1,
      pageSize: 20,
      pageEnd: 1,
      total: 0,
      items: []
    }
  }
}, {requestClient: api})
export default class ProblemPage extends Component {
  state = {
    value: {
      pageNo: 1,
      pageSize: 20,
      where: {
        mini: true,
        status: true,
      }
    }
  };

  componentDidMount() {
    this.props.updateBindingData('problemTable', { data: this.state.value })
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
    this.props.updateBindingData('problemTable', { data: this.state.value })
  };

  handlePageSizeChange = async (current, pageSize) => {
    await this.setState(produce(state => {
      state.value.pageSize = pageSize
    }))
    console.log(this.state.value, pageSize);
    this.props.updateBindingData('problemTable', { data: this.state.value })
  };

  handleFilterTagChange = (tag) => {
  };

  handleFilterTextChange = async (val) => {
    await this.setStateAsync(produce(state => {
      state.value.pageNo = 1
      state.value.where = {
        text: val
      }
    }))
    this.props.updateBindingData('problemTable', { data: this.state.value })
  };

  render () {
    const { problemTable } = this.props.bindingData;
    return (
    <div className="problem-page page">
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item><Link to="/problem">Problem</Link></Breadcrumb.Item>
      </Breadcrumb>
      <div className="problem-body">
        <FilterTag onChange={this.handleFilterTagChange} />
        <FilterForm onChange={this.handleFilterTextChange} />
      </div>
      <div className="problem-body">
        <div style={{
              display: 'flex',
              justifyContent: 'center',
            }}>
              <Pagination
                className="problem-pagination"
                showQuickJumper
                showSizeChanger
                pageSize={problemTable.pageSize}
                current={problemTable.pageNo}
                total={problemTable.total}
                onChange={this.handlePaginationChange}
                onShowSizeChange={this.handlePageSizeChange}
              />
            </div>
      </div>
      <div className="problem-body">
        <h3 className="problem-title"><FontAwesomeIcon icon={["far", "lightbulb"]} size="1x" /> 所有题目</h3>
        {/* <div className="problem-filter">

        </div> */}
        <div className="problem-content">
          {problemTable.items.map(item => (
            <ProblemItem {...item} key={item.id} />
          ))}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '40px 0 10px 0'
          }}>
            <Pagination
              className="problem-pagination"
              showQuickJumper
              showSizeChanger
              pageSize={problemTable.pageSize}
              current={problemTable.pageNo}
              total={problemTable.total}
              onChange={this.handlePaginationChange}
              onShowSizeChange={this.handlePageSizeChange}
            />
          </div>
        </div>
      </div>
    </div>
  );}
}
