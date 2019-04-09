
import React from 'react';
import IceContainer from '@icedesign/container';
import { Breadcrumb } from '@alifd/next';
import { Link, withRouter } from 'react-router-dom';
import ContestForm from "./components/ContestForm";

function ContestCreate ({location}) {
  return (
    <div className="ContestCreate-page">
      <IceContainer>
        <Breadcrumb separator="/">
          <Breadcrumb.Item><Link to="/admin">Admin</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to="/admin/contest/list">Contest</Link></Breadcrumb.Item>
          <Breadcrumb.Item>Create</Breadcrumb.Item>
        </Breadcrumb>
      </IceContainer>
      <ContestForm contestInfo={location.state}/>
    </div>
  );
}
export default withRouter(ContestCreate)
