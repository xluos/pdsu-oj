import React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import ProblemItem from './components/ProblemItem';

import './Problem.scss';

export default function ProblemPage () { return (
  <div className="problem-page">
    <Breadcrumb>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item><Link to="/problem">Problem</Link></Breadcrumb.Item>
    </Breadcrumb>
    <div className="problem-body">
      <h3 className="problem-title"><i className=""/>所有题目</h3>
      <div className="problem-filter">

      </div>
      <div className="problem-content">
        <ProblemItem/>
        <ProblemItem/>
        <ProblemItem/>
        <ProblemItem/>
        <ProblemItem/>
        <ProblemItem/>
        <ProblemItem/>
        <ProblemItem/>
        <ProblemItem/>
        <ProblemItem/>
        <ProblemItem/>
        <ProblemItem/>
        <ProblemItem/>
        <ProblemItem/>
        <ProblemItem/>
        <ProblemItem/>
      </div>
    </div>
  </div>
);}