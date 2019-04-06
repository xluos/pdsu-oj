
import React, { Component }from 'react';
import { Breadcrumb, Table } from 'antd';
import { Link } from 'react-router-dom';
import './Contest.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function mock() {
  let id = parseInt(Math.random() * 1000)
  return {
    id,
    title: id%2 ? '测试题目' : '假装真题',
    type: id%2 ? 'public' : 'password',
    time: '2019-03-03 15:57:29',
    status: '进行中'
  }
}

const allMockData = Array.from({length: 10}).map(mock)

export default class Contest extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    const columns = [
      {
        title: "ID",
        dataIndex: 'id',
      },
      {
        title: '比赛',
        dataIndex: 'title',
        render: (text, record) => (
          <Link to={`/contest/${record.id}`}>{text}</Link>
        )
      },
      {
        title: '状态',
        dataIndex: 'status',
      },
      {
        title: '比赛时间',
        dataIndex: 'time',
      },
      {
        title: '类型',
        width: 100,
        dataIndex: 'type',
      },
    ]
    return (
      <div className="contest-page page" >
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item><Link to="/contest">Contest</Link></Breadcrumb.Item>
        </Breadcrumb>
        <div className="contest-content">
          <h3 className="title"><FontAwesomeIcon icon={["far", "flag"]} size="1x"/> 比赛列表</h3>
          <Table rowKey="id" columns={columns}  dataSource={allMockData}/>
        </div>
      </div>
    );
  }
}

