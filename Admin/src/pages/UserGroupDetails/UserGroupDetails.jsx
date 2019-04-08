import React from 'react';
import IceContainer from '@icedesign/container';
import { Breadcrumb } from '@alifd/next';
import { Link } from 'react-router-dom';
import UserTable from "./components/Table";

export default function UserGroupDetails () {
  return (
    <div className="user-create-page">
      <IceContainer>
        <Breadcrumb separator="/">
          <Breadcrumb.Item><Link to="/admin">Admin</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to="/admin/usergroup/manage">User</Link></Breadcrumb.Item>
          <Breadcrumb.Item>Details</Breadcrumb.Item>
        </Breadcrumb>
      </IceContainer>
      <UserTable />
    </div>
  );
}
