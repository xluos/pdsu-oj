import React, { Component } from 'react';
import CardList from "./components/CardList";
import IceContainer from '@icedesign/container';
import { Breadcrumb } from '@alifd/next';
import { Link } from "react-router-dom";

export default class UsergroupManage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="usergroup-manage-page">
        <IceContainer>
          <Breadcrumb separator="/">
            <Breadcrumb.Item><Link to="/">Admin</Link></Breadcrumb.Item>
            <Breadcrumb.Item><Link to="/usergroup/manage">UserGroup</Link></Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
          </Breadcrumb>
        </IceContainer>
        <CardList/>
      </div>
    );
  }
}
