import React, { Component } from 'react';
import Table from './components/Table';
import IceContainer from '@icedesign/container';
import { Breadcrumb } from '@alifd/next';
import { Link } from "react-router-dom";

import './UserList.scss';

export default class UserList extends Component {
  render() {
    return (
      <div className="user-page">
        <IceContainer>
          <Breadcrumb separator="/">
          <Breadcrumb.Item><Link to="/">Admin</Link></Breadcrumb.Item>
            <Breadcrumb.Item><Link to="/user">User</Link></Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
          </Breadcrumb>
        </IceContainer>
        <Table />
      </div>
    );
  }
}
