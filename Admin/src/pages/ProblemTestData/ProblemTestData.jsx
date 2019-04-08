
  import React from 'react';
  import IceContainer from '@icedesign/container';
  import { Breadcrumb } from '@alifd/next';
  import { Link } from 'react-router-dom';

  export default function ProblemTestData () {
    return (
      <div className="ProblemTestData-page">
        <IceContainer>
          <Breadcrumb separator="/">
            <Breadcrumb.Item><Link to="/admin">Admin</Link></Breadcrumb.Item>
            <Breadcrumb.Item><Link to="/admin/problem/list">Problem</Link></Breadcrumb.Item>
            <Breadcrumb.Item>TestData</Breadcrumb.Item>
          </Breadcrumb>
        </IceContainer>
      </div>
    );
  }
