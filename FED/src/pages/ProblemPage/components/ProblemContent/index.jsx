import React from 'react';
import ContentBlock from '../ContentBlock';
import SubmitPanel from '../SubmitPanel';
import ProblemInfo from '../ProblemInfo';
import './index.scss';

export default function ProblemContent (props) { 
  return (
  <div className="problem-content">
    <h2 className="problem-content--title"><img src={require('./symbol-problem.png')} alt=""/>{props.title}</h2>
    <ProblemInfo info={{
      no: 123,
      level: '简单',
      time: 1000,
      memory: 1000
    }}/>
    {
      props.content.map((item, index) => (
        <ContentBlock {...item} key={index} />
      ))
    }
    <SubmitPanel/>
  </div>
);}