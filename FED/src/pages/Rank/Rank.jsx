
import React, { Component }from 'react';
import { Breadcrumb, Table, Select, Icon, Button } from 'antd';
import { Link } from 'react-router-dom';
import './Rank.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Option = Select.Option;


function mock() {
  let id = parseInt(Math.random() * 1000)
  return {
    id,
    name: id%2 ? '路人甲' : '叮当猫',
    Motto: '啦啦啦啦啦',
    ac: 45,
    wa: 45
  }
}

const allMockData = Array.from({length: 10}).map(mock)

export default class Rank extends Component {
  constructor (props) {
    super(props);
  }
  
  handleChange = (value) => {
    console.log(`selected ${value}`);
  }
  render () {
    const columns = [
      {
        title: "ID",
        width: 100,
        dataIndex: 'id',
      },
      {
        title: '名字',
        width: 100,
        dataIndex: 'name',
        render: (text, record) => (
          <Link to={`/user/${record.id}`}>{text}</Link>
        )
      },
      {
        title: '格言',
        dataIndex: 'Motto',
      },
      {
        title: '通过',
        width: 100,
        dataIndex: 'ac',
      },
      {
        title: '提交',
        width: 100,
        dataIndex: 'wa',
      },
      {
        title: '正确率',
        dataIndex: 'index',
        width: 100,
        render: (text, record) => (
          <span >{record.ac/record.wa}</span>
        )
      },
    ]
    const children = [];
    for (let i = 10; i < 36; i++) {
      children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }
    return (
      <div className="rank-page page" >
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item><Link to="/rank">Rank</Link></Breadcrumb.Item>
        </Breadcrumb>
        <div className="rank-content">
          <h3 className="title"><FontAwesomeIcon icon="award" size="1x"/> 排行榜</h3>
          <div className="group">
            <Select
              allowClear
              mode="multiple"
              placeholder="选择排行分组"
              onChange={this.handleChange}
              style={{width: "200px"}}
              defaultValue={['a10', 'c12']}
              size="large"
              suffixIcon={<Button shape="circle" icon="search" />}
            >
              {children}
            </Select>
            <Button icon="search" size="large" type="primary">查询</Button>
          </div>
          <Table rowKey="id" columns={columns}  dataSource={allMockData}/>
        </div>
      </div>
    );
  }
}

