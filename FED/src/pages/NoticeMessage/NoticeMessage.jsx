
  import React from 'react';
  import IceContainer from '@icedesign/container';
  import { Breadcrumb } from '@alifd/next';
  import { Link } from 'react-router-dom';

  export default function NoticeMessage () {
    return (
      <div className="NoticeMessage-page">
        <IceContainer>
          <Breadcrumb separator="/">
            <Breadcrumb.Item><Link to="/admin">Admin</Link></Breadcrumb.Item>
            <Breadcrumb.Item><Link to="/admin/notice/list">Notice</Link></Breadcrumb.Item>
            <Breadcrumb.Item>Message</Breadcrumb.Item>
          </Breadcrumb>
        </IceContainer>
      </div>
    );
  }
  