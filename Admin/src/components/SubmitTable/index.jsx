import React, { Component } from 'react';
import { Button, Table, Input, Icon } from "antd";
import { Link } from "react-router-dom";
import DataBinder from '@icedesign/data-binder';
import api from '../../api/api';
import produce from 'immer';
@DataBinder({
  submitTable: {
    url: '/submit/list',
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
export default class SubmitTable extends Component {
  constructor (props) {
    super(props);
    this.props = props;
    this.state = {
      value: {
        pageNo: 1,
        pageSize: 20,
        where: {
          mini: true,
        }
      }
    }
  }
  componentDidMount() {
    this.props.updateBindingData('submitTable', { data: this.state.value })
  }
  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys, selectedKeys, confirm, clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => { this.searchInput = node; }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          搜索
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          重置
        </Button>
      </div>
    ),
    filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    }
  })
  handleSearch = (selectedKeys, confirm) => {
    console.log('reset');
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  }

  handleReset = (clearFilters) => {
    console.log('reset');
    clearFilters();
    this.setState({ searchText: '' });
  }
  handlePaginationChange = async (pageNo) => {
    await this.setStateAsync(produce(state => {
      state.value.pageNo = pageNo
    }))
    console.log(this.state.value, pageNo);
    this.props.updateBindingData('submitTable', { data: this.state.value })
  };

  setStateAsync = (state) => {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }

  handlePageSizeChange = async (current, pageSize) => {
    await this.setState(produce(state => {
      state.value.pageSize = pageSize
    }))
    console.log(this.state.value, pageSize);
    this.props.updateBindingData('submitTable', { data: this.state.value })
  };
  render () {
    const { submitTable, __loading } = this.props.bindingData;
    const columns = [
      {
        title: '序号',
        dataIndex: 'id',
      },
      {
        title: '题目',
        dataIndex: 'problemTitle',
        // ...this.getColumnSearchProps('problrmName'),
        render: (text, record) => (
          <Link to={`/problem/${record.problemId}`}>{text}</Link>
        )
      },
      {
        title: '用户',
        dataIndex: 'userName',
        // ...this.getColumnSearchProps('userName'),
        render: (text, record) => (
          <Link to={`/user/${record.userId}`}>{text}</Link>
        )
      },
      {
        title: '编译环境',
        dataIndex: 'language',
        render: (text, record) => (
          ['未知', 'C - GCC 6.4.0', 'C++11 - G++ 6.4.0', 'Java - OpenJDK 1.7.0'][+text]
        )
      },
      {
        title: '提交时间',
        dataIndex: 'createdAt',
      },
      {
        title: '用时',
        dataIndex: 'time',
      },
      {
        title: '结果',
        dataIndex: 'result',
        render: text => (
          {
            '1': 'Run',
            '6': 'WA',
            '2': 'AC',
            '8': 'CE',
            '14': 'SE'
          }[+text] || 'RE'
        ),
      },
      {
        title: '',
        dataIndex: 'submitId',
        render: text => (
          <Button
            type="primary"
            shape="circle"
            icon="search"
            onClick={() => this.showSubmit(text)}
          />),
      },
    ]
    return (
      <Table
        rowKey="id"
        columns={columns}
        dataSource={submitTable.items}
        pagination={{
          showQuickJumper: true,
          showSizeChanger: true,
          pageSize: submitTable.pageSize,
          current: submitTable.pageNo,
          total: submitTable.total,
          onChange: this.handlePaginationChange,
          onShowSizeChange: this.handlePageSizeChange,
        }}
        loading={__loading}
      />
    );
  }
}
