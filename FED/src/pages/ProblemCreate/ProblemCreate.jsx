
import React from 'react';
import IceContainer from '@icedesign/container';
import { Breadcrumb } from '@alifd/next';
import { Link, withRouter } from 'react-router-dom';
import ProblemForm from './components/ProblemForm';


function ProblemCreate ({location}) {
  return (
    <div className="ProblemCreate-page">
      <IceContainer>
        <Breadcrumb separator="/">
          <Breadcrumb.Item><Link to="/admin">Admin</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to="/admin/problem/list">Problem</Link></Breadcrumb.Item>
          <Breadcrumb.Item>Create</Breadcrumb.Item>
        </Breadcrumb>
      </IceContainer>
      <ProblemForm problemInfo={location.state} />
    </div>
  );
}

export default withRouter(ProblemCreate)
