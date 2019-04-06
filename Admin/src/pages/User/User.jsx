
import React, { Component }from 'react';
import { Breadcrumb, Row, Col, Icon, Tag } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import ChartRadar from "./components/ChartRadar";
import ChartTypeLine from "./components/ChartTypeLine";
import ChartPie from "./components/ChartPie";
import { getUserInfo } from "../../lib/Storage";
import './User.scss';
import Placeholder from '../../components/Placeholder';

function UserInfo({user}) {
  return (
    <div className="user-info">
      <img src="user.photo" alt=""/>
      <div className="info">
        <h3 className="title">{user.name} <Icon type="edit" style={{color: "#3188ff"}}/></h3>
        <p>15物联网二班 <span>{` <${user.email}>`}</span></p>
        <p>{user.desc}</p>
        <div>
          <Tag /*color=""*/ >等级{user.level}</Tag>
          <Tag /*color=""*/ >提交{user.submit}</Tag>
          <Tag /*color=""*/ >通过{user.solved}</Tag>
          <Tag /*color=""*/ >AC{user.accepted}</Tag>
          <Tag /*color=""*/ >积分{user.integral}</Tag>
          <Tag /*color=""*/ >金币{user.coin}</Tag>
        </div>
      </div>
      <ChartRadar />
    </div>
  )
}
@withRouter
export default class User extends Component {
  constructor (props) {
    super(props);
    this.match = this.props.match
    this.state = {
      userInfo: getUserInfo()
    }
  }
  render () {
    return (
      <div className="user-page page" >
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item><Link to="/user">User</Link></Breadcrumb.Item>
        </Breadcrumb>
        <Row gutter={16}>
          <Col span={24}>
            <div className="user-content">
              <UserInfo user={this.state.userInfo}/>
            </div>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={16}>
            <div className="user-content">
              <ChartTypeLine />
            </div>
          </Col>
          <Col span={8}>
            <div className="user-content">
              <ChartPie></ChartPie>
            </div>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <div className="user-content">
              {<Placeholder content={`User ${this.match.params.id}`} />}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

