
import React, { Component }from 'react';
import { Breadcrumb, Table } from 'antd';
import { Link } from 'react-router-dom';
import './Rank.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function mock() {
  let id = parseInt(Math.random() * 1000)
  return {
    id,
    title: id%2 ? '测试题目' : '假装真题',
    type: id%2 ? 'public' : 'password',
    time: '2019-03-03 15:57:29',
    Status: '进行中'
  }
}

const allMockData = Array.from({length: 10}).map(mock)

export default class Rank extends Component {
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
      <div className="rank-page page" >
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item><Link to="/rank">Rank</Link></Breadcrumb.Item>
        </Breadcrumb>
        <div className="rank-content">
          <h3 className="title"><FontAwesomeIcon icon="award" size="1x"/> 排行榜</h3>
          
        </div>
      </div>
    );
  }
}

