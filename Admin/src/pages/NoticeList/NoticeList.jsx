
  import React from 'react';
  import IceContainer from '@icedesign/container';
  import { Breadcrumb } from '@alifd/next';
  import { Link } from 'react-router-dom';

  export default function NoticeList () {
    return (
      <div className="NoticeList-page">
        <IceContainer>
          <Breadcrumb separator="/">
            <Breadcrumb.Item><Link to="/admin">Admin</Link></Breadcrumb.Item>
            <Breadcrumb.Item><Link to="/admin/notice/list">Notice</Link></Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
          </Breadcrumb>
        </IceContainer>
      </div>
    );
  }
  