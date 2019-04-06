import React, { Component } from 'react';
import UserGroupForm from './components/UserGroupForm';
import IceContainer from '@icedesign/container';
import { Breadcrumb } from '@alifd/next';
import { withRouter, Link } from 'react-router-dom';

@withRouter
export default class UserCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
    <div className="user-create-page">
      <IceContainer>
        <Breadcrumb separator="/">
          <Breadcrumb.Item><Link to="/">Admin</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to="/usergroup/manage">User</Link></Breadcrumb.Item>
          <Breadcrumb.Item>Create</Breadcrumb.Item>
        </Breadcrumb>
      </IceContainer>
      <UserGroupForm userInfo={this.props.location.state}/>
    </div>
    );
  }
}
