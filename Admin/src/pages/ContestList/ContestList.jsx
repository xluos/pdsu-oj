
import React from 'react';
import IceContainer from '@icedesign/container';
import { Breadcrumb } from '@alifd/next';
import { Link } from 'react-router-dom';
import ContestTable from './components/Table';

export default function ContestList () {
  return (
    <div className="ContestList-page">
      <IceContainer>
        <Breadcrumb separator="/">
          <Breadcrumb.Item><Link to="/admin">Admin</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to="/admin/contest/list">Contest</Link></Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
        </Breadcrumb>
      </IceContainer>
      <ContestTable />
    </div>
  );
}
