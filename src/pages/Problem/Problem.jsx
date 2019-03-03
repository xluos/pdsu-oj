import React from 'react';
import { Breadcrumb, Pagination } from 'antd';
import { Link } from 'react-router-dom';
import ProblemItem from './components/ProblemItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Problem.scss';

export default function ProblemPage () { return (
  <div className="problem-page page">
    <Breadcrumb>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item><Link to="/problem">Problem</Link></Breadcrumb.Item>
    </Breadcrumb>
    <div className="problem-body">
      <h3 className="problem-title"><FontAwesomeIcon icon={["far", "lightbulb"]} size="sm" /> 所有题目</h3>
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
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '40px 0 10px 0'
        }}>
          <Pagination
            className="problem-pagination"
            showQuickJumper
            showSizeChanger
            current={3}
            total={50}
          />
        </div>
      </div>
    </div>
  </div>
);}