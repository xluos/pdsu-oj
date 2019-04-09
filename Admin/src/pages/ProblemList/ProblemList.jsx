import React from 'react';
import IceContainer from '@icedesign/container';
import { Breadcrumb } from '@alifd/next';
import { Link } from 'react-router-dom';
import Table from './components/Table';

export default function ProblemList () {
  return (
    <div className="ProblemList-page">
      <IceContainer>
        <Breadcrumb separator="/">
          <Breadcrumb.Item><Link to="/admin">Admin</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to="/admin/problem/list">Problem</Link></Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
        </Breadcrumb>
      </IceContainer>
      <Table />
    </div>
  );
}
