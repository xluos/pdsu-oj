import React from 'react';
import ContentBlock from '../ContentBlock';
import SubmitPanel from '../SubmitPanel';
import ProblemInfo from '../ProblemInfo';
import Pinglun from '../Pinglun';
import './index.scss';

export default function ProblemContent (props) {
  // debugger
  return (
  <div className="problem-content">
    <h2 className="problem-content--title"><img src={require('./symbol-problem.png')} alt=""/>{props.title}</h2>
    <ProblemInfo info={props.info}/>
    {
      props.content.map((item, index) => (
        <ContentBlock {...item} key={index} />
      ))
    }
    <SubmitPanel pid={props.id}/>
    <Pinglun pid={props.id} />
  </div>
);}
