
  import React from 'react';
  import IceContainer from '@icedesign/container';
  import { Breadcrumb } from '@alifd/next';
  import { Link } from 'react-router-dom';

  export default function ContestCreate () {
    return (
      <div className="ContestCreate-page">
        <IceContainer>
          <Breadcrumb separator="/">
            <Breadcrumb.Item><Link to="/admin">Admin</Link></Breadcrumb.Item>
            <Breadcrumb.Item><Link to="/admin/contest/list">Contest</Link></Breadcrumb.Item>
            <Breadcrumb.Item>Create</Breadcrumb.Item>
          </Breadcrumb>
        </IceContainer>
      </div>
    );
  }
