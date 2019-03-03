import React, { Component } from 'react';
import { Button, Table, Input, Icon } from "antd";
import { Link } from "react-router-dom";


export default class SubmitTable extends Component {
  constructor (props) {
    super(props);
    this.props = props;
    this.state = {
      searchText: '',
      pagination: {
        total: 200,
        current: 0
      },
      data: props.dataSource,
      loading: false
    }
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
    },
    // render: (text) => (
    //   <Highlighter
    //     highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
    //     searchWords={[this.state.searchText]}
    //     autoEscape
    //     textToHighlight={text.toString()}
    //   />
    // ),
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
  handleTableChange = (pagination, filters, sorter) => {
    this.setState({loading: true})
    setTimeout(() => {
      this.setState({
          data: [],
          loading: false
      })
    }, 1500)
    console.log(pagination, filters, sorter);
  }
  render () {
    const columns = [
      {
        title: '序号',
        dataIndex: 'id',
      },
      {
        title: '题目',
        dataIndex: 'problrmName',
        ...this.getColumnSearchProps('problrmName'),
        render: (text, record) => (
          <Link to={`/problem/${record.problemId}`}>{text}</Link>
        )
      },
      {
        title: '用户',
        dataIndex: 'userName',
        ...this.getColumnSearchProps('userName'),
        render: (text, record) => (
          <Link to={`/user/${record.userId}`}>{text}</Link>
        )
      },
      {
        title: '编译环境',
        dataIndex: 'language',
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
        dataSource={this.state.data}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
      />
    );
  }
}