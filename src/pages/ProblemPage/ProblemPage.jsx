
import React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import './ProblemPage.scss';

export default function ProblemPage () { return (
  <div className="ProblemPage-page" >
    <Breadcrumb>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item><Link to="/problem">Problem</Link></Breadcrumb.Item>
      <Breadcrumb.Item><Link to="/problem">题目Title</Link></Breadcrumb.Item>
    </Breadcrumb>
  </div>
);}
